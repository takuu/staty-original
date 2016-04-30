import React, { PropTypes } from 'react';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import statParser from '../../../utils/statParser';

const GameLog = ({stats, title}) => {

  // const combined = statParser.combineStats(stats) || [];

  let combined = statParser.playerCummulativeStats(stats);
  return (
      <table className='table' style={{fontSize: '.7em'}}>
        <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Opp</th>
          <th>Score</th>
          <th>FGM</th>
          <th>FGA</th>
          <th>FG%</th>
          <th>3PM</th>
          <th>3PA</th>
          <th>3PT%</th>
          <th>FTM</th>
          <th>FTA</th>
          <th>FT%</th>
          <th>REB</th>
          <th>AST</th>
          <th>ST</th>
          <th>BS</th>
          <th>PF</th>
          <th>PTS</th>
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
              <tr key={game._id}>

                <td>{(gameDate.getMonth()+1) + '/' + gameDate.getDate() + '/' + gameDate.getFullYear()}</td>
                <td>{gameTime}</td>
                <td>{game.vsTeam.name}</td>
                <td>{outcome} {score}</td>
                <td>{game.fieldGoalsMade}</td>
                <td>{game.fieldGoalsAttempted}</td>
                <td>{((game.fieldGoalsMade/game.fieldGoalsAttempted)*100).toFixed(1)}</td>

                <td>{game.threePointsMade}</td>
                <td>{game.threePointsAttempted}</td>
                <td>{((game.threePointsMade/game.threePointsAttempted)*100).toFixed(1)}</td>
                <td>{game.freeThrowsMade}</td>
                <td>{game.freeThrowsAttempted}</td>
                <td>{((game.freeThrowsMade/game.freeThrowsAttempted)*100).toFixed(1)}</td>
                <td>{game.totalRebounds}</td>
                <td>{game.assists}</td>
                <td>{game.steals}</td>
                <td>{game.blocks}</td>
                <td>{game.fouls}</td>
                <td>{game.points}</td>
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
            <td>{combined.avgFieldGoalsMade}</td>
            <td>{combined.avgFieldGoalsAttempted}</td>
            <td>{(combined.fieldGoalPercentage >= 0) ? combined.fieldGoalPercentage : '-'}</td>


            <td>{combined.avgThreePointsMade}</td>
            <td>{combined.avgThreePointsAttempted}</td>
            <td>{(combined.threePointPercentage >= 0) ? combined.threePointPercentage : '-'}</td>

            <td>{combined.avgFreeThrowsMade}</td>
            <td>{combined.avgFreeThrowsAttempted}</td>
            <td>{(combined.freeThrowsPercentage >= 0) ? combined.freeThrowsPercentage : '-'}</td>

            <td>{combined.avgRebounds}</td>
            <td>{combined.avgAssists}</td>
            <td>{combined.avgSteals}</td>
            <td>{combined.avgBlocks}</td>
            <td>{combined.avgFouls}</td>
            <td>{combined.avgPoints}</td>
          </tr>

        }
        </tbody>
      </table>
  );


};

GameLog.propTypes = {
  stats: PropTypes.array,
  title: PropTypes.string
};

GameLog.defaultProps = {
  stats: [],
  title: ''
};

export default GameLog;
