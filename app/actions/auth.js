/*import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,

  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,

  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAILURE
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';

import cookie from '../utils/cookie';
import redirectBackAfter from '../utils/redirectBackAfter';
import axios from 'axios';
import getHeaders from '../utils/getHeaders.js';

import config from '../../api/config.json';
const baseUrl = `http://localhost:${config.port}`;

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

export function signup (email, password, router) {
  return async (dispatch) => {
    try {
      const { data: { token, user } } = await axios.post(`${baseUrl}/signup`, {
        email,
        password
      });

      saveAuthToken(token);

      dispatch({ type: ActionTypes.LOGIN_SUCCESS, token });
      dispatch({ type: ActionTypes.FETCH_PROFILE_SUCCESS, user });
      dispatch({ type: ActionTypes.SIGNUP_SUCCESS });
      // TODO: don't do it here.
      router.transitionTo('/profile');
    } catch (error) {
      dispatch({
        type: ActionTypes.SIGNUP_FAILURE,
        error: (error.status === 409)
          ? Error('User with such an email already exists')
          : Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}

export function login(email, password, router) {
  return async (dispatch) => {
    try {
      const { data: { token, user } } = await axios.post(`${baseUrl}/login`, {
        email,
        password
      });
      saveAuthToken(token);

      dispatch({ type: ActionTypes.LOGIN_SUCCESS, token });
      dispatch({ type: ActionTypes.FETCH_PROFILE_SUCCESS, user });

      const { query } = router.state.location;
      const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/';
      // TODO: don't do it here.
      router.transitionTo(redirectTo);
    } catch (err) {
      let error = (err.status === 401)
        ? Error('Incorrect email or password')
        : Error('Unknown error occured :-(. Please, try again later.');

      dispatch({ type: ActionTypes.LOGIN_FAILURE, error });
    }
  };
}

export function logout(router) {
  return dispatch => {
    cookie.unset('token');
    cookie.removeAll();

    dispatch({ type: ActionTypes.LOGOUT, token: {} });
    dispatch({ type: ActionTypes.LOGOUT_PROFILE_SUCCESS, user: {} });
    dispatch({ type: ActionTypes.REMOVE_USER, user: {} });

    // router.transitionTo(...redirectBackAfter('/login', router.state));
  };
}

export function fetchProfile () {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const user = (await axios.get(`${baseUrl}/profile`, { headers })).data;
      debugger;
      dispatch({ type: ActionTypes.FETCH_PROFILE_SUCCESS, user });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_PROFILE_FAILURE, error });
    }
  };
}
export function fetchUserProfile () {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const user = (await axios.get(`${baseUrl}/api/users/profile`, { headers })).data;
      // dispatch({ type: ActionTypes.FETCH_PROFILE_SUCCESS, user });
      dispatch({ type: ActionTypes.SET_USER, user: user });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_PROFILE_FAILURE, error });
    }
  };
}


export function saveProfile(user) {
  return async (dispatch, getState) => {
    const { auth: { token } } = getState();

    dispatch({ type: ActionTypes.SAVE_PROFILE, user });

    try {
      const headers = getHeaders(token);

      user = (await axios.put(
        `${baseUrl}/profile`,
         user,
        { headers })
      ).data;

      dispatch({ type: ActionTypes.SAVE_PROFILE_SUCCESS, user });
    } catch (error) {
      dispatch({
        type: ActionTypes.SAVE_PROFILE_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}
