import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { connect } from 'react-redux';
var ReactDataGrid = require('react-data-grid/addons');
import SideNav from '../../components/LeagueAdmin/SideNav/SideNav';

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  return {league: league, params: router.params}
}, {
  getLeagueByName
})
class LeagueAdmin extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    league: PropTypes.object.isRequired
  };
  static fillStore(redux, route) {
    let leagueName = route.params.leagueName;
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    const {league, params} = this.props;
    var _rows = [];
    for (var i = 1; i < 1000; i++) {
      _rows.push({ id: i, title: 'Title ' + i, count: i * 1000});
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
      { key: 'title', name: 'Title', editable: true },
      { key: 'count', name: 'Count', editable: true }
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
            <SideNav league={league} />
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

export default LeagueAdmin;
