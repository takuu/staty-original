import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import { getStatsByPlayerId } from '../../../actions/statActions';
import SplitStats from '../../../components/core/SplitStats/SplitStats';

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

    const gameTimes = _.groupBy(stats, 'game.time');
    return (
      <div>
        <div className='sub-title-container'>
          <div className='sub-title'>Split Stats</div>

          <p>Home Away</p>
          <SplitStats stats={homeGames} title='Home' />
          <SplitStats stats={awayGames} title='Away' />
          <p>Game Times</p>
          {
            _.map(gameTimes,(time, key) => {
              return (
                <SplitStats key={key} stats={time} title={key} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default PlayerStatsPage;
