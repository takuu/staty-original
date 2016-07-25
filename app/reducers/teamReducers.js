import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SET_TEAMS_BY_LEAGUE:
      _.map(action.teams, (team) => {
        state = state.set(team._id, team);
      });
      return state;
      break;
    case ActionTypes.SET_TEAMS_BY_DIVISION:
      _.map(action.teams, (team) => {
        state = state.set(team._id, team);
      });
      return state;
      break;
    case ActionTypes.SET_TEAM:
      return state.set(action.team._id, action.team);
      break;
    case ActionTypes.UPDATE_TEAM:
      return state.set(action.team._id, action.team);
      break;
    default:
      return state;
  }
};

