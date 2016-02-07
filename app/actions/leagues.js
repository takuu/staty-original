import {
  SET_LEAGUE,
  SET_ALL_LEAGUES
} from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://localhost:1337/api';

export function getAllLeagues () {
  return async (dispatch) => {
    try {
      const leagues = (await axios.get(`${baseUrl}/leagues`)).data;
      dispatch({ type: SET_ALL_LEAGUES, leagues });
    } catch (error) {
    }
  };
}
export function getLeagueByName (name = '') {
  return async (dispatch) => {
    try {
      const league = (await axios.get(`${baseUrl}/leagues/search/?name=` + name)).data;
      dispatch({ type: SET_LEAGUE, league });
    } catch (error) {
    }
  };
}

