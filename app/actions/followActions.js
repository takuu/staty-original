import ActionTypes from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';
import storage from '../utils/localStore';
import config from '../../api/config.json';
const baseUrl = `http://localhost:${config.port}/api`;

export function fetchWatchList () {
  //TODO: fetch the full watchList
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      const headers = getHeaders(token);
      const user = (await axios.get(`${baseUrl}/users/watchlist`, { headers })).data;

      const followList = storage.get('watchList');
      dispatch({ type: ActionTypes.SET_PLAYER_TO_WATCH_LIST, followList });
    } catch (error) {
      console.error('followActions error: ', error);
    }
  };
}

export function addPlayerToWatchList (playerId) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      let followList = storage.add('watchList', playerId);
      if (token) {
        const headers = getHeaders(token);
        const user = (await axios.put(`${baseUrl}/users/addwatch`, { players: followList }, { headers })).data;
        storage.set('watchList', user.players);
      }

      // TODO: Add check to see if user is already logged in

      dispatch({ type: ActionTypes.SET_PLAYER_TO_WATCH_LIST, followList });
    } catch (error) {
      console.error('followActions error: ', error);
    }
  };
}

export function removePlayerFromWatchList (playerId) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      let followList = storage.remove('watchList', playerId);
      if (token) {
        const headers = getHeaders(token);
        const user = (await axios.put(`${baseUrl}/users/removewatch`, { playerId }, { headers })).data;
        storage.set('watchList', user.players);
      }

      dispatch({ type: ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST, followList });
    } catch (error) {
      console.error('followActions error: ', error);
    }
  };
}