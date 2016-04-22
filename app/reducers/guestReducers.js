import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLAYER_TO_WATCH_LIST:
      _.map(action.guests, (guest, index) => {
        state = state.set(guest._id, guest);
      });
      return state;
      break;

    case ActionTypes.REMOVE_PLAYER_FROM_WATCH_LIST:
      state = state.delete(action.guest._id);
      return state;
      break;

    default:
      return state;
  }
};
