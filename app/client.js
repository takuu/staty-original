/* eslint-env browser */
/* global process */
import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
//import BrowserHistory from 'react-router/lib/BrowserHistory';
//import HashHistory from 'react-router/lib/HashHistory';
import Root from './Root';
import './styles/global.css';

/*
const history = (process.env.NODE_ENV === 'production')
  ? new BrowserHistory()
  : new HashHistory();
*/

//const history = new BrowserHistory();
const history = {};
ReactDOM.render(
  <Root {...{ history }} />,
  document.getElementById('app')
);
