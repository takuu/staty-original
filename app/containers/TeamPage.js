import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerList from '../components/core/PlayerList/PlayerList';
import TeamSchedule from '../components/core/TeamSchedule/TeamSchedule';
import _ from 'lodash';

import { getLeagueByName } from '../actions/leagues';
import { getGamesByTeamId } from '../actions/gameActions';
import { getTeamById } from '../actions/teamActions';
import { getPlayersWithFilters } from '../actions/playerActions';


@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const teamId = router.params.teamId;

  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.map(gamesJS, (game)=>{return game});

  const teamsJS = state.teams.toJS();
  const team = _.find(teamsJS, {_id: teamId});

  const playersJS = state.players.toJS();
  const players = _.map(playersJS, (player)=>{return player});

  return {league: league, games: games, team: team, players: players}
}, {
  getLeagueByName,
  getGamesByTeamId,
  getTeamById,
  getPlayersWithFilters
})
class TeamPage extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    league: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    games: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired
  };

  static fillStore(redux, route) {

    let leagueName = route.params.leagueName;
    redux.dispatch(getGamesByTeamId(route.params.teamId));
    redux.dispatch(getTeamById(route.params.teamId));
    redux.dispatch(getPlayersWithFilters({team: route.params.teamId}));
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    let {league, players, games, team} = this.props;
    return (
      <div>
        <div className="portlet-title">
          <div className="page-title">{team && team.name}</div>
        </div>
        <div className="row" style={{backgroundColor: '#eff3f8'}}>

          <div className="col-md-5 col-xs-5" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Roster</div>
              </div>
              <PlayerList players={players} team={team} league={league} />
            </div>
          </div>

          <div className="col-md-7 col-xs-7" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Schedule</div>
              </div>
              <TeamSchedule league={league} games={games} />
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default TeamPage;
