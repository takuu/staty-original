import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
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
      maxPointsGame = _.max(stats, 'stat.points');
      maxAssistsGame = _.max(stats, 'stat.assists');
      maxReboundsGame = _.max(stats, 'stat.totalRebounds');
      maxStealsGame = _.max(stats, 'stat.steals');
      maxBlocksGame = _.max(stats, 'stat.blocks');
    }

    return (
      <div>
        <p>reference https://sports.yahoo.com/nba/players/5142/splits/?season=2014</p>
        <p>Age</p>
        <p>Height</p>
        <p>Position</p>
        <p>
          High Score:
          <a href={maxPointsGame && "/" + league.name + "/division/" + maxPointsGame.division + "/game/" + maxPointsGame.game._id}>{maxPointsGame && maxPointsGame.stat.points}</a>
        </p>
        <p>
          High Rebound:
          <a href={maxReboundsGame && "/" + league.name + "/division/" + maxReboundsGame.division + "/game/" + maxReboundsGame.game._id}>{maxReboundsGame && maxReboundsGame.stat.totalRebounds}</a>
        </p>
        <p>
          High Assists:
          <a href={maxAssistsGame && "/" + league.name + "/division/" + maxAssistsGame.division + "/game/" + maxAssistsGame.game._id}>{maxAssistsGame && maxAssistsGame.stat.assists}</a>
        </p>
        <p>
          High Steals:
          <a href={maxStealsGame && "/" + league.name + "/division/" + maxStealsGame.division + "/game/" + maxStealsGame.game._id}>{maxStealsGame && maxStealsGame.stat.steals}</a>
        </p>
        <p>
          High Blocks:
          <a href={maxBlocksGame && "/" + league.name + "/division/" + maxBlocksGame.division + "/game/" + maxBlocksGame.game._id}>{maxBlocksGame && maxBlocksGame.stat.blocks}</a>
        </p>

      </div>
    );
  }

}

export default PlayerDetails;
