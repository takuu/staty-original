import webpack from 'webpack';
import devConfig from './webpack/dev.app.config.babel.js';
import prodConfig from './webpack/prod.app.config.babel.js';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import winston from 'winston';
import proxyMiddleware from 'http-proxy-middleware';
winston.add(winston.transports.File, { filename: 'somefile.log' });
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const env = process.env.NODE_ENV || 'development';
const config = env === 'development' ? devConfig : prodConfig;

var proxy = proxyMiddleware(['/api', '/login'], {
  target: 'http://localhost:1337',
  changeOrigin: false   // for vhosted sites, changes host header to match to target's host
});


import devAdminConfig from './webpack/dev.admin.config.babel.js';
import prodAdminConfig from './webpack/prod.admin.config.babel.js';
const configAdmin = env === 'development' ? devAdminConfig : prodAdminConfig;
const bundlerAdmin = webpack(configAdmin);

// We want to create multiple browserSync instances
var adminBrowserSync = browserSync.create('admin');
adminBrowserSync.init({
  server: {
    baseDir: '.',

    middleware: [
      webpackDevMiddleware(bundlerAdmin, {
        publicPath: config.output.publicPath,
        stats: { colors: true }
      }),
      proxy,

      webpackHotMiddleware(bundlerAdmin),

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

          console.log('THIS SHOULD NOT BE CALLED');

        } else {
          console.log('req.url :', req.url);

          // This is here because of the hashtags
          //if (req.url !== '/') { return next(); }
          var isAllowedAsset = _checkIfAllowedAsset(req.originalUrl);
          console.log('isAsset?: ', isAllowedAsset);
          if(isAllowedAsset) return next();


          fs.readFile(path.join(__dirname, 'admin', 'template.html'), {
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
    'admin/template.html'
  ],
  port: 3010,
  ui: {
    port: 3011
  }
});
