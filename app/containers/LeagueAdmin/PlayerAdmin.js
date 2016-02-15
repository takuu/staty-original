import React, { PropTypes } from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import { getLeagueByName } from '../../actions/leagues';
import { getPlayersByTeamId, updatePlayer } from '../../actions/playerActions';
import { connect } from 'react-redux';
import GridEditor from '../../components/LeagueAdmin/GridEditor/GridEditor';
import GridLink from '../../components/LeagueAdmin/GridLink/GridLink';
import SideNav from '../../components/LeagueAdmin/SideNav/SideNav';
var ReactDataGrid = require('react-data-grid/addons');

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const playersJS = state.players.toJS();
  const players = _.map(playersJS, (player)=>{return player});

  return {league: league, params: router.params, players: players}
}, {
  getLeagueByName,
  getPlayersByTeamId,
  updatePlayer
})
class PlayerAdmin extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    players: PropTypes.array
  };
  static fillStore(redux, route) {
    console.log('playerAdmin: fillStore');
    let leagueName = route.params.leagueName;
    let {teamId} = route.location.query;
    redux.dispatch(getPlayersByTeamId(teamId));
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    const {league, players, updatePlayer} = this.props;
    let playerList = _.cloneDeep(players);

    playerList = _.map(playerList, (player) => {
      player.statsUrl = '/' +  league.name + '/league/' + league._id + '/admin/stats?playerId=' + player._id;
      return player;
    });

    var priorities = [{id:0, title : 'Critical'}, {id:1, title : 'High'}, {id:2, title : 'Medium'}, {id:3, title : 'Low'}];

    var AutoCompleteEditor = ReactDataGrid.Editors.AutoComplete;
    var PrioritiesEditor = <AutoCompleteEditor options={priorities}/>;

    var columns = [
      { key: 'name', name: 'Player Name', editable: true, sortable: true },
      { key: 'strengthLevel', name: 'Strength Level', editable: true, sortable: true },
      { key: 'priority', name: 'Priority', editor: PrioritiesEditor, sortable: true },
      { key: 'statsUrl', name: 'Edit Stats', formatter: <GridLink text={'Edit Stats'} {...this.props} /> }
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
              </div>
              <GridEditor list={playerList} saveCallback={updatePlayer} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerAdmin;
