import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import GameLog from '../../components/core/GameLog/GameLog';
import SplitStats from '../../components/core/SplitStats/SplitStats';
import PlayerDetails from '../../components/core/PlayerDetails/PlayerDetails';
import _ from 'lodash';
import createLinks from '../../utils/createLinks';
import classNames from 'classnames';
import { Link } from 'react-router';

import { getLeagueByName } from '../../actions/leagues';
import { getGamesByTeamId } from '../../actions/gameActions';
import { getStatsByPlayerId } from '../../actions/statActions';

@connect((state, router) => {
  const leagueName = router.params.leagueName;
  const playerId = router.params.playerId;
  const path = router.location && router.location.pathname;


  const statsJS = state.stats.toJS();
  const stats = _.filter(statsJS,(stat)=>{
    return stat.player === playerId;
  });
  return {stats: stats, path: path}
}, {
  getStatsByPlayerId
})
class PlayerPage extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    stats: PropTypes.array,
    player: PropTypes.object,
    path: PropTypes.string
  };

  static defaultProps = {
    stats: [],
    player: {},
    path: ''
  };

  static fillStore(redux, route) {

    let leagueName = route.params.leagueName;
    return redux.dispatch(getStatsByPlayerId(route.params.playerId));
  }

  render () {
    const {league, player, games, team, stats, path} = this.props;
    const homeGames = _.filter(stats, (game) => {
      return game.team === game.game.homeTeam;
    });
    const awayGames = _.filter(stats, (game) => {
      return game.team === game.game.awayTeam;
    });


    let urlParts = path.split('/');
    let routeName = urlParts[urlParts.length - 1];

    let profileUrl = createLinks.createPlayerUrl(league, player);
    let playerGamesUrl = createLinks.createPlayerUrl(league, player) + '/game-log';
    let playerSplitsUrl = createLinks.createPlayerUrl(league, player) + '/split-stats';

    let profileClass = classNames({
      'active': routeName === player._id || routeName === ''
    });
    let gameLogClass = classNames({
      'active': routeName === 'game-log'
    });
    let splitStatsClass = classNames({
      'active': routeName === 'split-stats'
    });
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league});
    });

    const gameTimes = _.groupBy(stats, 'game.time');
    return (
      <div>
        <div className='portlet-title'>
          <div className='page-title'>
            <span>{player && player.name}</span>
            <Link to={createLinks.createTeamLink(league, team)}>
              <span style={{'marginLeft': '40px', 'fontSize': '.9em'}}>{team && team.name}</span>
            </Link>
          </div>
        </div>
        <div className='row' style={{backgroundColor: '#eff3f8'}}>
          <div className='col-md-12 col-xs-12' style={{margin: '20px 0px'}}>
            <div className='sub-container'>
              <div className='sub-title-container'>
                <div className='container'>
                  <div className='col-md-6 col-xs-12'>
                    <ul className='nav nav-tabs nav-justified'>
                      <li role='presentation' className={profileClass}>
                        <Link to={profileUrl}><div className='sub-title'>Profile</div></Link>
                      </li>
                      <li role='presentation' className={gameLogClass}>
                        <Link to={playerGamesUrl}><div className='sub-title'>Game Log</div></Link>
                      </li>
                      <li role='presentation' className={splitStatsClass}>
                        <Link to={playerSplitsUrl}><div className='sub-title'>Split Stats</div></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{padding: '10px'}}>
                {childrenWithProps}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    var foo =  (
      <div>
        <div className='portlet-title'>
          <div className='page-title'>{player && player.name}</div>
        </div>
        <div className='row' style={{backgroundColor: '#eff3f8'}}>
          <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
            <div className='sub-container'>
              <div className='sub-title-container'>
                <div className='sub-title'>Player Info</div>
                <PlayerDetails player={player} league={league} stats={stats} />
              </div>
            </div>
          </div>
          <div className="col-md-8 col-xs-8" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Game Log</div>
              </div>
              <GameLog stats={stats} title={'hi'} />
            </div>
          </div>
          <div className="col-md-8 col-xs-8">
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Split Stats</div>
                <p>reference https://sports.yahoo.com/nba/players/5142/splits/</p>
                <p>Game Times</p>
                <p>Home Away</p>
                <SplitStats stats={homeGames} title="Home"></SplitStats>
                <SplitStats stats={awayGames} title="Away"></SplitStats>
                {
                  _.map(gameTimes,(time, key) => {
                    return (
                      <SplitStats key={key} stats={time} title={key}></SplitStats>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerPage;
