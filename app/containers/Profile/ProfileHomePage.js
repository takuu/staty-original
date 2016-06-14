import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import SplitStats from '../../components/core/SplitStats/SplitStats';
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


    const gameTimes = _.groupBy(stats, 'game.time');
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
