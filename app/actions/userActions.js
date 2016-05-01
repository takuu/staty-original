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

export function addFacebookUser (fbUser = {}) {
  return async (dispatch) => {
    try {
      // const {accessToken} = fbUser;
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

