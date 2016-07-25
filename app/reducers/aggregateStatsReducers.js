import ActionTypes from '../constants/actions';
import Immutable from 'immutable';
import _ from 'lodash';


/*  Example of Data Structure
 {
 aggregateStatsOfTeamByDivision: {
 '56f5643d04be07211c649922': [{}, {}]
 }
 }

 */
const defaultAggregateStatState = {aggregateStatsOfTeamByDivision: {}};

export default(state = defaultAggregateStatState, action) => {
  switch (action.type) {
    case ActionTypes.SET_COMBINED_STATS_OF_TEAM_BY_DIVISION:
      _.map(action.stats, (stat) => {
        state.aggregateStatsOfTeamByDivision = state.aggregateStatsOfTeamByDivision.set(stat._id, stat);
      });
      debugger;
      return state;
    default:
      return state;
  }
};

