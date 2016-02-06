import React, { PropTypes } from 'react';
import styles from './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import Loader from '../../Loader/Loader';



const StatList = ({stats}) =>  {
    let combined = {};
    let statsLength = stats.length;

    if(statsLength) {
      combined = statParser.combineStats(stats);
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
        _.map(stats, (player) => {
          return (
            <tr key={player._id}>

              <td>{player.player.number}</td>
              <td>{player.player.name}</td>

              <td>{player.fieldGoalsMade}</td>
              <td>{player.fieldGoalsAttempted}</td>

              <td>{statParser.shootingPercentage(player.fieldGoalsMade, player.fieldGoalsMade)}</td>

              <td>{player.threePointsMade}</td>
              <td>{player.threePointsAttempted}</td>
              <td>{statParser.shootingPercentage(player.threePointsMade, player.threePointsAttempted)}</td>
              <td>{player.freeThrowsMade}</td>
              <td>{player.freeThrowsAttempted}</td>
              <td>{statParser.shootingPercentage(player.freeThrowsMade, player.freeThrowsAttempted)}</td>
              <td>{player.totalRebounds}</td>
              <td>{player.assists}</td>
              <td>{player.steals}</td>
              <td>{player.blocks}</td>
              <td>{player.fouls}</td>
              <td>{player.points}</td>
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

StatList.propTypes = {
  stats: PropTypes.array
};
StatList.defaultProps = {
  stats: []
};

export default StatList;
