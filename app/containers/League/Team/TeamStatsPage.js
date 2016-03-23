import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import TeamStatList from '../../../components/core/TeamStatList/TeamStatList';
import { getPlayersWithFilters } from '../../../actions/playerActions';
import { getStatsByTeamId } from '../../../actions/statActions';

@connect((state, router) => {
  const teamId = router.params.teamId;

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, (player) => {
    return player.team._id === teamId;
  });

  const statsJS = state.stats.toJS();
  const stats = _.filter(statsJS, (stat) => {
    return stat.team._id === teamId || stat.vsTeam._id === teamId;
  });

  return {players: players, stats: stats};
}, {
  getPlayersWithFilters,
  getStatsByTeamId
})
class TeamStatsPage extends React.Component {
  constructor (props) {
    super(props);
  }
  static propTypes = {
    league: PropTypes.object,
    players: PropTypes.array,
    stats: PropTypes.array
  };

  static fillStore (redux, route) {
    redux.dispatch(getPlayersWithFilters({team: route.params.teamId}));
    redux.dispatch(getStatsByTeamId(route.params.teamId));
  }

  render () {
    let {league, players, stats} = this.props;
    return (
      <div>
        <TeamStatList stats={stats} league={league} players={players} />
      </div>
    );
  }
}

export default TeamStatsPage;
