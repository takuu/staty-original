import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import SplitStats from '../../components/core/SplitStats/SplitStats';
import CombinedStats from '../../components/core/SplitStats/CombinedStats';
import HighStats from '../../components/core/HighStats/HighStats';
import helpers from '../../utils/helpers';
import statParser from '../../utils/statParser';

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
      var d = new Date().toISOString().slice(0,10);
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
    const maxStats = statParser.getMaxStats(stats);

    // TODO: Need stat average throughout all seasons
    return (
      <div>
        <div className='sub-title-container'>

          <HighStats title='Cummulative Stats' highs={cummulative} />
          <HighStats title='Cummulative High' highs={maxStats} />
          <SplitStats stats={homeGames} title='Home' />
          <SplitStats stats={awayGames} title='Away' showHeader={false} />
          <CombinedStats stats={stats} title='Total' showHeader={false} />
          <div className='sub-title'>Game Times</div>
          {
            _.map(Object.keys(gameTimes), (key, index) => {
              const time = gameTimes[key];
              return (
                <SplitStats key={key} stats={time} title={key} showHeader={!index} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default ProfileGamesPage;
