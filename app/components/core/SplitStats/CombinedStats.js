import React, { PropTypes } from 'react';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import helpers from '../../../utils/helpers';

const CombinedStats = ({stats, title, showHeader}) => {
  let combined = statParser.playerCummulativeStats(stats);
  const header = (showHeader) ? (
    <div className='table-row table-header'>
      <div className='text' style={{width: '100px'}}></div>
      <div className='num'>G</div>
      <div className='num'>FGM</div>
      <div className='num'>FGA</div>
      <div className='num'>FG%</div>
      <div className='num'>3PM</div>
      <div className='num'>3PA</div>
      <div className='num'>3PT%</div>
      <div className='num'>FTM</div>
      <div className='num'>FTA</div>
      <div className='num'>FT%</div>
      <div className='num'>REB</div>
      <div className='num'>AST</div>
      <div className='num'>ST</div>
      <div className='num'>BS</div>
      <div className='num'>PF</div>
      <div className='num'>PTS</div>
    </div>
  ) : (
    <div className='table-row'>
      <div className='text' style={{width: '100px'}}></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
      <div className='num'></div>
    </div>
  );
  return (
    <div className='container-fluid'>
      {header}
      <div className='table-row'>
        <div className='text' style={{width: '100px'}}><b>{title}</b></div>
        <div className='num'>{combined.gameCount}</div>
        <div className='num'>{combined.avgFieldGoalsMade}</div>
        <div className='num'>{combined.avgFieldGoalsAttempted}</div>
        <div className='num'>{(combined.fieldGoalPercentage >= 0) ? combined.fieldGoalPercentage : '-'}</div>

        <div className='num'>{combined.avgThreePointsMade}</div>
        <div className='num'>{combined.avgThreePointsAttempted}</div>
        <div className='num'>{(combined.threePointPercentage >= 0) ? combined.threePointPercentage : '-'}</div>

        <div className='num'>{combined.avgFreeThrowsMade}</div>
        <div className='num'>{combined.avgFreeThrowsAttempted}</div>
        <div className='num'>{(combined.freeThrowsPercentage >= 0) ? combined.freeThrowsPercentage : '-'}</div>

        <div className='num'>{combined.avgRebounds}</div>
        <div className='num'>{combined.avgAssists}</div>
        <div className='num'>{combined.avgSteals}</div>
        <div className='num'>{combined.avgBlocks}</div>
        <div className='num'>{combined.avgFouls}</div>
        <div className='num'>{combined.avgPoints}</div>
      </div>
    </div>
  )

};

CombinedStats.propTypes = {
  stats: PropTypes.array.isRequired,
  title: PropTypes.string,
  showHeader: PropTypes.bool

};
CombinedStats.defaultProps = {
  stats: [],
  title: '',
  showHeader: true
};

export default CombinedStats;
