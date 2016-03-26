import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import helpers from '../../../utils/helpers';

const SplitStats = ({stats, title}) => {
  let combined = statParser.playerCummulativeStats(stats);

    return (
      <table className='table' style={{fontSize: '.7em'}}>
        <thead>
        <tr>
          <th style={{width: '100px'}}></th>
          <th>G</th>
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

          <tr>
            <td style={{width: '100px'}}><b>{title}</b></td>
            <td>{stats.length}</td>
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

        </tbody>
      </table>

    );

};

SplitStats.propTypes = {
  stats: PropTypes.array.isRequired

};
SplitStats.defaultProps = {
  stats: []
};

export default SplitStats;
