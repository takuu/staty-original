import {
  SET_ALL_ACTIVE_DIVISIONS,
  SET_DIVISIONS_BY_SEASON,
  SET_DIVISION,
  SET_ALL_DIVISIONS
} from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://localhost:1337/api';

export function getDivisionById(id='') {
  return async (dispatch) => {
    try {
      const division = (await axios.get(baseUrl + '/divisions/' + id)).data;
      dispatch({ type: SET_DIVISION, division });
    } catch (error) {
      console.log('divisionActions error: ', error)
    }
  };
}

export function getActiveDivisionByLeagueId(id='') {
  return async (dispatch) => {
    try {
      const divisions = (await axios.get(baseUrl + '/divisions/active/' + id)).data;
      dispatch({ type: SET_ALL_ACTIVE_DIVISIONS, divisions });
    } catch (error) {
      console.log('divisionActions error: ', error)
    }
  };
}
export function getDivisionsBySeasonId(id='') {
  return async (dispatch) => {
    try {
      const divisions = (await axios.get(`${baseUrl}/divisions/season/` + id)).data;
      dispatch({ type: SET_DIVISIONS_BY_SEASON, divisions });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}
export function getAllDivisions() {
  return async (dispatch) => {
    try {
      const divisions = (await axios.get(`${baseUrl}/divisions/`)).data;
      dispatch({ type: SET_ALL_DIVISIONS, divisions });
    } catch (error) {
      console.log('divisionActions error: ', error);
    }
  };
}