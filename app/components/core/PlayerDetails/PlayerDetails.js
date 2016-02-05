import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import {Link} from 'react-router';
import statParser from '../../../utils/statParser';

class PlayerDetails extends React.Component {
  static propTypes = {
    stats: PropTypes.array.isRequired,
    player: PropTypes.object.isRequired,
    league: PropTypes.object.isRequired

  };
  static defaultProps = {
    stats: [],
    player: {},
    league: {}
  };

  render() {
    const {stats, player, league} = this.props;
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
          <Link to={maxPointsGame && "/" + league.name + "/league/" + league._id + "/division/" + maxPointsGame.division + "/game/" + maxPointsGame.game._id}>{maxPointsGame && maxPointsGame.points}</Link>
        </p>
        <p>
          High Rebound:
          <Link to={maxReboundsGame && "/" + league.name + "/league/" + league._id + "/division/" + maxReboundsGame.division + "/game/" + maxReboundsGame.game._id}>{maxReboundsGame && maxReboundsGame.totalRebounds}</Link>
        </p>
        <p>
          High Assists:
          <Link to={maxAssistsGame && "/" + league.name + "/league/" + league._id + "/division/" + maxAssistsGame.division + "/game/" + maxAssistsGame.game._id}>{maxAssistsGame && maxAssistsGame.assists}</Link>
        </p>
        <p>
          High Steals:
          <Link to={maxStealsGame && "/" + league.name + "/league/" + league._id + "/division/" + maxStealsGame.division + "/game/" + maxStealsGame.game._id}>{maxStealsGame && maxStealsGame.steals}</Link>
        </p>
        <p>
          High Blocks:
          <Link to={maxBlocksGame && "/" + league.name + "/league/" + league._id + "/division/" + maxBlocksGame.division + "/game/" + maxBlocksGame.game._id}>{maxBlocksGame && maxBlocksGame.blocks}</Link>
        </p>

      </div>
    );
  }

}

export default PlayerDetails;
