import {
  SET_TEAM,
  SET_TEAMS_BY_LEAGUE,
  SET_TEAMS_BY_DIVISION,
  UPDATE_TEAM
} from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://localhost:1337/api';

export function getTeamById (id = '') {
  return async (dispatch) => {
    try {
      const team = (await axios.get(baseUrl + '/teams/' + id)).data;
      dispatch({ type: SET_TEAM, team });
    } catch (error) {
      console.log('teamActions error: ', error);
    }
  };
}
export function getTeamsByLeagueId (id = '') {
  return async (dispatch) => {
    try {
      const teams = (await axios.get(`${baseUrl}/teams/league/` + id)).data;
      dispatch({ type: SET_TEAMS_BY_LEAGUE, teams });
    } catch (error) {
      console.log('teamActions error: ', error);
    }
  };
}

export function getTeamsByDivisionId (id = '') {
  return async (dispatch) => {
    try {
      const teams = (await axios.get(`${baseUrl}/teams/division/` + id)).data;
      dispatch({ type: SET_TEAMS_BY_DIVISION, teams });
    } catch (error) {
      console.log('teamActions error: ', error);
    }
  };
}

export function updateTeam (item) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();
      let headers = getHeaders(token);
      debugger;
      const team = (await axios.put(`${baseUrl}/teams/` + item._id, item, { headers })).data;
      dispatch({ type: UPDATE_TEAM, team });
    } catch (error) {
      console.log('teamActions error: ', error);
    }
  };
}
