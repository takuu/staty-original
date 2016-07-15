import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import SplitStatsv2 from '../../components/core/SplitStats/SplitStatsv2';
import helpers from '../../utils/helpers';

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
      let d = new Date().toISOString().slice(0, 10);
      let gameTime = new Date(`${d} ${game.time}`);
      return gameTime;
    });

    const gameTimes = _.groupBy(orderedStats, 'game.time');
    return (
      <div>
        <div className='sub-title-container'>
          <SplitStatsv2 statList={{'Home': homeGames, 'Away': awayGames}} />
          <div className='sub-title'>Game Times</div>
          <SplitStatsv2 statList={gameTimes} />
        </div>
      </div>
    );
  }
}

export default ProfileGamesPage;
