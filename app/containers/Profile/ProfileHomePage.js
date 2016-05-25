import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import SplitStats from '../../components/core/SplitStats/SplitStats';
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
    const gamesCount = (Object.keys(gamesGroup)).length;
    debugger;
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
