import {
  SET_SEASON,
  SET_SEASONS_BY_LEAGUE
} from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';

const baseUrl = 'http://localhost:1337/api';

export function getSeasonById(id='') {
  return async (dispatch) => {
    try {
      const season = (await axios.get(baseUrl + '/seasons/' + id)).data;
      dispatch({ type: SET_SEASON, season });
    } catch (error) {
      console.log('seasonActions error: ', error)
    }
  };
}
export function getSeasonsByLeagueId(id='') {
  return async (dispatch) => {
    try {
      const seasons = (await axios.get(`${baseUrl}/seasons/league/` + id)).data;
      dispatch({ type: SET_SEASONS_BY_LEAGUE, seasons });
    } catch (error) {
      console.log('seasonActions error: ', error);
    }
  };
}
