import ActionTypes from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';
import storage from '../utils/localStore';
import cookie from '../utils/cookie';
import config from '../../api/config.json';
import _ from 'lodash';
const baseUrl = `http://localhost:${config.port}/api`;

function saveAuthToken (token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}
export function addPlayerToWatchList (player = {}) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      let followList = storage.add('watchList', player);
      let user = { players: followList };
      if (token) {
        const headers = getHeaders(token);
        const ids = _.map(followList, '_id');
        user = (await axios.put(`${baseUrl}/users/addwatch`, { players: ids }, { headers })).data;
        if (user && user.players) storage.set('watchList', user.players);
      }

      // TODO: Add check to see if user is already logged in

      dispatch({ type: ActionTypes.SET_PLAYER_TO_WATCH_LIST, user });
    } catch (error) {
      console.error('followActions error: ', error);
    }
  };
}

export function removePlayerFromWatchList (player = {}) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      let followList = storage.remove('watchList', player);
      let user = { players: followList };
      if (token) {
        const headers = getHeaders(token);
        user = (await axios.put(`${baseUrl}/users/removewatch`, { playerId: player._id }, { headers })).data;
        storage.set('watchList', user.players);
      }

      dispatch({ type: ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST, user });
    } catch (error) {
      console.error('followActions error: ', error);
    }
  };
}

export function getUserProfile () {
  // TODO: fetch the full watchList
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      const headers = getHeaders(token);
      let user = (await axios.get(`${baseUrl}/users/watchlist`, { headers })).data;
      let { players } = user;
      if (players && players.length) {
        storage.set('watchList', players);
      } else {
        players = storage.get('watchList');
        user = { players: players };
      }
      dispatch({ type: ActionTypes.SET_USER, user });
    } catch (error) {
      console.error('userActions error: ', error);
    }
  };
}

export function getUserStats () {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      const headers = getHeaders(token);
      let user = (await axios.get(`${baseUrl}/users/watchlist`, { headers })).data;
      let { players } = user;
      if (players && players.length) {
        storage.set('watchList', players);
        const list = _.map(players, '_id');
        const statBaseUrl = `http://localhost:${config.port}/api`;
        const stats = (await axios.get(statBaseUrl + '/stats/players/?id=' + list.toString())).data;
        debugger;
        dispatch({ type: ActionTypes.SET_STATS_OF_PLAYER_LIST, stats });

      } else {
        players = storage.get('watchList');
        user = { players: players };
      }
      dispatch({ type: ActionTypes.SET_USER, user });
    } catch (error) {
      console.error('userActions error: ', error);
    }
  };
}

export function addFacebookUser (fbUser = {}) {
  return async (dispatch) => {
    try {
      if (fbUser && !fbUser.id) return;
      console.log('adding... ', fbUser);
      const followList = storage.get('watchList');
      const newUser = (await axios.put(baseUrl + '/users/addFacebookUser/', { user: fbUser, players: followList })).data;
      const {token, user} = newUser;
      saveAuthToken(token);
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, token });
      // dispatch({ type: ActionTypes.FETCH_PROFILE_SUCCESS, user });
      dispatch({ type: ActionTypes.SET_USER, user: user });
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

