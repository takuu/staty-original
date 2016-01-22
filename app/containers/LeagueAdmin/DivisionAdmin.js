import React, { PropTypes } from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { getDivisionsByLeagueId, updateDivision } from '../../actions/divisionActions';
import { connect } from 'react-redux';
import GridEditor from '../../components/LeagueAdmin/GridEditor/GridEditor';
var ReactDataGrid = require('react-data-grid/addons');

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const divisionsJS = state.divisions.toJS();
  const divisions = _.map(divisionsJS, (division)=>{return division});

  return {league: league, params: router.params, divisions: divisions}
}, {
  getLeagueByName,
  getDivisionsByLeagueId,
  updateDivision
})
class DivisionAdmin extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    league: PropTypes.object.isRequired,
    divisions: PropTypes.array.isRequired
  };
  static fillStore(redux, route) {

    let leagueName = route.params.leagueName;
    let leagueId = route.params.leagueId;
    redux.dispatch(getDivisionsByLeagueId(leagueId));
    return redux.dispatch(getLeagueByName(leagueName));

  }

  render() {
    const {league, params, divisions, updateDivision} = this.props;
    let _rows = _.cloneDeep(divisions);

    var priorities = [{id:0, title : 'Critical'}, {id:1, title : 'High'}, {id:2, title : 'Medium'}, {id:3, title : 'Low'}]
    var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;
    var PrioritiesEditor = <AutoCompleteEditor options={priorities}/>;

    var columns = [
      { key: 'name', name: 'Division Name', editable: true, sortable: true },
      { key: 'season', name: 'Season Name', editable: true, sortable: true },
      { key: 'strengthLevel', name: 'Strength Level', editable: true, sortable: true },
      { key: 'priority', name: 'Priority', editor: PrioritiesEditor, sortable: true }
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
              <GridEditor list={divisions} saveCallback={updateDivision} columns={columns} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default DivisionAdmin;
