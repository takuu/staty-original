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
  let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
  let promise = comp && comp.fillStore && comp.fillStore(store, renderProps);

  return promise || Promise.resolve();
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
  match({ routes: createRoute(memHistory), location: req.url }, (err, redirect, props) => {
    console.log('err: ', err);
    console.log('redirect: ', redirect);
    // console.log('props: ', props);
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // hey we made it!
      console.log('Promise: ', Promise.resolve());
      console.log('YAY PROPS!', props);

      // let reduxState = escape(JSON.stringify(emptyStore.getState()));
      // console.log('reduxState: ', reduxState);
      // const appHtml = renderToString(<RouterContext {...props}/>);
      const emptyStore = createRedux({});
      console.log('YAY STORES: ', emptyStore);
      console.log('YAY history: ', memHistory);
      getReduxPromise(props, emptyStore, memHistory).then(() => {

        const appHtml = renderToString(<Provider store={emptyStore}>
          { <RouterContext {...props}/> }
        </Provider>);
        res.send(renderPage(appHtml));
      });
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
   
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
})