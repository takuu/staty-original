import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Standings from '../components/core/Standings/Standings'
import Schedule from '../components/core/Schedule/Schedule';
import _ from 'lodash';

import { getLeagueByName } from '../actions/leagues';
import { getGamesByDivisionId } from '../actions/gameActions';
import { getTeamsByDivisionId } from '../actions/teamActions';
import { getDivisionById } from '../actions/divisionActions';

@connect((state,router) => {
  const divisionId = router.params.divisionId;
  const leagueName = router.params.leagueName;

  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.map(gamesJS, (game)=>{return game});

  const teamsJS = state.teams.toJS();
  const teams = _.map(teamsJS, (team)=>{return team});

  const divisions = state.divisions.toJS();
  const division = divisions && divisions[divisionId];

  return {league: league, games: games, teams: teams, division: division}
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
    debugger;
    return (
        <div className="DivisionPage">



          <div className="portlet-title">
            <div className="page-title">{division && division.name}</div>
          </div>
          <div className="row" style={{backgroundColor: '#eff3f8'}}>

            <div className="col-md-5 col-xs-5" style={{margin: '20px 0px'}}>
              <div styleName="sub-container">
                <div className="sub-title-container">
                  <div className="sub-title">Standing</div>
                </div>
                <div style={{padding: "10px"}}>
                  <Standings league={league} games={games} />
                </div>
              </div>
            </div>

            <div className="col-md-7 col-xs-7" style={{margin: '20px 0px'}}>
              <div className="sub-container">
                <div className="sub-title-container">
                  <div className="sub-title">Schedule</div>
                </div>
                <div style={{padding: "10px"}}>
                  <Schedule league={league} games={games} />
                </div>
              </div>
            </div>
          </div>





        </div>
    );
  }
}

export default DivisionPage;
