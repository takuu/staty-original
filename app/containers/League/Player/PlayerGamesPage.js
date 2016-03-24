import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import { getStatsByPlayerId } from '../../../actions/statActions';
import GameLog from '../../../components/core/GameLog/GameLog';

@connect((state, router) => {
  const {teamId, playerId} = router.params;

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, (player) => {
    return player.team._id === teamId;
  });

  const statsJS = state.stats.toJS();
  const stats = _.filter(statsJS,(stat)=>{
    return stat.player === playerId;
  });

  return {players: players, stats: stats};
}, {
  getStatsByPlayerId
})
class RosterPage extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    league: PropTypes.object,
    players: PropTypes.array,
    stats: PropTypes.array
  };

  static fillStore (redux, route) {
    redux.dispatch(getStatsByPlayerId(route.params.playerId));
  }

  render () {
    let {league, players, stats} = this.props;
    return (
      <div>
        <GameLog stats={stats} title={'hi'} />
      </div>
    );
  }
}

export default RosterPage;
