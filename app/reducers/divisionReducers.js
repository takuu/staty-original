import {
  SET_ALL_ACTIVE_DIVISIONS,
  SET_DIVISIONS_BY_SEASON
} from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ALL_ACTIVE_DIVISIONS:
      _.map(action.divisions, (division) => {
        state = state.set(division._id, division);
      });
      return state;
      break;
    case SET_DIVISIONS_BY_SEASON:
      _.map(action.divisions, (division) => {
        state = state.set(division._id, division);
      });
      return state;
      break;
    default:
      return state;
  }
};

