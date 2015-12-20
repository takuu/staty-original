import React, { PropTypes } from 'react';
import styles from './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import Loader from '../../Loader/Loader';

class StatList extends React.Component {
  static propTypes = {
    stats: PropTypes.array
  };
  static defaultProps = {
    stats: []
  };
  render() {
    const {stats} = this.props;
    let combined = {};
    let statsLength = stats.length;

    if(statsLength) {
      combined = statParser.pluckThenCombineStats(stats, 'stat');
    }

    return  (
    <table className="table" style={{fontSize: '.7em'}}>
      <thead>
        <tr>
          <td>Num</td>
          <td>Player</td>
          <td>FGM</td>
          <td>FGA</td>
          <td>FG%</td>
          <td>3PM</td>
          <td>3PA</td>
          <td>3PT%</td>
          <td>FTM</td>
          <td>FTA</td>
          <td>FT%</td>
          <td>REB</td>
          <td>AST</td>
          <td>ST</td>
          <td>BS</td>
          <td>PF</td>
          <td>PTS</td>
        </tr>
      </thead>


      <tbody>
      {
        _.map(stats, (game) => {
          let gameDate = new Date(game.game.date);
          let gameTime = (game.game && game.game.time) ? game.game.time : '-';
          let score = (game.game.homeScore) + '-' + game.game.awayScore;
          let homeTeamWin = (game.game.homeScore > game.game.awayScore);
          let outcome;
          if (homeTeamWin) {
            outcome = (game.team == game.game.homeTeam) ? 'W' : 'L';
          } else {
            outcome = (game.team == game.game.awayTeam) ? 'W' : 'L';
          }
          combined = statParser.pluckThenCombineStats(stats, 'stat');

          return (
            <tr>

              <td>{game.player.number}</td>
              <td>{game.player.name}</td>

              <td>{game.stat.fieldGoalsMade}</td>
              <td>{game.stat.fieldGoalsAttempted}</td>

              <td>{statParser.shootingPercentage(game.stat.fieldGoalsMade, game.stat.fieldGoalsMade)}</td>

              <td>{game.stat.threePointsMade}</td>
              <td>{game.stat.threePointsAttempted}</td>
              <td>{statParser.shootingPercentage(game.stat.threePointsMade, game.stat.threePointsAttempted)}</td>
              <td>{game.stat.freeThrowsMade}</td>
              <td>{game.stat.freeThrowsAttempted}</td>
              <td>{statParser.shootingPercentage(game.stat.freeThrowsMade, game.stat.freeThrowsAttempted)}</td>
              <td>{game.stat.totalRebounds}</td>
              <td>{game.stat.assists}</td>
              <td>{game.stat.steals}</td>
              <td>{game.stat.blocks}</td>
              <td>{game.stat.fouls}</td>
              <td>{game.stat.points}</td>
            </tr>
          )
        })
      }
    {

      <tr style={{fontWeight: 'bold'}}>
        <td>Total</td>
        <td></td>
        <td>{(combined.fieldGoalsMade / statsLength).toFixed(1) || '-'}</td>
        <td>{(combined.fieldGoalsAttempted / statsLength).toFixed(1)}</td>
        <td>{((combined.fieldGoalsMade / statsLength) / (combined.fieldGoalsAttempted / statsLength) * 100).toFixed(1)}</td>

        <td>{(combined.threePointsMade / statsLength).toFixed(1)}</td>
        <td>{(combined.threePointsAttempted / statsLength).toFixed(1)}</td>
        <td>{((combined.threePointsMade / statsLength) / (combined.threePointsAttempted / statsLength) * 100).toFixed(1)}</td>

        <td>{(combined.freeThrowsMade / statsLength).toFixed(1)}</td>
        <td>{(combined.freeThrowsAttempted / statsLength).toFixed(1)}</td>
        <td>{((combined.freeThrowsMade / statsLength) / (combined.freeThrowsAttempted / statsLength) * 100).toFixed(1)}</td>
        <td>{(combined.totalRebounds / statsLength).toFixed(1)}</td>
        <td>{(combined.assists / statsLength).toFixed(1)}</td>
        <td>{(combined.steals / statsLength).toFixed(1)}</td>
        <td>{(combined.blocks / statsLength).toFixed(1)}</td>
        <td>{(combined.fouls / statsLength).toFixed(1)}</td>
        <td>{(combined.points / statsLength).toFixed(1)}</td>
      </tr>
    }

      </tbody>
    </table>

    )
  }

}

export default StatList;
