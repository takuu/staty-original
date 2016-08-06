/* eslint-env browser */
/* global process */
import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
//import BrowserHistory from 'react-router/lib/BrowserHistory';
//import HashHistory from 'react-router/lib/HashHistory';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Root from './Root';
// import './styles/global.css';
if (process.env.BROWSER) require('./styles/global.css');
// import withStyles from './decorators/withStyles';

/*
const history = (process.env.NODE_ENV === 'production')
  ? new BrowserHistory()
  : new HashHistory();
*/

//const history = new BrowserHistory();

const App = () => (
  <MuiThemeProvider>
    <Root {...{ history }} />
  </MuiThemeProvider>
);



const history = {};
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
