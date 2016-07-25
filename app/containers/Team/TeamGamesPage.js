import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getGamesByTeamId } from '../../actions/gameActions';
import { getAggregateTeamStatsByDivisionId } from '../../actions/statActions';
import LeagueSchedule from '../../components/core/LeagueSchedule/LeagueSchedule.js';

@connect((state, router) => {
  const {leagueName, teamId} = router.params;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.filter(gamesJS, (game) => {
    return (game.awayTeam._id === teamId || game.homeTeam._id === teamId);
  });

  // const aggregateStats = state.aggregateStats;
  return {league: league, games: games};
}, {
  getGamesByTeamId,
  getAggregateTeamStatsByDivisionId
})
class TeamGamesPage extends React.Component {
  static propTypes = {
    league: PropTypes.object,
    games: PropTypes.array
  };

  static defaultProps = {
    league: {},
    games: []
  };

  static fillStore (redux, route) {
    return Promise.all([
      redux.dispatch(getAggregateTeamStatsByDivisionId(route.params.divisionId)),
      redux.dispatch(getGamesByTeamId(route.params.teamId))
    ]);
  }

  render () {
    let {league, games} = this.props;
    return (
      <div>
        <LeagueSchedule league={league} games={games} />
      </div>
    );
  }
}

export default TeamGamesPage;
