import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import SplitStatsv2 from '../../components/core/SplitStats/SplitStatsv2';
import helpers from '../../utils/helpers';
import statParser from '../../utils/statParser';

class ProfileStatsPage extends React.Component {
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

  render () {
    let {watchList, stats} = this.props;
    const LATEST = 3;

    const homeGames = _.filter(stats, (stat) => {
      return helpers.getObjId(stat.team) === stat.game.homeTeam;
    });
    const awayGames = _.filter(stats, (stat) => {
      return helpers.getObjId(stat.team) === stat.game.awayTeam;
    });

    const winnings = statParser.getWinningStats(stats) || [];
    const losings = statParser.getLosingStats(stats) || [];
    const latest = statParser.getLatestStats(stats, LATEST) || [];

    const orderedStats = _.sortBy(stats, (stat) => {
      const { game } = stat;
      var d = new Date().toISOString().slice(0,10);
      var gameTime = new Date(`${d} ${game.time}`);
      return gameTime;
    });
    const gameTimes = _.groupBy(orderedStats, 'game.time');

    const divisionSplits = _.groupBy(stats, 'division._id');
    let divisionSplitsHash = {};
    _.map(Object.keys(divisionSplits), (key, index) => {
      const stats = divisionSplits[key];
      const divisionName = stats[0].division.name;
      const seasonName = stats[0].season.name;
      const boo = `${divisionName} ${seasonName}`;
      divisionSplitsHash[boo] = stats;
    });

    return (
      <div>
        <div className='sub-title-container'>

          <SplitStatsv2 statList={{'Home': homeGames, 'Away': awayGames}} showTotal={true} />

          <div className='sub-title'>Game Times</div>
          <SplitStatsv2 statList={gameTimes} showTotal={true} />

          <div className='sub-title'>Last {LATEST} Games</div>
          <SplitStatsv2 statList={{'Last 3 Games': latest}} showTotal={false} />

          <div className='sub-title'>Game Splits</div>
          <SplitStatsv2 statList={{'In Wins': winnings, 'In Losses': losings}} showTotal={false} />

          <div className='sub-title'>Season Splits</div>
          <SplitStatsv2 statList={divisionSplitsHash} showTotal={false} />
        </div>
      </div>
    );
  }
}

export default ProfileStatsPage;
