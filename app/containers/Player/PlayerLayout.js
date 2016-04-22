import React, { PropTypes } from 'react';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import { getGamesByDivisionId } from '../../actions/gameActions';
import { getPlayerById } from '../../actions/playerActions';
import { getTeamById } from '../../actions/teamActions';
import Standings from '../../components/core/Standings/Standings.js';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import { getPlayersWithFilters } from '../../actions/playerActions';
import { fetchWatchList } from '../../actions/guestActions'
import { connect } from 'react-redux';

//":leagueName/division/:divisionId/game/:gameId"

@connect((state,router) => {
  const {playerId, teamId} = router.params;

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, (player) => {
    return player.team._id === teamId;
  });

  const playerJS = state.players.toJS();
  const player = _.find(playerJS, {_id: playerId});

  const teamsJS = state.teams.toJS();
  const team = _.find(teamsJS, {_id: teamId});

  const gamesJS = state.games.toJS();
  const games = _.map(gamesJS, (game) => {
    return game;
  });

  const watchListJS = state.guests.toJS();
  const watchList = _.map(watchListJS, (watch) => {
    return watch;
  });
  return {games: games, params: router.params, player: player, team: team, players: players, watchList: watchList};
}, {
  getPlayersWithFilters,
  getPlayerById,
  getTeamById,
  fetchWatchList
})
export default class PlayerLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    games: PropTypes.array,
    player: PropTypes.object,
    team: PropTypes.object,
    players: PropTypes.array,
    watchList: PropTypes.array
  };
  static fillStore (redux, router) {
    const {playerId, teamId} = router.params;
    return Promise.all([redux.dispatch(getPlayersWithFilters({team: teamId})),
      redux.dispatch(getPlayerById(playerId)),
      redux.dispatch(getTeamById(teamId)),
      redux.dispatch(fetchWatchList())
    ]);

  }

  render () {
    const {league, games, player, team, params, players, dispatch, watchList} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league, games: games, player: player, team: team});
    });
    return (
      <div>
        <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
          <div className='sub-container'>
            <div className='sub-title-container'>
              <div className='sub-title'>{team && team.name }</div>
            </div>
            <div>
              <PlayerList players={players} player={player} dispatch={dispatch} watchList={watchList} />
            </div>
          </div>
        </div>
        <div className='col-md-8 col-xs-8' style={{margin: '21px 0px'}}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}
