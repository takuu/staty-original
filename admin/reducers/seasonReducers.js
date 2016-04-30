/*import {
  SET_SEASON,
  SET_SEASONS_BY_LEAGUE,
  SET_ALL_SEASONS
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SEASONS_BY_LEAGUE:
      _.map(action.seasons, (season) => {
        state = state.set(season._id, season);
      });
      return state;
      break;
    case ActionTypes.SET_ALL_SEASONS:
      _.map(action.seasons, (season) => {
        state = state.set(season._id, season);
      });
      return state;
      break;
    case ActionTypes.SET_SEASON:
      return state.set(action.season._id, action.season);
      break;
    default:
      return state;
  }
};

