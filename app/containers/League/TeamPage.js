import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import TeamSchedule from '../../components/core/TeamSchedule/TeamSchedule';
import _ from 'lodash';
import classNames from 'classnames';
import { Link } from 'react-router';

import { getLeagueByName } from '../../actions/leagues';
import { getGamesByTeamId } from '../../actions/gameActions';
import { getTeamById } from '../../actions/teamActions';
import { getPlayersWithFilters } from '../../actions/playerActions';

@connect((state, router) => {
  const leagueName = router.params.leagueName;
  const teamId = router.params.teamId;

  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.map(gamesJS, (game)=>{return game});

  const teamsJS = state.teams.toJS();
  const team = _.find(teamsJS, {_id: teamId});

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, (player) => {
    return player.team._id === teamId;
  });

  const path = router.location && router.location.pathname;

  return {league: league, games: games, team: team, players: players, path: path};
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
    league: PropTypes.object,
    team: PropTypes.object,
    games: PropTypes.array,
    players: PropTypes.array,
    path: PropTypes.string
  };

  static defaultProps = {
    league: {},
    team: {},
    games: [],
    players: [],
    path: ''
  };

  static fillStore (redux, route) {
    let leagueName = route.params.leagueName;
    redux.dispatch(getGamesByTeamId(route.params.teamId));
    redux.dispatch(getTeamById(route.params.teamId));
    redux.dispatch(getPlayersWithFilters({team: route.params.teamId}));
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render () {
    let {league, players, games, team, path} = this.props;

    let rosterUrl = `/${league.name}/team/${team._id}/roster`;
    let standingUrl = `/${league.name}/team/${team._id}/team-stats`;

    let urlParts = path.split('/');
    let routeName = urlParts[urlParts.length - 1];
    let rosterClass = classNames({
      'active': routeName === 'roster'
    });
    let teamStatsClass = classNames({
      'active': routeName === 'team-stats'
    });

    return (
      <div className='sub-container'>
        <div className='sub-title-container'>
          <div className='container'>
            <div className='col-md-6 col-xs-12'>
              <ul className='nav nav-tabs nav-justified'>
                <li role='presentation' className={rosterClass}>
                  <Link to={rosterUrl}><div className='sub-title'>Roster</div></Link>
                </li>
                <li role='presentation' className={teamStatsClass}>
                  <Link to={standingUrl}><div className="sub-title">Team Stats</div></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{padding: '10px'}}>
          {this.props.children}
        </div>
      </div>
    );

    let foo = (
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
