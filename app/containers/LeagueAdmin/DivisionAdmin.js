import React, { PropTypes } from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { getDivisionsByLeagueId, updateDivision } from '../../actions/divisionActions';
import { getAllSeasons } from '../../actions/seasonActions';
import { connect } from 'react-redux';
import GridEditor from '../../components/LeagueAdmin/GridEditor/GridEditor';
import GridLink from '../../components/LeagueAdmin/GridLink/GridLink';
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
  getDivisionsByLeagueId,
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
    let leagueId = route.params.leagueId;
    redux.dispatch(getDivisionsByLeagueId(leagueId));
    redux.dispatch(getAllSeasons());
    return redux.dispatch(getLeagueByName(leagueName));

  }

  render() {
    const {league, params, divisions, updateDivision, seasons} = this.props;
    let divisionList = _.cloneDeep(divisions);

    divisionList = _.map(divisionList, (division) => {
      division.teamUrl = '/' + league.name + '/league/' + league._id + '/admin/teams?divisionId=' + division._id;
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

    var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;
    var SeasonsEditor = <AutoCompleteEditor options={seasonList} onCommit={foo} value={bar} />
    var PrioritiesEditor = <AutoCompleteEditor options={priorities} onCommit={foo} value={bar} />;

    var columns = [
      { key: 'name', name: 'Division Name', editable: true, sortable: true },
      { key: 'season', name: 'Season Name', resizable: true, sortable: true, editor: SeasonsEditor },
      { key: 'strengthLevel', name: 'Strength Level', editable: true, sortable: true },
      { key: 'priority', name: 'Priority', editor: PrioritiesEditor, sortable: true },
      { key: 'teamUrl', name: 'Edit Teams', formatter: <GridLink text={'Edit Teams'} {...this.props} /> }
    ];

    return (
      <div className="sub-container">
        <div className="sub-title-container">
          <div className="sub-title">Dashboard</div>
        </div>
        <div className="row" style={{backgroundColor: '#eff3f8'}}>
          <div className="col-md-3 col-xs-3" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Main</div>
              </div>

              <div style={{padding: "10px"}}>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to={"/" + league.name + "/admin/league/config"}>
                      Configuration
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to={"/" + league.name + "/admin/league"}>
                      Update League
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to={"/" + league.name + "/admin/league/info"}>
                      Update Information
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to={"/" + league.name + "/admin/league/info"}>
                      Update Rules
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-xs-9" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">GET STARTED</div>
              </div>
              <GridEditor list={divisionList} saveCallback={updateDivision} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DivisionAdmin;
