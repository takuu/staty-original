import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';

const GameLog = ({stats, title}) => {

  const combined = statParser.combineStats(stats) || [];
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
