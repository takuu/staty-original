import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import SplitStats from '../../components/core/SplitStats/SplitStats';
import CombinedStats from '../../components/core/SplitStats/CombinedStats';
import HighStats from '../../components/core/HighStats/HighStats';
import helpers from '../../utils/helpers';
import statParser from '../../utils/statParser';

class ProfileHomePage extends React.Component {
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

    /*const orderedStats = _.sortBy(stats, (stat) => {
      const { game } = stat;
      var d = new Date().toISOString().slice(0, 10);
      var gameTime = new Date(`${d} ${game.time}`);
      return gameTime;
    });*/
    // const gameTimes = _.groupBy(orderedStats, 'game.time');
    const gamesGroup = _.groupBy(stats, 'game._id');
    const uniqueGames = _.map(gamesGroup, (list) => {
      return list[0];
    });

    const latest = statParser.getLatestStats(stats, LATEST) || [];

    const divisionSplits = _.groupBy(stats, 'division._id');
    let divisionSplitsHash = {};
    _.map(Object.keys(divisionSplits), (key, index) => {
      const stats = divisionSplits[key];
      const divisionName = stats[0].division.name;
      const seasonName = stats[0].season.name;
      const name = `${divisionName} ${seasonName}`;
      divisionSplitsHash[name] = stats;
    });

    const record = statParser.getWinLoss(uniqueGames);
    const gamesPlayed = (Object.keys(gamesGroup)).length;
    const cummulative = {record: `${record.win} - ${record.loss}`, gamesPlayed};
    const maxStats = statParser.getMaxStats(stats);
    return (
      <div>
        <div className='sub-title-container'>
          {/*<HighStats title='Cummulative Stats' highs={cummulative} />*/}
          <HighStats title='CUMMULATIVE HIGH' highs={maxStats} />

          <div className='sub-title'>Last {LATEST} Games</div>
          <SplitStats statList={{'Last 3 Games': latest}} showTotal={false} />

          <div className='sub-title'>Season Splits</div>
          <SplitStats statList={divisionSplitsHash} showTotal={true} />
        </div>
      </div>
    );

    // TODO: Need stat average throughout all seasons
  }
}

export default ProfileHomePage;
