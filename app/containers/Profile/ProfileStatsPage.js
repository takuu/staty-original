import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import SplitStats from '../../components/core/SplitStats/SplitStats';
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

    const foo = statParser.getWinLoss(stats);



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
          <div className='sub-title'>Last {LATEST} Games</div>
          <SplitStats stats={latest} title={`Last ${LATEST} Games`} />

          <div className='sub-title'>Game Splits</div>
          <SplitStats stats={winnings} title='In Wins' />
          <SplitStats stats={losings} title='In Losses' />
        </div>
      </div>
    );
  }
}

export default ProfileStatsPage;
