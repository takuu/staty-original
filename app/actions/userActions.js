import ActionTypes from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';
import storage from '../utils/localStore';
import config from '../../api/config.json';
const baseUrl = `http://localhost:${config.port}/api`;

export function addPlayerToUser (id = '') {
  return async (dispatch) => {
    try {
      // const season = (await axios.get(baseUrl + '/seasons/' + id)).data;
      // dispatch({ type: ActionTypes.SET_SEASON, season });
    } catch (error) {
      console.log('seasonActions error: ', error);
    }
  };
}

export function getUserByToken (token = '') {
  return async (dispatch) => {
    try {
      const season = (await axios.get(baseUrl + '/users/token/' + token)).data;
      dispatch({ type: ActionTypes.SET_FACEBOOK_, season });
    } catch (error) {
      console.log('seasonActions error: ', error);
    }
  };
}

export function getProfile(id = '') {
  return async (dispatch) => {
    try {
      const user = (await axios.get(baseUrl + '/users/' + id)).data;
      debugger;
      dispatch({ type: ActionTypes.SET_USER, user });
    } catch (error) {
      console.log('userActions error: ', error);
    }
  };
}

export function addPlayerToWatchList (player) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      debugger;

      if (!token) {
        storage.set('watchList', player);
      } else {
        const headers = getHeaders(token);

        let user = (await axios.put(
            `${baseUrl}/users/addPlayer`,
            player,
            { headers })
        ).data;
      }
      dispatch({ type: ActionTypes.SET_PLAYER_TO_WATCH_LIST, player });
    } catch (error) {
      console.log('userActions error: ', error);
    }
  };
}

export function removePlayerFromWatchList (player) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      debugger;

      if (!token) {
        storage.remove('watchList', player);
      } else {
        const headers = getHeaders(token);

        user = (await axios.put(
            `${baseUrl}/users/removePlayer`,
            player,
            { headers })
        ).data;
      }
      dispatch({ type: ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST, player });
    } catch (error) {
      console.log('userActions error: ', error);
    }
  };
}