import ActionTypes from '../constants/actions';

import axios from 'axios';

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