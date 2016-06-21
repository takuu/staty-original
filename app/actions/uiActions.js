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
