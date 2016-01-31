import {
  SET_TEAM,
  SET_TEAMS_BY_LEAGUE,
  SET_TEAMS_BY_DIVISION,
  UPDATE_TEAM
} from '../constants/actions';

import Immutable from 'immutable';
import _ from 'lodash';

const defaultState = new Immutable.Map({});

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_TEAMS_BY_LEAGUE:
      _.map(action.teams, (team) => {
        state = state.set(team._id, team);
      });
      return state;
      break;
    case SET_TEAMS_BY_DIVISION:
      _.map(action.teams, (team) => {
        state = state.set(team._id, team);
      });
      return state;
      break;
    case SET_TEAM:
      return state.set(action.team._id, action.team);
      break;
    case UPDATE_TEAM:
      return state.set(action.team._id, action.team);
      break;
    default:
      return state;
  }
};

