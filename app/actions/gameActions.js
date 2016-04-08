/*import {
  SET_GAME,
  SET_GAMES_WITH_FILTERS,
  SET_GAMES_BY_TEAM,
  SET_ALL_GAMES,
  SET_GAMES_BY_DIVISION
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';
import helpers from '../utils/helpers';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://localhost:1337/api';

export function getGameById (id = '') {
  return async (dispatch) => {
    try {
      const game = (await axios.get(baseUrl + '/games/' + id)).data;
      dispatch({ type: ActionTypes.SET_GAME, game });
    } catch (error) {
      console.log('gameActions error: ', error);
    }
  };
}
export function getGamesByTeamId (id = '') {
  return async (dispatch) => {
    try {
      const games = (await axios.get(`${baseUrl}/games/team/` + id)).data;
      dispatch({ type: ActionTypes.SET_GAMES_BY_TEAM, games });
    } catch (error) {
      console.log('gameActions error: ', error);
    }
  };
}

export function getGamesByDivisionId (id = '') {
  return async (dispatch) => {
    try {
      const games = (await axios.get(`${baseUrl}/games/division/` + id)).data;
      dispatch({ type: ActionTypes.SET_GAMES_BY_DIVISION, games });
    } catch (error) {
      console.log('gameActions error: ', error);
    }
  };
}

export function getGamesWithFilters (params = {}) {
  return async (dispatch) => {
    try {
      const games = (await axios.get(`${baseUrl}/games/?` + helpers.jsonToQueryString(params))).data;
      dispatch({ type: ActionTypes.SET_GAMES_WITH_FILTERS, games });
    } catch (error) {
      console.log('gameActions error: ', error);
    }
  };
}
