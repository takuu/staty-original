import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import SubHeader from '../../../components/SubHeader/SubHeader.js';
import { getLeagueByName } from '../../../actions/leagues';
import { getGamesByTeamId } from '../../../actions/gameActions';
import LeagueSchedule from '../../../components/core/LeagueSchedule/LeagueSchedule.js';
import { connect } from 'react-redux';

//":leagueName/division/:divisionId/game/:gameId"

@connect((state,router) => {
  const {leagueName, teamId, gameId} = router.params;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.filter(gamesJS, (game) => {
    return (game.awayTeam._id === teamId || game.homeTeam._id === teamId);
  });

  return {league: league, games: games, params: router.params};
}, {
  getLeagueByName,
  getGamesByTeamId
})
export default class TeamLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    games: PropTypes.array
  };
  static fillStore (redux, router) {
    const {teamId} = router.params;
    redux.dispatch(getGamesByTeamId(teamId));
  }

  render() {
    const {league, games, params} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league});
    });

    return (
      <div>
        <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
          <div className='sub-container'>
            <div className='sub-title-container'>
              <div className='sub-title'>Schedule</div>
            </div>
            <div>
              <LeagueSchedule league={league} games={games} />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-xs-8" style={{margin: '21px 0px'}}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}