/* eslint-env node */
import webpack from 'webpack';
import devConfig from './webpack/dev.config.babel';
import prodConfig from './webpack/prod.config.babel';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const env = process.env.NODE_ENV || 'development';
const config = env === 'development' ? devConfig : prodConfig;
const bundler = webpack(config);

browserSync({
  server: {
    baseDir: '.',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: { colors: true }

      }),

      webpackHotMiddleware(bundler),

      (req, res, next) => {

        console.log('foo?: ', req.originalUrl);
        if(req.url == '/') {

          fs.readFile(path.join(__dirname, 'app/landing', 'index.html'), {
            encoding: 'utf-8'
          }, (err, source) => {
            if (err) return next(err);

            const template = _.template(source);

            res.write(template({ html: '', initialState: 'undefined', env }));
            res.end();
          });
        } else {

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
          var ALLOWED_TYPES = ['png', 'jpeg', 'css', 'js', 'jpg'];
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
