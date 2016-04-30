/*import {
  ROUTER_STATE_CHANGE
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';

export default (state = null, action) => {
  switch (action.type) {
    case ActionTypes.ROUTER_STATE_CHANGE:
      return action.state;

    default:
      return state;
  }
};
