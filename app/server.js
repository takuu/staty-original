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
import { createMemoryHistory, useQueries } from 'history';
import { createRedux } from './utils/redux';
// import compression from 'compression';
import routes from './routes/routes';
// import root from './Root';
import mongoose from 'mongoose';
import _ from 'lodash';
import { routerStateChange } from './actions/router';

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

function getReduxPromise (renderProps, store, history) {
  let { query, params } = renderProps;
  let promiseList = [];

  _.map(Object.keys(renderProps.components), (index) => {
    let component = renderProps.components[index];
    let comp = component && component.WrappedComponent;
    let promise = comp && comp.fillStore && comp.fillStore(store, renderProps);
    if (promise) promiseList.push(promise);
  });

  return (promiseList.length) ? Promise.all(promiseList) : Promise.resolve();
}


import { Router } from 'react-router';
function createRoute (history, store) {
  return (
    <Router history={history}>
      {routes}
      </Router>
  );
}
// send all requests to index.html so browserHistory works

app.get('*', (req, res) => {
  let memHistory = useQueries(createMemoryHistory)();

  let location = memHistory.createLocation(req.url);
  console.log('this is getting triggered', req.url);
  match({ routes: createRoute(memHistory), location: location }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      let [ getCurrentUrl, unsubscribe ] = subscribeUrl();
      let reqUrl = location.pathname + location.search;
      let store = createRedux({});
      getReduxPromise(props, store, memHistory).then(() => {
        const html = renderToString(<Provider store={store}>
          { <RouterContext {...props}/> }
        </Provider>);

        let initialState = escape(JSON.stringify(store.getState()));

        if (getCurrentUrl() === reqUrl) {
          res.send(renderPage(html, initialState));
        } else {
          res.redirect(302, getCurrentUrl());
        }
        unsubscribe();

        res.send(renderPage(html, initialState));

      });
    } else {
      res.status(404).send('Not Found');
    }
  });

  function subscribeUrl () {
    let currentUrl = location.pathname + location.search;
    let unsubscribe = memHistory.listen((newLoc)=> {
      if (newLoc.action === 'PUSH') {
        currentUrl = newLoc.pathname + newLoc.search;
      }
    });
    return [
      ()=> currentUrl,
      unsubscribe
    ];
  }
});

function renderPage(appHtml, initialState) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Staty</title>
   
    <div id="app">${appHtml}</div>
    <script>var __INITIAL_STATE__ =  "${initialState}";</script>
    <script src="/bundle.js"></script>
   `
}



var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
})