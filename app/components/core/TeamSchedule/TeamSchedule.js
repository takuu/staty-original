import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';

const TeamSchedule = ({games, league}) => {

  return (
    <table className="table">
      <tbody>
      {
        _.map(games, (game) => {

          let boxScore = (game.isUpdated) && game.homeScore + '-' + game.awayScore;
          let gameTime = game.time || '-';
          let gameDate = new Date(game.date);

          let oldGame = (gameDate < new Date())? 'lighter': 'dark';
          let homeWin = (boxScore && game.homeScore > game.awayScore) ? 'bold': '';
          let awayWin = (boxScore && game.homeScore < game.awayScore) ? 'bold': '';
          return (
            <tr key={game._id}>
              <td className={oldGame}>{gameDate.toDateString()}</td>
              <td className={oldGame}>{gameTime}</td>
              <td><Link className={homeWin} to={_createTeamLink(league, game.homeTeam)}>{game.homeTeam.name}</Link></td>
              <td><Link to={_createGameLink(league, game)}>{boxScore}</Link></td>
              <td><Link className={awayWin} to={_createTeamLink(league, game.awayTeam)}>{game.awayTeam.name}</Link></td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
  );
  function _createGameLink(league, game) {
    return (game) ? `/${league.name}/league/${league._id}/division/${game.division}/game/${game._id}`: '#';
  }

  function _createTeamLink(league, team) {
    return (team) ? `/${league.name}/league/${league._id}/team/${team._id}`: '#';
  }
};

TeamSchedule.propTypes = {
  games: PropTypes.array,
  league: PropTypes.object
};

TeamSchedule.defaultProps = {
  games: [],
  league: {}
};

export default TeamSchedule;