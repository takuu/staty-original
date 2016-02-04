import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';

const GameLog = ({stats, title}) => {

  const combined = statParser.pluckThenCombineStats(stats, 'stat') || {};
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
            <td>{(combined.fieldGoalsMade/stats.length).toFixed(1) || '-'}</td>
            <td>{(combined.fieldGoalsAttempted/stats.length).toFixed(1)}</td>
            <td>{((combined.fieldGoalsMade/stats.length)/(combined.fieldGoalsAttempted/stats.length)*100).toFixed(1)}</td>

            <td>{(combined.threePointsMade/stats.length).toFixed(1)}</td>
            <td>{(combined.threePointsAttempted/stats.length).toFixed(1)}</td>
            <td>{((combined.threePointsMade/stats.length)/(combined.threePointsAttempted/stats.length)*100).toFixed(1)}</td>

            <td>{(combined.freeThrowsMade/stats.length).toFixed(1)}</td>
            <td>{(combined.freeThrowsAttempted/stats.length).toFixed(1)}</td>
            <td>{((combined.freeThrowsMade/stats.length)/(combined.freeThrowsAttempted/stats.length)*100).toFixed(1)}</td>
            <td>{(combined.totalRebounds/stats.length).toFixed(1)}</td>
            <td>{(combined.assists/stats.length).toFixed(1)}</td>
            <td>{(combined.steals/stats.length).toFixed(1)}</td>
            <td>{(combined.blocks/stats.length).toFixed(1)}</td>
            <td>{(combined.fouls/stats.length).toFixed(1)}</td>
            <td>{(combined.points/stats.length).toFixed(1)}</td>
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
