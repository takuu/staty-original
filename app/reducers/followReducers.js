import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLAYER_TO_WATCH_LIST:
      _.map(action.followList, (follow, index) => {
        state = state.set(follow._id, follow);
      });
      return state;
      break;
    case ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST:
      _.map(action.followList, (follow, index) => {
        state = state.delete(follow._id);
      });
      return state;
      break;
    default:
      return state;
  }
};
