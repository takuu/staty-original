import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import TeamList from '../../../components/core/TeamList/TeamList';
import _ from 'lodash';
import {Link} from 'react-router';

import { getLeagueByName } from '../../../actions/leagues';
import { getGamesByDivisionId } from '../../../actions/gameActions';
import { getTeamsByDivisionId } from '../../../actions/teamActions';
import { getDivisionById } from '../../../actions/divisionActions';

@connect((state,router) => {
  const divisionId = router.params.divisionId;
  const leagueName = router.params.leagueName;

  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.filter(gamesJS, (game)=>{
    return game.division == divisionId;
  });

  const teamsJS = state.teams.toJS();
  const teams = _.filter(teamsJS, (team)=>{
    return team.division._id == divisionId;
  });

  const divisions = state.divisions.toJS();
  const division = divisions && divisions[divisionId];

  return {league: league, games: games, teams: teams, division: division}
}, {
  getLeagueByName,
  getGamesByDivisionId,
  getTeamsByDivisionId,
  getDivisionById
})
class TeamsPage extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    division: PropTypes.object.isRequired,
    league: PropTypes.object.isRequired,
    teams: PropTypes.array.isRequired,
    games: PropTypes.array.isRequired
  };
  static defaultProps = {
    division: {},
    league: {},
    teams: [],
    games: []
  };

  static fillStore(redux, route) {

    let leagueName = route.params.leagueName;
    redux.dispatch(getDivisionById(route.params.divisionId));
    redux.dispatch(getGamesByDivisionId(route.params.divisionId));
    redux.dispatch(getTeamsByDivisionId(route.params.divisionId));
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    let {league, division, games, teams} = this.props;
    return (
      <div>
        <TeamList league={league} teams={teams} />
      </div>

    );
  }
}

export default TeamsPage;
