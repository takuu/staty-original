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

    const homeGames = _.filter(stats, (stat) => {
      return helpers.getObjId(stat.team) === stat.game.homeTeam;
    });
    const awayGames = _.filter(stats, (stat) => {
      return helpers.getObjId(stat.team) === stat.game.awayTeam;
    });

    const orderedStats = _.sortBy(stats, (stat) => {
      const { game } = stat;
      var d = new Date().toISOString().slice(0, 10);
      var gameTime = new Date(`${d} ${game.time}`);
      return gameTime;
    });
    const gameTimes = _.groupBy(orderedStats, 'game.time');
    const gamesGroup = _.groupBy(stats, 'game._id');
    const uniqueGames = _.map(gamesGroup, (list) => {
      return list[0];
    });
    const record = statParser.getWinLoss(uniqueGames);
    const gamesPlayed = (Object.keys(gamesGroup)).length;
    const cummulative = {record: `${record.win} - ${record.loss}`, gamesPlayed};
    return (
      <div>
        <div className='sub-title-container'>
          <HighStats title='Cummulative Stats' highs={cummulative} />
          <HighStats title='Cummulative High' highs={maxStats} />

          <SplitStats statList={{'Home': homeGames, 'Away': awayGames}} showTotal={true} />

          <div className='sub-title'>Game Times</div>
          <SplitStats statList={gameTimes} showTotal={true} />
        </div>
      </div>
    );
    const maxStats = statParser.getMaxStats(stats);

    // TODO: Need stat average throughout all seasons
  }
}

export default ProfileHomePage;
