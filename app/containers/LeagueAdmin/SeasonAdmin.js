import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { getSeasonsByLeagueId } from '../../actions/seasonActions';
import { connect } from 'react-redux';
var ReactDataGrid = require('react-data-grid/addons');

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagueId = router.params.leagueId;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const seasonsJS = state.seasons.toJS();
  const seasons = _.filter(seasonsJS, {league: leagueId});

  return {league: league, params: router.params, seasons: seasons}
}, {
  getLeagueByName,
  getSeasonsByLeagueId
})
class SeasonAdmin extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    league: PropTypes.object.isRequired,
    seasons: PropTypes.array.isRequired
  };
  static fillStore(redux, route) {
    let leagueName = route.params.leagueName;
    const leagueId = route.params.leagueId;
    redux.dispatch(getSeasonsByLeagueId(leagueId));
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    const {league, params, seasons} = this.props;
    debugger;
    var _rows = [];
    for (var i = 1; i < 1000; i++) {
      _rows.push({ id: i, name: 'Title ' + i, strengthLevel: i * 1000});
    }

    //A rowGetter function is required by the grid to retrieve a row for a given index
    var rowGetter = function(i){
      return _rows[i];
    };

    var handleRowUpdated = function(e) {
      debugger;
      _rows[e.rowIdx] = e.updated;
    };

    var columns = [
      { key: 'id', name: 'ID', editable: true },
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
      </div>

    );
  }
}

export default SeasonAdmin;
