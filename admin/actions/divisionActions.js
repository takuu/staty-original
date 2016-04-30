/*import {
  SET_ALL_ACTIVE_DIVISIONS,
  SET_DIVISIONS_BY_SEASON,
  SET_DIVISION,
  SET_DIVISIONS_BY_LEAGUE,
  UPDATE_DIVISION
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

import config from '../../api/config.json';
const baseUrl = `http://localhost:${config.port}/api`;

export function getDivisionById (id = '') {
  return async (dispatch) => {
    try {
      const division = (await axios.get(baseUrl + '/divisions/' + id)).data;
      dispatch({ type: ActionTypes.SET_DIVISION, division });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}

export function getActiveDivisionByLeagueId (id = '') {
  return async (dispatch) => {
    try {
      const divisions = (await axios.get(baseUrl + '/divisions/active/' + id)).data;
      dispatch({ type: ActionTypes.SET_ALL_ACTIVE_DIVISIONS, divisions });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}

export function getActiveDivisionByLeagueName (name = '') {
  return async (dispatch) => {
    try {
      const divisions = (await axios.get(baseUrl + '/divisions/activeName/' + name)).data;
      dispatch({ type: ActionTypes.SET_ALL_ACTIVE_DIVISIONS, divisions });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}


export function getDivisionsBySeasonId (id = '') {
  return async (dispatch) => {
    try {
      const divisions = (await axios.get(`${baseUrl}/divisions/season/` + id)).data;
      dispatch({ type: ActionTypes.SET_DIVISIONS_BY_SEASON, divisions });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}
export function getDivisionsByLeagueId (id = '') {
  return async (dispatch) => {
    try {
      const divisions = (await axios.get(`${baseUrl}/divisions/league/` + id)).data;
      dispatch({ type: ActionTypes.SET_DIVISIONS_BY_LEAGUE, divisions });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}

export function getDivisionsByLeagueName (name = '') {
  return async (dispatch) => {
    try {
      const divisions = (await axios.get(`${baseUrl}/divisions/leagueName/` + name)).data;
      dispatch({ type: ActionTypes.SET_DIVISIONS_BY_LEAGUE, divisions });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}

export function updateDivision (item) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      let headers = getHeaders(token);
      debugger;
      const division = (await axios.put(`${baseUrl}/divisions/` + item._id, item, { headers })).data;
      dispatch({ type: ActionTypes.UPDATE_DIVISION, division });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}
