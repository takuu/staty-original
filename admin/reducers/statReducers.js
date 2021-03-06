import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_STATS_OF_PLAYER:
      _.map(action.stats, (stat) => {
        state = state.set(stat._id, stat);
      });
      return state;
      break;
    case ActionTypes.SET_STATS_OF_GAME:
      _.map(action.stats, (stat) => {
        state = state.set(stat._id, stat);
      });
      return state;
      break;
    case ActionTypes.SET_STATS_OF_TEAM:
      _.map(action.stats, (stat) => {
        state = state.set(stat._id, stat);
      });
      return state;
    case ActionTypes.UPDATE_STAT:
      return state.set(action.stat._id, action.stat);
      break;
    default:
      return state;
  }
};

