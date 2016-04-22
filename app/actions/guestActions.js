import ActionTypes from '../constants/actions';

import axios from 'axios';
import getHeaders from '../utils/getHeaders';
import storage from '../utils/localStore';
import config from '../../api/config.json';
const baseUrl = `http://localhost:${config.port}/api`;


export function addPlayerToWatchList (player) {
  return async (dispatch, getState) => {
    try {
      // TODO: Add check to see if user is already logged in
      const guests = storage.add('watchList', player);

      dispatch({ type: ActionTypes.SET_PLAYER_TO_WATCH_LIST, guests });
    } catch (error) {
      console.error('guestActions error: ', error);
    }
  };
}
export function fetchWatchList () {
  //TODO: fetch the full watchList
  return async (dispatch, getState) => {
    try {
      // TODO: Add check to see if user is already logged in
      const guests = storage.get('watchList');
      dispatch({ type: ActionTypes.SET_PLAYER_TO_WATCH_LIST, guests });
    } catch (error) {
      console.error('guestActions error: ', error);
    }
  };
}


export function removePlayerFromWatchList (player) {
  return async (dispatch, getState) => {
    try {

      const guest = storage.remove('watchList', player && player._id);


      dispatch({ type: ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST, guest });
    } catch (error) {
      console.error('guestActions error: ', error);
    }
  };
}