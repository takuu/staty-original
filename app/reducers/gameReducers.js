import {
  SET_GAME,
  SET_GAMES_WITH_FILTERS,
  SET_GAMES_BY_TEAM,
  SET_ALL_GAMES,
  SET_GAMES_BY_DIVISION
} from '../constants/actions';

import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_GAMES_BY_DIVISION:
      _.map(action.games, (game) => {
        state = state.set(game._id, game);
      });
      return state;
      break;
    case SET_GAMES_BY_TEAM:
      _.map(action.games, (game) => {
        state = state.set(game._id, game);
      });
      return state;
      break;
    case SET_GAMES_WITH_FILTERS:
      _.map(action.games, (game) => {
        state = state.set(game._id, game);
      });
      return state;
      break;
    case SET_GAME:
      return state.set(action.game._id, action.game);
      break;
    default:
      return state;
  }
};