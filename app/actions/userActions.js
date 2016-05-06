import ActionTypes from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';
import storage from '../utils/localStore';
import cookie from '../utils/cookie';
import config from '../../api/config.json';
const baseUrl = `http://localhost:${config.port}/api`;


function saveAuthToken (token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}
export function addPlayerToWatchList (playerId) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      let followList = storage.add('watchList', playerId);
      if (token) {
        const headers = getHeaders(token);
        debugger;
        const user = (await axios.put(`${baseUrl}/users/addwatch`, { players: followList }, { headers })).data;
        if (user && user.players) storage.set('watchList', user.players);
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
        debugger;
        const user = (await axios.put(`${baseUrl}/users/removewatch`, { playerId }, { headers })).data;
        storage.set('watchList', user.players);
      }

      dispatch({ type: ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST, followList });
    } catch (error) {
      console.error('followActions error: ', error);
    }
  };
}


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
      dispatch({ type: ActionTypes.SET_FACEBOOK, season });
    } catch (error) {
      console.log('userActions error: ', error);
    }
  };
}

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

export function addFacebookUser (fbUser = {}) {
  return async (dispatch) => {
    try {
      console.log('adding... ', fbUser);
      debugger;
      const newUser = (await axios.put(baseUrl + '/users/addFacebookUser/', { user: fbUser })).data;
      const {token, user} = newUser;
      saveAuthToken(token);
      debugger;
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, token });
      // dispatch({ type: ActionTypes.FETCH_PROFILE_SUCCESS, user });
      dispatch({ type: ActionTypes.SET_USER, user: newUser });
    } catch (error) {
      console.log('userActions error: ', error);
    }
  };
}

export function getProfile (id = '') {
  return async (dispatch) => {
    try {
      const user = (await axios.get(baseUrl + '/users/' + id)).data;
      dispatch({ type: ActionTypes.SET_USER, user });
    } catch (error) {
      console.log('userActions error: ', error);
    }
  };
}

