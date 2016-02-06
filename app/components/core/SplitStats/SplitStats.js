import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';


const SplitStats = ({stats, title}) => {

    let combined = statParser.combineStats(stats) || {};

    return (
      <table className="table" style={{fontSize: '.7em'}}>
        <thead>
        <tr>
          <td width="100"></td>
          <td>G</td>
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

        <tr>
          <td><b>{title}</b></td>
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
