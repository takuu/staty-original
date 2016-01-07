import {
  SET_PLAYERS_WITH_FILTERS,
  SEARCH_PLAYER,
  SET_PLAYER,
  SET_PLAYERS_BY_TEAM
} from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';
import helpers from '../utils/helpers';

const baseUrl = 'http://localhost:1337/api';

export function getPlayerById(id='') {
  return async (dispatch) => {
    try {
      const player = (await axios.get(baseUrl + '/players/' + id)).data;
      dispatch({ type: SET_PLAYER, player });
    } catch (error) {
      console.log('playerActions error: ', error)
    }
  };
}

export function getPlayersByTeamId(id='') {
  return async (dispatch) => {
    try {
      const player = (await axios.get(baseUrl + '/players/' + id)).data;
      dispatch({ type: SET_PLAYERS_BY_TEAM, player });
    } catch (error) {
      console.log('playerActions error: ', error)
    }
  };
}

export function searchPlayer(name='') {
  return async (dispatch) => {
    try {
      const players = (await axios.get(baseUrl + '/players/search/?q=' + name)).data;
      const result = _.map(players, function (item) {
        return _.extend({}, item, {searchName: name});
      });
      dispatch({ type: SEARCH_PLAYER, players: result });
    } catch (error) {
      console.log('playerActions error: ', error)
    }
  };
}
export function getPlayersWithFilters(params={}) {
  return async (dispatch) => {
    try {
      let query = helpers.jsonToQueryString(params);
      const players = (await axios.get(`${baseUrl}/players/?` + query)).data;
      dispatch({ type: SET_PLAYERS_WITH_FILTERS, players });
    } catch (error) {
      console.log('playerActions error: ', error);
    }
  };
}
