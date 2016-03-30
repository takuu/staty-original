import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import { getGamesByDivisionId } from '../../actions/gameActions';
import { getTeamById } from '../../actions/teamActions';
import Standings from '../../components/core/Standings/Standings.js';
import { connect } from 'react-redux';

import helpers from '../../utils/helpers';

//":leagueName/division/:divisionId/game/:gameId"

@connect((state,router) => {
  const {teamId, divisionId} = router.params;
  const path = router.location && router.location.pathname;

  const teamsJS = state.teams.toJS();
  const team = _.find(teamsJS, {_id: teamId});

  const gamesJS = state.games.toJS();
  const games = _.filter(gamesJS, (game) => {
    return divisionId === helpers.getObjId(game.division);
  });

  return {games: games, params: router.params, team: team, path: path};
}, {
  getGamesByDivisionId,
  getTeamById
})
export default class TeamLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    games: PropTypes.array,
    team: PropTypes.object,
    path: PropTypes.string
  };
  static defaultProps = {
    league: {},
    team: {},
    games: [],
    path: ''
  };
  static fillStore (redux, router) {
    const {divisionId, teamId} = router.params;
    redux.dispatch(getGamesByDivisionId(divisionId));
    return redux.dispatch(getTeamById(teamId));
  }

  render () {
    const {league, games, team, params, path} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league, games: games, team: team, path: path});
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
