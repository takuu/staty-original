/* eslint-env browser */
/* global process */
import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import cookie from './utils/cookie';
import routes from './routes';
import { routerStateChange } from './actions/router';
import { createRedux } from './utils/redux';
import { canUseDOM } from 'exenv';

//import BrowserHistory from 'react-router/lib/BrowserHistory';

//const newHistory = new BrowserHistory();


const store = createRedux((process.env.NODE_ENV === 'production')
  ? JSON.parse(decodeURIComponent(window.__INITIAL_STATE__))
  : (canUseDOM) ? { auth: { token: cookie.get('token') || '' } } : {});

// const store = createRedux((canUseDOM) ? { auth: { token: cookie.get('token') || '' } } : {});

if(!canUseDOM) {
  console.log('THIS?');
  module.exports = (
      <Router
        history={browserHistory}
        routes={routes(store, true)}

        onUpdate={function() {
          store.dispatch(routerStateChange(this.state));
        }}
      />
  )
}

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired
  }

  render() {
    console.log('STORE: ', store.getState());
    return (
      <Provider store={store}>
        <Router
          history={browserHistory}
          routes={routes(store, true)}

          onUpdate={function() {
            store.dispatch(routerStateChange(this.state));
          }}
        />
      </Provider>
    );
  }
}
