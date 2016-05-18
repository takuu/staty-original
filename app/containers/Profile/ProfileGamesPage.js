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
class ProfileGamesPage extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    watchList: PropTypes.array,
    stats: PropTypes.array,
    user: PropTypes.object
  };
  static defaultProps = {
    watchList: [],
    stats: [],
    user: {}
  };

  static fillStore (redux, route) {
    const { user } = this.props;
    debugger;
  }

  render () {
    let {watchList, stats} = this.props;
    
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

          <SplitStats stats={homeGames} title='Home' />
          <SplitStats stats={awayGames} title='Away' />
          <div className='sub-title'>Game Times</div>
          {
            _.map(gameTimes, (time, key) => {
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

export default ProfileGamesPage;
