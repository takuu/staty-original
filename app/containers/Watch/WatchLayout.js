import React, { PropTypes } from 'react';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import { getPlayerById, getPlayersWithFilters } from '../../actions/playerActions';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import { connect } from 'react-redux';


@connect((state,router) => {
  return {games: games, params: router.params, player: player, team: team, players: players}
}, {
  getPlayersWithFilters,
  getPlayerById
})
export default class PlayerLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    players: PropTypes.array
  };
  static fillStore (redux, router) {
    const {playerId, teamId} = router.params;
    // redux.dispatch(getPlayerById(playerId));
    // redux.dispatch(getTeamById(teamId));
    // return redux.dispatch(getPlayersWithFilters({team: teamId}));
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
              <PlayerList players={players} player={player}/>
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
