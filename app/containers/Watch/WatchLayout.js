import React, { PropTypes } from 'react';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import { getPlayersWithFilters } from '../../actions/playerActions';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import { connect } from 'react-redux';

@connect((state,router) => {

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, (player) => {
    return player.team._id === teamId;
  });

  return { players: players };
}, {
  getPlayersWithFilters
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
    const {players} = this.props;
    debugger;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { players: players });
    });
    return (
      <div>
        <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
          <div className='sub-container'>
            <div className='sub-title-container'>
              <div className='sub-title'>WatchList</div>
            </div>
            <div>
              <PlayerList players={players}/>
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
