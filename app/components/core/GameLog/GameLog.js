import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';

class GameLog extends React.Component {

  static propTypes = {
    stats: PropTypes.array,
    title: PropTypes.string

  };
  static defaultProps = {
    stats: [],
    title: ''
  };

  render() {
    const {stats} = this.props;
    let combined = statParser.pluckThenCombineStats(stats, 'stat') || {};
    let collectionLength = stats.length;


    return (
        <table className="table" style={{fontSize: '.7em'}}>
          <thead>
          <tr>
            <td>Date</td>
            <td>Time</td>
            <td>Opp</td>
            <td>Score</td>
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
              if(homeTeamWin) {
                outcome = (game.team == game.game.homeTeam) ? 'W': 'L';
              } else {
                outcome = (game.team == game.game.awayTeam) ? 'W': 'L';
              }

              return (
                <tr>

                  <td>{(gameDate.getMonth()+1) + '/' + gameDate.getDate() + '/' + gameDate.getFullYear()}</td>
                  <td>{gameTime}</td>
                  <td>{game.vsTeam.name}</td>
                  <td>{outcome} {score}</td>
                  <td>{game.stat.fieldGoalsMade}</td>
                  <td>{game.stat.fieldGoalsAttempted}</td>
                  <td>{((game.stat.fieldGoalsMade/game.stat.fieldGoalsAttempted)*100).toFixed(1)}</td>

                  <td>{game.stat.threePointsMade}</td>
                  <td>{game.stat.threePointsAttempted}</td>
                  <td>{((game.stat.threePointsMade/game.stat.threePointsAttempted)*100).toFixed(1)}</td>
                  <td>{game.stat.freeThrowsMade}</td>
                  <td>{game.stat.freeThrowsAttempted}</td>
                  <td>{((game.stat.freeThrowsMade/game.stat.freeThrowsAttempted)*100).toFixed(1)}</td>
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
              <td></td>
              <td></td>
              <td>{(combined.fieldGoalsMade/collectionLength).toFixed(1) || '-'}</td>
              <td>{(combined.fieldGoalsAttempted/collectionLength).toFixed(1)}</td>
              <td>{((combined.fieldGoalsMade/collectionLength)/(combined.fieldGoalsAttempted/collectionLength)*100).toFixed(1)}</td>

              <td>{(combined.threePointsMade/collectionLength).toFixed(1)}</td>
              <td>{(combined.threePointsAttempted/collectionLength).toFixed(1)}</td>
              <td>{((combined.threePointsMade/collectionLength)/(combined.threePointsAttempted/collectionLength)*100).toFixed(1)}</td>

              <td>{(combined.freeThrowsMade/collectionLength).toFixed(1)}</td>
              <td>{(combined.freeThrowsAttempted/collectionLength).toFixed(1)}</td>
              <td>{((combined.freeThrowsMade/collectionLength)/(combined.freeThrowsAttempted/collectionLength)*100).toFixed(1)}</td>
              <td>{(combined.totalRebounds/collectionLength).toFixed(1)}</td>
              <td>{(combined.assists/collectionLength).toFixed(1)}</td>
              <td>{(combined.steals/collectionLength).toFixed(1)}</td>
              <td>{(combined.blocks/collectionLength).toFixed(1)}</td>
              <td>{(combined.fouls/collectionLength).toFixed(1)}</td>
              <td>{(combined.points/collectionLength).toFixed(1)}</td>
            </tr>

          }
          </tbody>
        </table>
    );
  }

}

export default GameLog;
