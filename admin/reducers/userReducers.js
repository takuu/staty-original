/*import {
  SET_USER
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

// const defaultState = new Immutable.Map({});
const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      // return state.set(action.user._id, action.user);
      return {
        ...action.user
      };
      break;
    default:
      return state;
  }
};

