import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import { getStatsByPlayerId } from '../../actions/statActions';
import statParser from '../../utils/statParser';
import SplitStatsv2 from '../../components/core/SplitStats/SplitStatsv2';
import HighStats from '../../components/core/HighStats/HighStats';

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
class PlayerProfilePage extends React.Component {
  constructor (props) {
    super(props);
  }
  static propTypes = {
    league: PropTypes.object,
    players: PropTypes.array,
    stats: PropTypes.array
  };

  static defaultProps = {
    league: {},
    players: [],
    stats: []
  };

  static fillStore (redux, route) {
    let {playerId} = route.params;
    redux.dispatch(getStatsByPlayerId(playerId));
  }

  render () {
    let {league, players, stats} = this.props;
    const LATEST = 3;

    let maxes = statParser.getMaxStats(stats);
    const winnings = statParser.getWinningStats(stats) || [];
    const losings = statParser.getLosingStats(stats) || [];
    const latest = statParser.getLatestStats(stats, LATEST) || [];
    return (
      <div>
        <HighStats highs={maxes} />
        <br/>
        <SplitStatsv2 statList={{'Season Average': stats}} />
        <SplitStatsv2 statList={{'Lasted 3 Games': latest}} />
        <SplitStatsv2 statList={{'In Wins': winnings}} />
        <SplitStatsv2 statList={{'In Losses': losings}} />
      </div>
    );
  }
}

export default PlayerProfilePage;
