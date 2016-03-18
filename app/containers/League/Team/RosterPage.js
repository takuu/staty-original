import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import { getPlayersWithFilters } from '../../../actions/playerActions';
import PlayerList from '../../../components/core/PlayerList/PlayerList';

@connect((state, router) => {
  const teamId = router.params.teamId;

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, (player) => {
    return player.team._id === teamId;
  });

  return {players: players};
}, {
  getPlayersWithFilters
})
class RosterPage extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    league: PropTypes.object,
    games: PropTypes.array,
    players: PropTypes.array
  };

  static fillStore (redux, route) {
    redux.dispatch(getPlayersWithFilters({team: route.params.teamId}));
  }

  render () {
    let {league, players, games} = this.props;
    return (
      <div>
        <PlayerList league={league} players={players}></PlayerList>
      </div>
    );
  }
}

export default RosterPage;
