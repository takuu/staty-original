/*import {
  SET_ALL_ACTIVE_DIVISIONS,
  SET_DIVISIONS_BY_SEASON,
  SET_DIVISION,
  SET_DIVISIONS_BY_LEAGUE,
  UPDATE_DIVISION
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});
export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ALL_ACTIVE_DIVISIONS:
      _.map(action.divisions, (division) => {
        state = state.set(division._id, division);
      });
      return state;
      break;
    case ActionTypes.SET_DIVISIONS_BY_LEAGUE:
      _.map(action.divisions, (division) => {
        state = state.set(division._id, division);
      });
      return state;
      break;
    case ActionTypes.SET_DIVISIONS_BY_SEASON:
      _.map(action.divisions, (division) => {
        state = state.set(division._id, division);
      });
      return state;
      break;
    case ActionTypes.SET_DIVISION:
      return state.set(action.division._id, action.division);
      break;
    case ActionTypes.UPDATE_DIVISION:
      debugger;
      return state.set(action.division._id, action.division);
      break;
    default:
      return state;
  }
};

