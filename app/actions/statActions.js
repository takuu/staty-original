import {
  SET_STATS_OF_PLAYER,
  SET_STATS_OF_GAME
} from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://localhost:1337/api';

export function getStatsByPlayerId(id='') {
  return async (dispatch) => {
    try {
      const stats = (await axios.get(baseUrl + '/stats/player/' + id)).data;
      dispatch({ type: SET_STATS_OF_PLAYER, stats });
    } catch (error) {
      console.log('statActions error: ', error)
    }
  };
}

export function getStatsByGameId(id='') {
  return async (dispatch) => {
    try {
      const stats = (await axios.get(`${baseUrl}/stats/game/` + id)).data;
      dispatch({ type: SET_STATS_OF_GAME, stats });
    } catch (error) {
      console.log('statActions error: ', error);
    }
  };
}