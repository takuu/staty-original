import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';

class SplitStats extends React.Component {
  static propTypes = {
    stats: PropTypes.array.isRequired

  };
  static defaultProps = {
    stats: []
  };

  render() {
    const {stats} = this.props;
    let statsLength = stats.length;
    let combined = statParser.pluckThenCombineStats(stats, 'stat') || {};

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
          <td><b>{this.props.title}</b></td>
          <td>{statsLength}</td>
          <td>{(combined.fieldGoalsMade / statsLength).toFixed(1)}</td>
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

        </tbody>
      </table>

    );
  }

}

export default SplitStats;
