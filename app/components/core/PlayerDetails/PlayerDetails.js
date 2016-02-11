import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import {Link} from 'react-router';
import statParser from '../../../utils/statParser';

const PlayerDetails = ({stats, player, league}) => {

  let maxPointsGame, maxAssistsGame, maxReboundsGame, maxStealsGame, maxBlocksGame;

  if(stats.length) {
    maxPointsGame = _.max(stats, 'points');
    maxAssistsGame = _.max(stats, 'assists');
    maxReboundsGame = _.max(stats, 'totalRebounds');
    maxStealsGame = _.max(stats, 'steals');
    maxBlocksGame = _.max(stats, 'blocks');
  }

  return (
    <div>
      <p>reference https://sports.yahoo.com/nba/players/5142/splits/?season=2014</p>
      <p>Age</p>
      <p>Height</p>
      <p>Position</p>
      <p>
        High Score:
        <Link to={_createGameLink(league, maxPointsGame)}>{maxPointsGame && maxPointsGame.points}</Link>
      </p>
      <p>
        High Rebound:
        <Link to={_createGameLink(league, maxReboundsGame)}>{maxReboundsGame && maxReboundsGame.totalRebounds}</Link>
      </p>
      <p>
        High Assists:
        <Link to={_createGameLink(league, maxAssistsGame)}>{maxAssistsGame && maxAssistsGame.assists}</Link>
      </p>
      <p>
        High Steals:
        <Link to={_createGameLink(league, maxStealsGame)}>{maxStealsGame && maxStealsGame.steals}</Link>
      </p>
      <p>
        High Blocks:
        <Link to={_createGameLink(league, maxBlocksGame)}>{maxBlocksGame && maxBlocksGame.blocks}</Link>
      </p>

    </div>
  );

  function _createGameLink(league, game) {
    return (game) ? `/${league.name}/division/${game.division}/game/${game.game._id}`: '#';
  }

}

PlayerDetails.propTypes = {
  stats: PropTypes.array,
  player: PropTypes.object,
  league: PropTypes.object

};
PlayerDetails.defaultProps = {
  stats: [],
  player: {},
  league: {}
};

export default PlayerDetails;
