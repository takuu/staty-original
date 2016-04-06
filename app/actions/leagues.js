import ActionTypes from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://localhost:3000/api';

export function getAllLeagues () {
  return async (dispatch) => {
    try {
      const leagues = (await axios.get(`${baseUrl}/leagues`)).data;
      dispatch({ type: ActionTypes.SET_ALL_LEAGUES, leagues });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getLeagueByName (name = '') {
  return async (dispatch) => {
    try {
      const league = (await axios.get(`${baseUrl}/leagues/search/?name=` + name)).data;
      dispatch({ type: ActionTypes.SET_LEAGUE, league: league });
    } catch (error) {
      console.log(error);
    }
  };
}

