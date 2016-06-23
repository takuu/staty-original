
import ActionTypes from '../constants/actions';
import _ from 'lodash';

const defaultState = {
  showLoginModal: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOGIN_MODAL:
      debugger;
      return {
        showLoginModal: action.showLoginModal
      };
    case ActionTypes.HIDE_LOGIN_MODAL:
      debugger;
      return {
        showLoginModal: action.showLoginModal
      };
    default:
      return state;
  };
};

