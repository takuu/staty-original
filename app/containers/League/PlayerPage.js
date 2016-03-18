import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import GameLog from '../../components/core/GameLog/GameLog'
import SplitStats from '../../components/core/SplitStats/SplitStats'
import PlayerDetails from '../../components/core/PlayerDetails/PlayerDetails';
import _ from 'lodash';

import { getLeagueByName } from '../../actions/leagues';
import { getGamesByTeamId } from '../../actions/gameActions';
import { getStatsByPlayerId } from '../../actions/statActions';
import { getPlayerById } from '../../actions/playerActions';


@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const playerId = router.params.playerId;

  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.map(gamesJS, (game)=>{return game});

  const statsJS = state.stats.toJS();
  const stats = _.filter(statsJS,(stat)=>{
    return stat.player === playerId;
  });

  const playersJS = state.players.toJS();
  const player = _.find(playersJS, {_id: playerId});

  return {league: league, games: games, stats: stats, player: player}
}, {
  getLeagueByName,
  getGamesByTeamId,
  getStatsByPlayerId,
  getPlayerById
})
class PlayerPage extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    league: PropTypes.object,
    stats: PropTypes.array,
    games: PropTypes.array,
    player: PropTypes.object
  };

  static fillStore(redux, route) {

    let leagueName = route.params.leagueName;
    redux.dispatch(getGamesByTeamId(route.params.teamId));
    redux.dispatch(getStatsByPlayerId(route.params.playerId));
    redux.dispatch(getPlayerById(route.params.playerId));
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    const {league, player, games, stats} = this.props;
    const homeGames = _.filter(stats, (game) => {
      return game.team == game.game.homeTeam;
    });
    const awayGames = _.filter(stats, (game) => {
      return game.team == game.game.awayTeam;
    });

    const gameTimes = _.groupBy(stats, 'game.time');

    return (
      <div>
        <div className="portlet-title">
          <div className="page-title">{player && player.name}</div>
        </div>
        <div className="row" style={{backgroundColor: '#eff3f8'}}>
          <div className="col-md-4 col-xs-4" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Player Info</div>
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
