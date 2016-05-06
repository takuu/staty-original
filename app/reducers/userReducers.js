/*import {
  SET_USER
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

// const defaultState = new Immutable.Map({});
const defaultState = {
  players: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...action.user
      };
    case ActionTypes.SET_PLAYER_TO_WATCH_LIST:
      return {
        ...state,
        players: _.union(action.followList, state.players)
      };
    case ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST:
      return {
        ...state,
        players: _.without(state.players, action.followList[0])
      };
    default:
      return state;
  };
};

