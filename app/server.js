// ...
// import some new stuff

import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server';
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';
import compression from 'compression';
import routes from './client';

import app from '../api/index.js';
app.use(compression());
app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))
// import './styles/global.css';

// ...

// send all requests to index.html so browserHistory works

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // hey we made it!
      console.log('YAY!');
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/js/app.js"></script>
   `
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})