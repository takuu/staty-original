import React, { PropTypes } from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { getTeamsByDivisionId, updateTeam } from '../../actions/teamActions';
import { getAllSeasons } from '../../actions/seasonActions';
import { connect } from 'react-redux';
import GridEditor from '../../components/LeagueAdmin/GridEditor/GridEditor';
import GridLink from '../../components/LeagueAdmin/GridLink/GridLink';
import SideNav from '../../components/LeagueAdmin/SideNav/SideNav';
import ReactDataGrid from 'react-data-grid';

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const teamsJS = state.teams.toJS();
  const teams = _.map(teamsJS, (team)=>{return team});

  return {league: league, params: router.params, teams: teams}
}, {
  getLeagueByName,
  getTeamsByDivisionId,
  updateTeam
})
class TeamAdmin extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    teams: PropTypes.array
  };
  static fillStore(redux, route) {

    let leagueName = route.params.leagueName;
    let {divisionId} = route.location.query;
    redux.dispatch(getTeamsByDivisionId(divisionId));
    return redux.dispatch(getLeagueByName(leagueName));

  }

  render() {
    const {league, teams, updateTeam} = this.props;
    let teamList = _.map(_.cloneDeep(teams), (team) => {
      team.playerUrl = '/' + league.name + '/admin/players?teamId=' + team._id;
      return team;
    });

    var priorities = [{id: 0, title: 'Critical'}, {id: 1, title: 'High'}, {id: 2, title: 'Medium'}, {id: 3, title: 'Low'}];

    var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;
    var PrioritiesEditor = <AutoCompleteEditor options={priorities}/>;

    var columns = [
      { key: 'name', name: 'Team Name', editable: true, sortable: true },
      { key: 'strengthLevel', name: 'Strength Level', editable: true, sortable: true },
      { key: 'priority', name: 'Priority', editor: PrioritiesEditor, sortable: true },
      { key: 'playerUrl', name: 'Edit Players', formatter: <GridLink text={'Edit Players'} {...this.props} /> }
    ];

    return (
      <div className="sub-container">
        <div className="sub-title-container">
          <div className="sub-title">GET STARTED</div>
        </div>
        <GridEditor list={teamList} saveCallback={updateTeam} columns={columns} />
      </div>
    );
  }
}

export default TeamAdmin;
