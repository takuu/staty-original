import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import SplitStats from '../../components/core/SplitStats/SplitStats';
import GameLog from '../../components/core/GameLog/GameLog';
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

    /*const orderedStats = _.sortBy(stats, (stat) => {
      const { game } = stat;
      let gameDate = new Date(game.date);
      return gameDate;
    });*/
    const orderedStats = _.sortBy(stats, ['game.date', 'game.time']);

    return (
      <div>
        <div className='sub-title-container'>
          <GameLog stats={orderedStats} />
        </div>
      </div>
    );
  }
}

export default ProfileGamesPage;
