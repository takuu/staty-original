import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import { getStatsByPlayerId } from '../../actions/statActions';
import SplitStats from '../../components/core/SplitStats/SplitStats';

@connect((state, router) => {
  const {teamId, playerId} = router.params;

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, (player) => {
    return player.team._id === teamId;
  });

  const statsJS = state.stats.toJS();
  const stats = _.filter(statsJS, (stat) => {
    return stat.player === playerId;
  });

  return {players: players, stats: stats};
}, {
  getStatsByPlayerId
})
class PlayerStatsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    league: PropTypes.object,
    players: PropTypes.array,
    stats: PropTypes.array
  };

  static fillStore (redux, route) {
    return redux.dispatch(getStatsByPlayerId(route.params.playerId));
  }

  render () {
    let {league, players, stats} = this.props;

    const homeGames = _.filter(stats, (game) => {
      return game.team === game.game.homeTeam;
    });
    const awayGames = _.filter(stats, (game) => {
      return game.team === game.game.awayTeam;
    });

    const orderedStats = _.sortBy(stats, (stat) => {
      const { game } = stat;
      let d = new Date().toISOString().slice(0, 10);
      let gameTime = new Date(`${d} ${game.time}`);
      return gameTime;
    });
    const gameTimes = _.groupBy(orderedStats, 'game.time');
    return (
      <div>
        <div className='sub-title-container'>
          <SplitStats statList={{'Home': homeGames, 'Away': awayGames}} />
          <div className='sub-title'>Game Times</div>
          <SplitStats statList={gameTimes} />

        </div>
      </div>
    );
  }
}

export default PlayerStatsPage;
