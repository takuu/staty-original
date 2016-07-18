import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Standings from '../../components/core/Standings/Standings'
import LeagueSchedule from '../../components/core/LeagueSchedule/LeagueSchedule';
import _ from 'lodash';
import {Link} from 'react-router';

import { getLeagueByName } from '../../actions/leagues';
import { getGamesByDivisionId } from '../../actions/gameActions';
import { getTeamsByDivisionId } from '../../actions/teamActions';

@connect((state,router) => {
  const divisionId = router.params.divisionId;
  const leagueName = router.params.leagueName;
  const gamesJS = state.games.toJS();
  const games = _.filter(gamesJS, (game)=>{
    return game.division == divisionId;
  });

  const teamsJS = state.teams.toJS();
  const teams = _.filter(teamsJS, (team)=>{
    return team.division._id == divisionId;
  });

  return { games: games, teams: teams}
}, {
  getGamesByDivisionId,
  getTeamsByDivisionId
})
class SchedulePage extends React.Component {
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
    redux.dispatch(getGamesByDivisionId(route.params.divisionId));
    return redux.dispatch(getTeamsByDivisionId(route.params.divisionId));
  }

  render() {
    let {league, division, games, teams} = this.props;
    let scheduleUrl = "/" + league.name + "/division/" + division._id + "/schedule";
    let standingUrl = "/" + league.name + "/division/" + division._id + "/standing";
    let teamsUrl = "/" + league.name + "/division/" + division._id + "/teams";
    // debugger;
    return (

        <div style={{padding: "10px"}}>
          <LeagueSchedule league={league} games={games} />
        </div>

    );
  }
}

export default SchedulePage;
