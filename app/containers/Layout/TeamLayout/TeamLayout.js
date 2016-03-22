import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import SubHeader from '../../../components/SubHeader/SubHeader.js';
import { getLeagueByName } from '../../../actions/leagues';
import { getGamesByDivisionId } from '../../../actions/gameActions';
import { getTeamById } from '../../../actions/teamActions';
import Standings from '../../../components/core/Standings/Standings.js';
import { connect } from 'react-redux';

//":leagueName/division/:divisionId/game/:gameId"

@connect((state,router) => {
  const {leagueName, teamId, gameId} = router.params;
  //const leagues = state.leagues.toJS();
  //const league = _.find(leagues, {name: leagueName});

  const teamsJS = state.teams.toJS();
  const team = _.find(teamsJS, {_id: teamId});

  const gamesJS = state.games.toJS();
  const games = _.map(gamesJS, (game) => {
    return game;
  });

  return {games: games, params: router.params, team: team};
}, {
  getGamesByDivisionId
})
export default class TeamLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    games: PropTypes.array,
    team: PropTypes.object
  };
  static fillStore (redux, router) {
    const {divisionId, teamId} = router.params;
    redux.dispatch(getTeamById(teamId));
    redux.dispatch(getGamesByDivisionId(divisionId));
  }

  render () {
    const {league, games, team, params} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league, games: games});
    });
    return (
      <div>
        <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
          <div className='sub-container'>
            <div className='sub-title-container'>
              <div className='sub-title'>Standings</div>
            </div>
            <div>
              <Standings league={league} games={games} team={team} />
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