import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './../containers/App';
import SignupPage from './../containers/SignupPage';
import LoginPage from './../containers/LoginPage';
import ProfilePage from './../containers/ProfilePage';
import NotFound from '../components/NotFound';
import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';
import DashboardPage from './../containers/DashboardPage';
import ContactPage from './../containers/ContactPage';
import LeagueListPage from './../containers/LeagueListPage';
import LeaguePage from './../containers/LeaguePage';
import DivisionPage from './../containers/DivisionPage';
import TeamPage from './../containers/TeamPage';
import * as Posts from './../containers/Posts';

const routes = (
  <Route component={App}>
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={Posts.List} />
    <Route path="/posts/:id" component={Posts.View} />

    <Route requireAuth>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/dashboard/add" component={Posts.Edit} />
      <Route path="/dashboard/edit/:id" component={Posts.Edit} />
    </Route>
    <Route path="/profile" component={ProfilePage} />

    <Route path="/contact" component={ContactPage} />
    <Route path="/leagues" component={LeagueListPage} />


    <Route path="/:leagueName" component={LeaguePage} />
    <Route path="/:leagueName/division/:divisionId" component={DivisionPage} />
    <Route path="/:leagueName/team/:teamId" component={TeamPage} />


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
