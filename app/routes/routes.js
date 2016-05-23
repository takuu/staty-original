import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './../containers/App';
import Auth from '../containers/Auth';
import SignupPage from './../containers/SignupPage';
import LoginPage from './../containers/LoginPage';
import ProfilePage from './../containers/Profile/ProfilePage';
import ProfileGamesPage from './../containers/Profile/ProfileGamesPage';
import ProfileStatsPage from './../containers/Profile/ProfileStatsPage';
import ProfileHomePage from './../containers/Profile/ProfileHomePage';
import ProfileLayout from './../containers/Profile/ProfileLayout';
import NotFound from '../components/NotFound';
import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';
import DashboardPage from './../containers/DashboardPage';
import ContactPage from './../containers/ContactPage';
import LeagueListPage from './../containers/LeagueListPage';
import LeaguePage from './../containers/League/LeaguePage';
import DivisionPage from './../containers/Division/DivisionPage';
import SchedulePage from '../containers/Division/SchedulePage';
import StandingPage from '../containers/Division/StandingPage';
import TeamsPage from '../containers/Division/TeamsPage';
import TeamPage from './../containers/Team/TeamPage';
import PlayerPage from '../containers/Player/PlayerPage';
import TeamGamesPage from '../containers/Team/TeamGamesPage';
import RosterPage from '../containers/Team/RosterPage';
import TeamStatsPage from '../containers/Team/TeamStatsPage';
import PlayerGamesPage from '../containers/Player/PlayerGamesPage';
import PlayerProfilePage from '../containers/Player/PlayerProfilePage';
import PlayerStatsPage from '../containers/Player/PlayerStatsPage';
import GamePage from '../containers/Game/GamePage';
import SearchResultPage from '../containers/League/SearchResultPage';
import LeagueAboutPage from '../containers/LeagueAboutPage';
import AboutPage from '../containers/AboutPage';
import * as Posts from './../containers/Posts';
import SiteLayout from '../containers/root/SiteLayout';
import GameLayout from '../containers/Game/GameLayout';
import TeamLayout from '../containers/Team/TeamLayout';
import PlayerLayout from '../containers/Player/PlayerLayout';
import DivisionLayout from '../containers/Division/DivisionLayout';
/*
 import AdminLayout from '../containers/LeagueAdmin/AdminLayout';
 import LeagueAdmin from '../containers/LeagueAdmin/LeagueAdmin';
 import DivisionAdmin from '../containers/LeagueAdmin/DivisionAdmin';
 import TeamAdmin from '../containers/LeagueAdmin/TeamAdmin';
 import PlayerAdmin from '../containers/LeagueAdmin/PlayerAdmin';
 import StatAdmin from '../containers/LeagueAdmin/StatAdmin';
 import SeasonAdmin from '../containers/LeagueAdmin/SeasonAdmin';
 */

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

    <Route component={ProfileLayout}>
      <Route path='/profile' component={ProfilePage} >
        <IndexRoute component={ProfileHomePage} />
        <Route path='stats' component={ProfileStatsPage} />
        <Route path='games' component={ProfileGamesPage} />
      </Route>
    </Route>

    <Route path="/about" component={AboutPage} />

    <Route path="/contact" component={ContactPage} />
    {/* */}<Route path="/search" component={SearchResultPage} />
    <Route path="/leagues" component={LeagueListPage} />

    <Route path="/:leagueName" component={SiteLayout}>
      /*League Home*/
      <Route component={DivisionLayout}>
        <IndexRoute component={LeaguePage} />

        <Route path='search/:searchName' component={SearchResultPage} />

        <Route path="division/:divisionId" component={DivisionPage} >
          <IndexRoute component={SchedulePage} />
          <Route path='standing' component={StandingPage} />
          <Route path='teams' component={TeamsPage} />
        </Route>
      </Route>

      <Route component={GameLayout}>
        <Route path='division/:divisionId/game/:gameId' component={GamePage} />
      </Route>

      <Route path='division/:divisionId/team/:teamId' component={TeamLayout}>
        <Route component={TeamPage} >
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
      {
        /*
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

         */
      }

      <Route path="dashboard" component={Auth} >
        <Route path="about" component={LeagueAboutPage} />
      </Route>

      <Route path="about" component={LeagueAboutPage} />

      <Route path="results/:searchName" component={SearchResultPage}></Route>

    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;