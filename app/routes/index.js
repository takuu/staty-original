import React from 'react';
import { Route, IndexRoute } from 'react-router';
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
import TeamsPage from './../containers/League/Division/TeamsPage';
import TeamPage from './../containers/League/TeamPage';
import PlayerPage from '../containers/League/PlayerPage';
import TeamGamesPage from '../containers/League/Team/TeamGamesPage';
import RosterPage from '../containers/League/Team/RosterPage';
import TeamStatsPage from '../containers/League/Team/TeamStatsPage';
import PlayerGamesPage from '../containers/League/Player/PlayerGamesPage';
import PlayerProfilePage from '../containers/League/Player/PlayerProfilePage';
import PlayerStatsPage from '../containers/League/Player/PlayerStatsPage';
import GamePage from '../containers/League/GamePage';
import SearchResultPage from '../containers/League/SearchResultPage';
import LeagueAboutPage from '../containers/LeagueAboutPage';
import AboutPage from '../containers/AboutPage';
import * as Posts from './../containers/Posts';
import SiteLayout from '../containers/Layout/SiteLayout/SiteLayout';
import GameLayout from '../containers/Layout/GameLayout/GameLayout';
import TeamLayout from '../containers/Layout/TeamLayout/TeamLayout';
import PlayerLayout from '../containers/Layout/PlayerLayout/PlayerLayout';
import DivisionLayout from '../containers/Layout/DivisionLayout/DivisionLayout';
import AdminLayout from '../containers/Layout/AdminLayout/AdminLayout';
import LeagueAdmin from '../containers/LeagueAdmin/LeagueAdmin';
import DivisionAdmin from '../containers/LeagueAdmin/DivisionAdmin';
import TeamAdmin from '../containers/LeagueAdmin/TeamAdmin';
import PlayerAdmin from '../containers/LeagueAdmin/PlayerAdmin';
import StatAdmin from '../containers/LeagueAdmin/StatAdmin';
import SeasonAdmin from '../containers/LeagueAdmin/SeasonAdmin';

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

    <Route path="/:leagueName" component={SiteLayout}>
      /*League Home*/
      <Route component={DivisionLayout}>
        <IndexRoute component={LeaguePage} />

        <Route path="division/:divisionId" component={DivisionPage} >
          <Route path='schedule' component={SchedulePage} />
          <Route path='standing' component={StandingPage} />
          <Route path='teams' component={TeamsPage} />
        </Route>
      </Route>

      <Route component={GameLayout}>
        <Route path='division/:divisionId/game/:gameId' component={GamePage} />
      </Route>

      <Route component={TeamLayout}>
        <Route path='division/:divisionId/team/:teamId' component={TeamPage} >
          <IndexRoute component={TeamGamesPage} />
          <Route path='roster' component={RosterPage} />
          <Route path='team-stats' component={TeamStatsPage} />
        </Route>
      </Route>

      <Route component={PlayerLayout}>
        <Route path='team/:teamId/player/:playerId' component={PlayerPage} >
          <IndexRoute component={PlayerProfilePage} />
          <Route path='game-log' component={PlayerGamesPage} />
          <Route path='split-stats' component={PlayerStatsPage} />
        </Route>
      </Route>

      /*League Admin*/
      <Route path="admin" component={Auth}>
        <Route component={AdminLayout}>
          <IndexRoute component={LeagueAdmin} />
          <Route path="divisions" component={DivisionAdmin} />
          <Route path="teams" component={TeamAdmin} />
          <Route path="players" component={PlayerAdmin} />
          <Route path="stats" component={StatAdmin} />
          <Route path="seasons" component={SeasonAdmin} />
        </Route>
      </Route>

      <Route path="dashboard" component={Auth} >
        <Route path="about" component={LeagueAboutPage} />
      </Route>

      <Route path="about" component={LeagueAboutPage} />

      <Route path="results/:searchName" component={SearchResultPage}></Route>

    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);

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
        fillStore(store, nextState, [route.component]);
      }
    };
  });
};
