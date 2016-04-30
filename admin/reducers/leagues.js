/*import {
  SET_LEAGUE,
  SET_ALL_LEAGUES
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});
export default (state = defaultState, action) => {

  switch (action.type) {
    case ActionTypes.SET_ALL_LEAGUES:
      _.map(action.leagues, (league) => {
        state = state.set(league._id, league);
      });
      return state;
      break;

    case ActionTypes.SET_LEAGUE:
      return state.set(action.league._id, action.league);
      break;
    default:
      return state;
  }
};

