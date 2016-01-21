import {
  SET_ALL_ACTIVE_DIVISIONS,
  SET_DIVISIONS_BY_SEASON,
  SET_DIVISION,
  SET_DIVISIONS_BY_LEAGUE
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
    case SET_DIVISIONS_BY_LEAGUE:
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
    case SET_DIVISION:
      return state.set(action.division._id, action.division);
      break;
    default:
      return state;
  }
};

