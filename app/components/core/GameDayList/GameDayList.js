import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import {Link} from 'react-router';
import statParser from '../../../utils/statParser';

const GameDayList = ({games, date, league}) => {

  return (
    <div>
      <div className='page-title '>{date}</div>
      <ul className='list-group'>
        {
          _.map(games, (game) => {
            let {time, homeTeam, awayTeam, homeScore, awayScore, isUpdated} = game;

            let gameStatus = (isUpdated) ? 'Final' : time;

            return (
              <li key={game._id} className='list-group-item nopadding list-group-item-md'>
                <Link to={_createGameLink(league, game)} className="list-group-item list-group-item-md noborder">
                  <span className='inline-list-item teams-item'>
                    <span>{homeTeam.name}</span>
                    <span>{awayTeam.name}</span>
                  </span>
                  <span className='inline-list-item scores-item'>
                    <span>{homeScore}</span>
                    <span>{awayScore}</span>
                  </span>
                  <span className='inline-list-item status-item'>
                    {gameStatus}
                  </span>
                  <span className='inline-list-item location-item'>
                    Temple City High School
                  </span>
                  </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
  function _createGameLink(league, game) {
    return (game) ? `/${league.name}/division/${game.division}/game/${game._id}`: '#';
  }

}

GameDayList.propTypes = {
  games: PropTypes.array,
  date: PropTypes.string,
  league: PropTypes.object
};

GameDayList.defaultProps = {
  games: [],
  date: '',
  league: {}
};

export default GameDayList;
