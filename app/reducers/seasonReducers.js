import {
  SET_SEASON,
  SET_SEASONS_BY_LEAGUE
} from '../constants/actions';

import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_SEASONS_BY_LEAGUE:
      _.map(action.seasons, (season) => {
        state = state.set(season._id, season);
      });
      return state;
      break;
    case SET_SEASON:
      return state.set(action.season._id, action.season);
      break;
    default:
      return state;
  }
};

