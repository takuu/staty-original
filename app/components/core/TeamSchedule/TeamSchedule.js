import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import './styles.css';

const TeamSchedule = ({games, league}) => {
  return (
    <ul className='list-group'>
      {
        _.map(games, (game) => {
          let boxScore = (game.isUpdated) && game.homeScore + '-' + game.awayScore;
          let gameTime = game.time || '-';
          let gameDate = new Date(game.date);

          let oldGame = (gameDate < new Date()) ? 'lighter' : 'dark';
          let homeWin = (boxScore && game.homeScore > game.awayScore) ? 'bold' : '';
          let awayWin = (boxScore && game.homeScore < game.awayScore) ? 'bold' : '';
          return (
            <li key={game._id} className='list-group-item nopadding list-group-item-md'>
              <span className='inline-list-item date-item'>{gameDate.toDateString()}</span>
              <span className='inline-list-item time-item'>{gameTime}</span>
              <span className='inline-list-item home-item'>
                <Link className={homeWin} to={_createTeamLink(league, game.homeTeam)}>{game.homeTeam.name}</Link>
              </span>
              <span className='inline-list-item score-item'>
                <Link to={_createGameLink(league, game)}>{boxScore}</Link>
              </span>
              <span className='inline-list-item away-item'>
                <Link className={awayWin} to={_createTeamLink(league, game.awayTeam)}>{game.awayTeam.name}</Link>
              </span>
            </li>
          );
        })
      }

    </ul>
  );
  function _createGameLink(league, game) {
    return (game) ? `/${league.name}/division/${game.division}/game/${game._id}`: '#';
  }

  function _createTeamLink(league, team) {
    return (team) ? `/${league.name}/team/${team._id}`: '#';
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