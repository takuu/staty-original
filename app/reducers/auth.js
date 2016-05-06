/*import {
  ROUTER_STATE_CHANGE,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  SIGNUP_FAILURE,

  LOGOUT,

  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  FETCH_PROFILE_SUCCESS
} from '../constants/actions';*/

import ActionTypes from '../constants/actions';

const initialState = {
  error: null, // last occured error
  token: null,
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ROUTER_STATE_CHANGE:
      return {
        ...state,
        error: null
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        token: action.token
      };
    case ActionTypes.SIGNUP_FAILURE:
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case ActionTypes.LOGOUT:
      return { ...initialState };

    case ActionTypes.SAVE_PROFILE:
    case ActionTypes.SAVE_PROFILE_SUCCESS:
    case ActionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, ...action.user },
        error: null
      };
    default:
      return state;
  }
};
