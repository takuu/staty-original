import React, { PropTypes } from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { getStatsByPlayerId, updateStat } from '../../actions/statActions';
import { connect } from 'react-redux';
import GridEditor from '../../components/LeagueAdmin/GridEditor/GridEditor';
import GridLink from '../../components/LeagueAdmin/GridLink/GridLink';
import SideNav from '../../components/LeagueAdmin/SideNav/SideNav';
var ReactDataGrid = require('react-data-grid/addons');

@connect((state, router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const statsJS = state.stats.toJS();
  const stats = _.map(statsJS, (stat)=>{return stat});

  return {league: league, params: router.params, stats: stats}
}, {
  getLeagueByName,
  getStatsByPlayerId,
  updateStat
})
class StatAdmin extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    stats: PropTypes.array
  };
  static fillStore(redux, route) {
    let leagueName = route.params.leagueName;
    let {playerId} = route.location.query;

    redux.dispatch(getStatsByPlayerId(playerId));
    return redux.dispatch(getLeagueByName(leagueName));
  };
  render() {
    const {league, stats, updateStat} = this.props;
    let statList = _.cloneDeep(stats);

    statList = _.map(statList, (stat) => {
      stat.gamesUrl ='/' +  league.name + '/league/' + league._id + '/admin/games?statId=' + stat._id;
      stat.myTeamUrl ='/' +  league.name + '/league/' + league._id + '/admin/players?teamId=' + stat.team;
      stat.againstTeamUrl ='/' +  league.name + '/league/' + league._id + '/admin/players?teamId=' + stat.vsTeam._id;
      return stat;
    });

    var priorities = [{id:0, title : 'Critical'}, {id:1, title : 'High'}, {id:2, title : 'Medium'}, {id:3, title : 'Low'}];

    var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;
    var PrioritiesEditor = <AutoCompleteEditor options={priorities}/>;

    var columns = [
      { key: 'created', name: 'Created', editable: true, sortable: true },
      { key: 'assists', name: 'AST', editable: true, sortable: true },
      { key: 'blocks', name: 'BS', editable: true, sortable: true },
      { key: 'defensiveRebounds', name: 'D Reb', editable: true, sortable: true },
      { key: 'offensiveRebounds', name: 'O Reb', editable: true, sortable: true },
      { key: 'points', name: 'PTS', editable: true, sortable: true },
      { key: 'fieldGoalsMade', name: 'FGM', editable: true, sortable: true },
      { key: 'fieldGoalsAttempted', name: 'FMA', editable: true, sortable: true },
      { key: 'threePointsMade', name: '3PM', editable: true, sortable: true },
      { key: 'threePointsAttempted', name: '3PA', editable: true, sortable: true },
      { key: 'steals', name: 'ST', editable: true, sortable: true },
      { key: 'freeThrowsAttempted', name: 'FTA', editable: true, sortable: true },
      { key: 'freeThrowsMade', name: 'FTM', editable: true, sortable: true },
      { key: 'fouls', name: 'PF', editable: true, sortable: true },
      { key: 'turnovers', name: 'TO', editable: true, sortable: true },
      { key: 'strengthLevel', name: 'Strength Level', editable: true, sortable: true },
      { key: 'priority', name: 'Priority', editor: PrioritiesEditor, sortable: true }
    ];

    return (
      <div className="sub-container">
        <div className="sub-title-container">
          <div className="sub-title">GET STARTED</div>
        </div>
        <GridEditor list={statList} saveCallback={updateStat} columns={columns} />
      </div>
    )
  }
}

export default StatAdmin;