/*import {
  ROUTER_STATE_CHANGE
} from '../constants/actions';*/
import ActionTypes from '../constants/actions';

export function routerStateChange (state) {
  return {
    type: ActionTypes.ROUTER_STATE_CHANGE,
    state
  };
}
