import ActionTypes from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://localhost:3000/api';

export function getStatsByPlayerId (id = '') {
  return async (dispatch) => {
    try {
      const stats = (await axios.get(baseUrl + '/stats/player/' + id)).data;
      dispatch({ type: ActionTypes.SET_STATS_OF_PLAYER, stats });
    } catch (error) {
      console.log('statActions error: ', error);
    }
  };
}

export function getStatsByTeamId (id = '') {
  return async (dispatch) => {
    try {
      const stats = (await axios.get(baseUrl + '/stats/team/' + id)).data;
      dispatch({ type: ActionTypes.SET_STATS_OF_TEAM, stats });
    } catch (error) {
      console.log('statActions error: ', error);
    }
  };
}

export function getStatsByGameId (id = '') {
  return async (dispatch) => {
    try {
      const stats = (await axios.get(`${baseUrl}/stats/game/` + id)).data;
      dispatch({ type: ActionTypes.SET_STATS_OF_GAME, stats });
    } catch (error) {
      console.log('statActions error: ', error);
    }
  };
}

export function updateStat (item) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      let headers = getHeaders(token);
      debugger;
      const stat = (await axios.put(`${baseUrl}/stats/` + item._id, item, { headers })).data;
      dispatch({ type: ActionTypes.UPDATE_STAT, stat });
    } catch (error) {
      console.log('statActions error: ', error);
    }
  };
}
