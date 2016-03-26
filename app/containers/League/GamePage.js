import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import StatList from '../../components/core/StatList/StatList';
import _ from 'lodash';

import { getLeagueByName } from '../../actions/leagues';
import { getGameById } from '../../actions/gameActions';
import { getStatsByGameId } from '../../actions/statActions';
import './styles.css';

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const gameId = router.params.gameId;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const game = _.find(gamesJS, {_id: gameId});

  const statsJS = state.stats.toJS();
  const stats = _.filter(statsJS, (stat) => {
    return stat.game._id === gameId;
  });

  return {league: league, game: game, stats: stats}
}, {
  getLeagueByName,
  getGameById,
  getStatsByGameId
})

class GamePage extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    league: PropTypes.object.isRequired,
    stats: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired
  };
  static defaultProps = {
    league: {},
    stats: [],
    game: {}
  };

  static fillStore(redux, route) {
    let leagueName = route.params.leagueName;
    let gameId = route.params.gameId;
    redux.dispatch(getGameById(gameId));
    redux.dispatch(getStatsByGameId(gameId));
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    const {stats, league, game} = this.props;

    let date = new Date(game.date);
    let dateTime = date.toDateString() + ' ' + game.time;
    let homeTeamScore = game.homeScore;
    let awayTeamScore = game.awayScore;

    let homeTeamId = game.homeTeam && game.homeTeam._id;
    let homeTeamName = game.homeTeam && game.homeTeam.name;
    let awayTeamId = game.awayTeam && game.awayTeam._id;
    let awayTeamName = game.awayTeam && game.awayTeam.name;

    let homeTeamStats = _.filter(stats, (stat) => {
      return stat.team == homeTeamId;
    });

    let awayTeamStats = _.filter(stats, (stat) => {
      return stat.team == awayTeamId;
    });


    return (
      <div>
        <div className="portlet-title">
          <div className="page-title">Game Page</div>
        </div>
        <div className="row" style={{backgroundColor: '#eff3f8'}}>
          <div className="col-md-12 col-xs-12" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Game Stats</div>
              </div>
              <h5 className='text-center'>{dateTime}</h5>
              <div className='team-header'>{homeTeamName} - {homeTeamScore}</div>
              <StatList stats={homeTeamStats} league={league}></StatList>
              <div className='team-header'>{awayTeamName} - {awayTeamScore}</div>
              <StatList stats={awayTeamStats} league={league}></StatList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GamePage;
