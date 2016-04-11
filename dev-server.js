/* eslint-env node */
import webpack from 'webpack';
import devConfig from './webpack/dev.config.babel';
import prodConfig from './webpack/prod.config.babel';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxyMiddleware from 'http-proxy-middleware';
import winston from 'winston';
winston.add(winston.transports.File, { filename: 'somefile.log' });
import fs from 'fs';
import path from 'path';
import querystring from 'querystring';
import _ from 'lodash';
import request from 'request';


const env = process.env.NODE_ENV || 'development';
const config = env === 'development' ? devConfig : prodConfig;
const bundler = webpack(config);

var fbConfig = require('./api/passport/fb.js');

var proxy = proxyMiddleware(['/api', '/login'], {
  target: 'http://localhost:1337',
  changeOrigin: false   // for vhosted sites, changes host header to match to target's host
});

browserSync({
  server: {
    baseDir: '.',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: { colors: true }

      }),
      proxy,

      webpackHotMiddleware(bundler),

      (req, res, next) => {
        
        if(req.url == '/') {

          fs.readFile(path.join(__dirname, 'landing', 'index.html'), {
            encoding: 'utf-8'
          }, (err, source) => {
            if (err) return next(err);

            const template = _.template(source);

            res.write(template({ html: '', initialState: 'undefined', env }));
            res.end();
          });
        } else if (req.url.indexOf('/callbacklogin/facebook') >=0) {
          var string = req.url.split('?')[1];
          var query = querystring.parse(string);
          console.log('FACEBOOK CALLBACK!', query);
          var options = {
            code: query.code,
            client_id: fbConfig.appID,
            redirect_uri: fbConfig.callbackUrl,
            client_secret: fbConfig.appSecret
          };
          var url = 'https://graph.facebook.com/v2.3/oauth/access_token?' + querystring.stringify(options);
          request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body) // Show the HTML
              var result = JSON.parse(body);
              var access_token = result.access_token;

              res.writeHead(301,
                {Location: 'http://localhost:3000/profile?access_token=' + access_token}
              );
              res.end();
            }
          })

        } else {
          console.log('req.url :', req.url);

          // This is here because of the hashtags
          //if (req.url !== '/') { return next(); }
          var isAllowedAsset = _checkIfAllowedAsset(req.originalUrl);
          console.log('isAsset?: ', isAllowedAsset);
          if(isAllowedAsset) return next();


          fs.readFile(path.join(__dirname, 'app', 'template.html'), {
            encoding: 'utf-8'
          }, (err, source) => {
            if (err) return next(err);

            const template = _.template(source);

            res.write(template({ html: '', initialState: 'undefined', env }));
            res.end();
          });
        }

        function _checkIfAllowedAsset(url) {
          var ALLOWED_TYPES = ['png', 'jpeg', 'css', 'js', 'jpg', 'gif'];
          var path = url.split('.');
          var fileType = path[1] && path[1].split('?')[0];

          var index = ALLOWED_TYPES.indexOf(fileType);
          return index >=0;

        }

      }

    ]
  },

  files: [
    'app/template.html'
  ]
});
