/* eslint-env browser */
/* global process */
import 'babel/polyfill';
import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import HashHistory from 'react-router/lib/HashHistory';
import Root from './Root';
import './styles/global.css';

/*
const history = (process.env.NODE_ENV === 'production')
  ? new BrowserHistory()
  : new HashHistory();
*/

const history = new BrowserHistory();

React.render(
  <Root {...{ history }} />,
  document.getElementById('app')
);
