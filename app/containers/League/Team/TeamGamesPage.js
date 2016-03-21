import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import { getGamesByTeamId } from '../../../actions/gameActions';
import LeagueSchedule from '../../../components/core/LeagueSchedule/LeagueSchedule.js';

@connect((state, router) => {
  const {leagueName, teamId} = router.params;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.filter(gamesJS, (game) => {
    return (game.awayTeam._id === teamId || game.homeTeam._id === teamId);
  });

  return {league: league, games: games};
}, {
  getGamesByTeamId
})
class RosterPage extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    league: PropTypes.object,
    games: PropTypes.array
  };

  static fillStore (redux, route) {
    redux.dispatch(getGamesByTeamId(route.params.teamId));
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

export default RosterPage;
