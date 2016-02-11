import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Standings from '../../components/core/Standings/Standings'
import Schedule from '../../components/core/LeagueSchedule/LeagueSchedule';
import _ from 'lodash';
import { Link } from 'react-router';
import classNames from 'classnames';

import { getLeagueByName } from '../../actions/leagues';
import { getGamesByDivisionId } from '../../actions/gameActions';
import { getTeamsByDivisionId } from '../../actions/teamActions';
import { getDivisionById } from '../../actions/divisionActions';

@connect((state,router) => {
  const divisionId = router.params.divisionId;
  const leagueName = router.params.leagueName;

  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.filter(gamesJS, (game)=> {
    return game.division == divisionId;
  });

  const teamsJS = state.teams.toJS();
  const teams = _.filter(teamsJS, (team)=>{
    return team.division._id == divisionId;
  });

  const divisions = state.divisions.toJS();
  const division = divisions && divisions[divisionId];

  const path = router.location && router.location.pathname;

  return {league: league, games: games, teams: teams, division: division, path: path}
}, {
  getLeagueByName,
  getGamesByDivisionId,
  getTeamsByDivisionId,
  getDivisionById
})
class DivisionPage extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    children: PropTypes.element,
    division: PropTypes.object,
    league: PropTypes.object,
    teams: PropTypes.array,
    games: PropTypes.array,
    path: PropTypes.string
  };
  static defaultProps = {
    division: {},
    league: {},
    teams: [],
    games: [],
    path: ''
  };

  static fillStore(redux, route) {

    let leagueName = route.params.leagueName;
    redux.dispatch(getDivisionById(route.params.divisionId));
    redux.dispatch(getGamesByDivisionId(route.params.divisionId));
    redux.dispatch(getTeamsByDivisionId(route.params.divisionId));
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    let {league, division, games, teams, path} = this.props;
    let scheduleUrl = "/" + league.name + "/division/" + division._id + "/schedule";
    let standingUrl = "/" + league.name + "/division/" + division._id + "/standing";
    let teamsUrl = "/" + league.name + "/division/" + division._id + "/teams";

    let urlParts = path.split('/');
    let routeName = urlParts[urlParts.length-1];
    let standingClass = classNames({
      'active': routeName == 'standing'
    });
    let scheduleClass = classNames({
      'active': routeName == 'schedule'
    });

    return (
      <div className="sub-container">
        <div className="sub-title-container">
          <div className="container">
            <div className="col-md-6 col-xs-12">
              <ul className="nav nav-tabs nav-justified">
                <li role="presentation" className={scheduleClass}>
                  <Link to={scheduleUrl}><div className="sub-title">Schedule</div></Link>
                </li>
                <li role="presentation" className={standingClass}>
                  <Link to={standingUrl}><div className="sub-title">Standing</div></Link>
                </li>
                <li role="presentation">
                  <Link to={teamsUrl}><div className="sub-title">Teams</div></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{padding: "10px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DivisionPage;
