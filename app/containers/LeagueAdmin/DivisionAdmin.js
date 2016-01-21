import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { getDivisionsByLeagueId } from '../../actions/divisionActions';
import { connect } from 'react-redux';
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
  getDivisionsByLeagueId
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
    const {league, params, divisions} = this.props;
    debugger;
    let _rows = [];

    _rows = divisions;

    //A rowGetter function is required by the grid to retrieve a row for a given index
    var rowGetter = function(i) {
      return _rows[i];
    };

    var handleRowUpdated = function(e) {
      debugger;
      _rows[e.rowIdx] = e.updated;
    };

    var save = function(e) {
      debugger;
    };

    var columns = [
      { key: 'name', name: 'Division Name', editable: true },
      { key: 'season', name: 'Season Name', editable: true },
      { key: 'strengthLevel', name: 'Strength Level', editable: true }
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

              <button onClick={save} style={{float:'right'}}>Save</button>
              <ReactDataGrid
                enableCellSelect={true}
                columns={columns}
                rowGetter={rowGetter}
                rowsCount={_rows.length}
                minHeight={500}
                onRowUpdated={handleRowUpdated}/>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default DivisionAdmin;
