import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import SignupRoute from './SignupRoute';
import LoginRoute from './LoginRoute';
import ProfileRoute from './ProfileRoute';
import NotFound from '../components/NotFound';
import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';
import DashboardRoute from './DashboardRoute';
import ContactRoute from './ContactRoute';
import LeagueListRoute from './LeagueListRoute';
import LeagueRoute from './LeagueRoute';
import DivisionRoute from './DivisionRoute';
import * as Posts from './Posts';

const routes = (
  <Route component={App}>
    <Route path="/signup" component={SignupRoute} />
    <Route path="/login" component={LoginRoute} />
    <Route path="/" component={Posts.List} />
    <Route path="/posts/:id" component={Posts.View} />

    <Route requireAuth>
      <Route path="/dashboard" component={DashboardRoute} />
      <Route path="/dashboard/add" component={Posts.Edit} />
      <Route path="/dashboard/edit/:id" component={Posts.Edit} />
    </Route>
      <Route path="/profile" component={ProfileRoute} />

      <Route path="/contact" component={ContactRoute} />
      <Route path="/league" component={LeagueListRoute} />


      <Route path="/:leagueName" component={LeagueRoute} />
      <Route path="/:leagueName/division/:divisionId" component={DivisionRoute} />




    <Route path="*" component={NotFound} />
  </Route>
);


function walk(routes, cb) {

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

      if (route.requireAuth && !loggedIn) {
        transition.to(...redirectBackAfter('/login', nextState));
      } else if (client) {
        fillStore(store, nextState, [route.component]);
      }
    };
  });
};
