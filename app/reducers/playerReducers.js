/*import {
  SET_PLAYERS_WITH_FILTERS,
  SEARCH_PLAYER,
  SET_PLAYER,
  SET_PLAYERS_BY_TEAM,
  UPDATE_PLAYER
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLAYERS_WITH_FILTERS:
      _.map(action.players, (player) => {
        state = state.set(player._id, player);
      });
      return state;
      break;
    case ActionTypes.SET_PLAYERS_BY_TEAM:
      _.map(action.players, (player) => {
        state = state.set(player._id, player);
      });
      return state;
      break;
    case ActionTypes.SEARCH_PLAYER:
      _.map(action.players, (player) => {
        state = state.set(player._id, player);
      });
      return state;
      break;
    case ActionTypes.SET_PLAYER:
      return state.set(action.player._id, action.player);
      break;
    case ActionTypes.UPDATE_PLAYER:
      return state.set(action.player._id, action.player);
      break;
    default:
      return state;
  }
};

