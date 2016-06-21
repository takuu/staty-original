import { combineReducers } from 'redux';
import auth from './auth';
import router from './router';
import posts from './posts';
import leagues from './leagues';
import divisions from './divisionReducers';
import teams from './teamReducers';
import games from './gameReducers';
import players from './playerReducers';
import stats from './statReducers';
import seasons from './seasonReducers';
import user from './userReducers';
import ui from './uiReducers';

export default combineReducers({
  auth,
  router,
  posts,
  leagues,
  divisions,
  teams,
  games,
  players,
  stats,
  seasons,
  user,
  ui
});
