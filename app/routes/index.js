import React from 'react';
import { Route } from 'react-router';

import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';
import routes from './routes.js';
function walk (routes, cb) {

  cb(routes);

  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => walk(route, cb));
  }

  return routes;
}

export default (store, client) => {
  return walk(Route.createRouteFromReactElement(routes), route => {
    route.onEnter = (nextState, transition) => {
      const loggedIn = !!store.getState().auth.token;
      const auth = store.getState().auth;

      // Note: There's further Auth validation in containers/Auth
      if (route.requireAuth && !loggedIn) {
        transition.to(...redirectBackAfter('/login', nextState));
      } else if (client) {
        debugger;
        fillStore(store, nextState, [route.component]);
      }
    };
  });
};
