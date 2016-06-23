import ActionTypes from '../constants/actions';

export function showLoginModal () {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.SHOW_LOGIN_MODAL, showLoginModal: true });
    } catch (error) {
      console.log('uiActions error: ', error);
    }
  };
}

export function hideLoginModal () {
  return async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.HIDE_LOGIN_MODAL, showLoginModal: false });
    } catch (error) {
      console.log('uiActions error: ', error);
    }
  };
}
