import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';

const SplitStats = ({stats, title}) => {

    let combined = statParser.combineStats(stats) || {};

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
            <td>{(combined.fieldGoalsMade / stats.length).toFixed(1)}</td>
            <td>{(combined.fieldGoalsAttempted / stats.length).toFixed(1)}</td>
            <td>{((combined.fieldGoalsMade / stats.length) / (combined.fieldGoalsAttempted / stats.length) * 100).toFixed(1)}</td>


            <td>{(combined.threePointsMade / stats.length).toFixed(1)}</td>
            <td>{(combined.threePointsAttempted / stats.length).toFixed(1)}</td>
            <td>{((combined.threePointsMade / stats.length) / (combined.threePointsAttempted / stats.length) * 100).toFixed(1)}</td>

            <td>{(combined.freeThrowsMade / stats.length).toFixed(1)}</td>
            <td>{(combined.freeThrowsAttempted / stats.length).toFixed(1)}</td>
            <td>{((combined.freeThrowsMade / stats.length) / (combined.freeThrowsAttempted / stats.length) * 100).toFixed(1)}</td>

            <td>{(combined.totalRebounds / stats.length).toFixed(1)}</td>
            <td>{(combined.assists / stats.length).toFixed(1)}</td>
            <td>{(combined.steals / stats.length).toFixed(1)}</td>
            <td>{(combined.blocks / stats.length).toFixed(1)}</td>
            <td>{(combined.fouls / stats.length).toFixed(1)}</td>
            <td>{(combined.points / stats.length).toFixed(1)}</td>
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
