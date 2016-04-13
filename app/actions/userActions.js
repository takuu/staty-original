import ActionTypes from '../constants/actions';

import axios from 'axios';

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