import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import { getGamesByDivisionId } from '../../actions/gameActions';
import { getPlayerById } from '../../actions/playerActions';
import { getTeamById } from '../../actions/teamActions';
import Standings from '../../components/core/Standings/Standings.js';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import { getPlayersWithFilters } from '../../actions/playerActions';
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

  return {games: games, params: router.params, player: player, team: team, players: players}
}, {
  getPlayersWithFilters,
  getPlayerById,
  getTeamById
})
export default class PlayerLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    games: PropTypes.array,
    player: PropTypes.object,
    team: PropTypes.object,
    players: PropTypes.array
  };
  static fillStore (redux, router) {
    const {playerId, teamId} = router.params;
    redux.dispatch(getPlayerById(playerId));
    redux.dispatch(getTeamById(teamId));
    return redux.dispatch(getPlayersWithFilters({team: teamId}));
  }

  render () {
    const {league, games, player, team, params, players} = this.props;
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
              <PlayerList league={league} players={players} player={player}/>
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
