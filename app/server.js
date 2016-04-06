// ...
// import some new stuff

import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import cookieParser from 'cookie-parser';
import express from 'express';
import passport from 'passport';
var router = express.Router();
import path from 'path';
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server';
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createRedux } from './utils/redux';
// import compression from 'compression';
import routes from './routes/index';
// import root from './Root';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/staty', {db: {safe:true}});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('DB CONNECTED!');
  // yay!
});

var app = express();
// app.use(compression());
app.use(cookieParser());
app.use(express.static('public'));
// import './styles/global.css';

// Configuring passport
// app.use(expressSession({secret: 'mySecretKey'}));



app.use(passport.initialize());
let initPassport = require('../api/passport/init');
initPassport(passport);
import passportRoutes from '../api/passport/routes';
app.use('/', passportRoutes(passport));

import api from '../api/api';
app.use('/api', api);



// send all requests to index.html so browserHistory works

app.get('*', (req, res) => {
  const store = createRedux({});
  console.log('this is getting triggered', req.url);
  match({ routes: routes(store, false), location: req.url }, (err, redirect, props) => {
    console.log('err: ', err);
    // console.log('props: ', props);
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // hey we made it!
      console.log('YAY!');
      // const appHtml = renderToString(<RouterContext {...props}/>);
      const store = createRedux({});
      const appHtml = renderToString(<Provider store={store}>
        { <RouterContext {...props}/> }
      </Provider>);



      res.send(renderPage(appHtml));
    } else {
      res.status(404).send('Not Found');
    }
  });
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
})