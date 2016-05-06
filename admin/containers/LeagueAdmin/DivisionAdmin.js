import React, { PropTypes } from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { getDivisionsByLeagueName, updateDivision } from '../../actions/divisionActions';
import { getAllSeasons } from '../../actions/seasonActions';
import { connect } from 'react-redux';
import GridEditor from '../../components/LeagueAdmin/GridEditor/GridEditor';
import GridLink from '../../components/LeagueAdmin/GridLink/GridLink';
import SideNav from '../../components/LeagueAdmin/SideNav/SideNav';
var ReactDataGrid = require('react-data-grid/addons');

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const divisionsJS = state.divisions.toJS();
  const divisions = _.map(divisionsJS, (division)=>{return division});

  const seasonsJS = state.seasons.toJS();
  const seasons = _.map(seasonsJS, (season)=>{return season});

  return {league: league, params: router.params, divisions: divisions, seasons: seasons}
}, {
  getLeagueByName,
  getDivisionsByLeagueName,
  updateDivision,
  getAllSeasons
})
class DivisionAdmin extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    divisions: PropTypes.array,
    seasons: PropTypes.array
  };
  static fillStore(redux, route) {

    let leagueName = route.params.leagueName;

    redux.dispatch(getDivisionsByLeagueName(leagueName));
    redux.dispatch(getAllSeasons());
    return redux.dispatch(getLeagueByName(leagueName));

  }

  render() {
    const {league, params, divisions, updateDivision, seasons} = this.props;
    let divisionList = _.cloneDeep(divisions);

    divisionList = _.map(divisionList, (division) => {
      division.teamUrl = '/' + league.name + '/admin/teams?divisionId=' + division._id;
      return division;
    });

    var priorities = [{id:0, title : 'Critical'}, {id:1, title : 'High'}, {id:2, title : 'Medium'}, {id:3, title : 'Low'}];
    var seasonList = _.map(seasons, (season) => {
      return {
        id: season._id,
        title: season.name
      }
    });

    var foo = function(){};
    var bar = {a: 1};

    var columns = [
      { key: 'name', name: 'Division Name', editable: true, sortable: true },
      { key: 'season', name: 'Season Name', resizable: true, sortable: true, width: 150, editor: SeasonsEditor },
      { key: 'strengthLevel', name: 'Strength Level', editable: true, sortable: true },
      { key: 'priority', name: 'Priority', width: 150, editor: PrioritiesEditor, sortable: true },
      { key: 'teamUrl', name: 'Edit Teams', formatter: <GridLink text={'Edit Teams'} {...this.props} /> }
    ];

    var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;
    var SeasonsEditor = <AutoCompleteEditor options={seasonList} onCommit={foo} value={bar} column={columns[1]} />
    var PrioritiesEditor = <AutoCompleteEditor options={priorities} onCommit={foo} value={bar} column={columns[3]} />;



    return (
      <div className="sub-container">
        <div className="sub-title-container">
          <div className="sub-title">GET STARTED</div>
        </div>
        <GridEditor list={divisionList} saveCallback={updateDivision} columns={columns} />
      </div>
    );
  }
}

export default DivisionAdmin;
