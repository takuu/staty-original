import { combineReducers } from 'redux';
import auth from './auth';
import router from './router';
import posts from './posts';
import leagues from './leagues';
import divisions from './divisionReducers';

export default combineReducers({
  auth,
  router,
  posts,
  leagues,
  divisions
});
