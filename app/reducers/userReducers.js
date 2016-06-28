/*import {
  SET_USER
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';
import _ from 'lodash';

const defaultState = {
  players: []
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case ActionTypes.REMOVE_USER:
      return {
        ...state,
        fb: ''
      };
    case ActionTypes.SET_USER:
      return {
        ...action.user
      };
    case ActionTypes.SET_PLAYER_TO_WATCH_LIST:
      return {
        ...state,
        players: _.cloneDeep(action.user.players)
      };
    case ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST:
      return {
        ...state,
        players: _.cloneDeep(action.user.players)
      };
    default:
      return state;
  };
};

