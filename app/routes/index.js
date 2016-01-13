import React from 'react';
import { Route } from 'react-router';
import App from './../containers/App';
import Auth from '../containers/Auth';
import SignupPage from './../containers/SignupPage';
import LoginPage from './../containers/LoginPage';
import ProfilePage from './../containers/ProfilePage';
import NotFound from '../components/NotFound';
import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';
import DashboardPage from './../containers/DashboardPage';
import ContactPage from './../containers/ContactPage';
import LeagueListPage from './../containers/LeagueListPage';
import LeaguePage from './../containers/League/LeaguePage';
import DivisionPage from './../containers/League/DivisionPage';
import SchedulePage from './../containers/League/Division/SchedulePage';
import StandingPage from './../containers/League/Division/StandingPage';
import TeamPage from './../containers/League/TeamPage';
import PlayerPage from '../containers/League/PlayerPage';
import GamePage from '../containers/League/GamePage';
import SearchResultPage from '../containers/League/SearchResultPage';
import LeagueAboutPage from '../containers/LeagueAboutPage';
import AboutPage from '../containers/AboutPage';
import * as Posts from './../containers/Posts';
import PanelContainer from '../components/Layout/PanelContainer/PanelContainer';
import LeagueLayout from '../components/Layout/LeagueLayout/LeagueLayout';

import LeagueAdmin from '../containers/LeagueAdmin/LeagueAdmin';


const routes = (
  <Route component={App}>
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/posts/:id" component={Posts.View} />

    <Route requireAuth>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/dashboard/add" component={Posts.Edit} />
      <Route path="/dashboard/edit/:id" component={Posts.Edit} />
    </Route>
    <Route path="/profile" component={ProfilePage} />
    <Route path="/about" component={AboutPage} />

    <Route path="/contact" component={ContactPage} />
    <Route path="/leagues" component={LeagueListPage} />


    <Route path="/:leagueName/admin" component={LeagueAdmin} />
    <Route path="/:leagueName" component={PanelContainer}>
      <Route component={LeagueLayout}>
        <Route path="home" component={LeaguePage} />
        <Route path="dashboard" component={Auth} >
          <Route path="about" component={LeagueAboutPage} />
        </Route>

        <Route path="about" component={LeagueAboutPage} />

        <Route path="results/:searchName" component={SearchResultPage}></Route>

        <Route path="division/:divisionId/game/:gameId" component={GamePage} />
        <Route path="division/:divisionId" component={DivisionPage} >
          <Route path="schedule" component={SchedulePage} />
          <Route path="standing" component={StandingPage} />
        </Route>


        <Route path="team/:teamId/player/:playerId" component={PlayerPage} />
        <Route path="team/:teamId" component={TeamPage} />
      </Route>


    </Route>

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
      const auth = store.getState().auth;

      if (route.requireAuth && !loggedIn) {
        transition.to(...redirectBackAfter('/login', nextState));
      } else if (client) {
        fillStore(store, nextState, [route.component]);
      }
    };
  });
};
