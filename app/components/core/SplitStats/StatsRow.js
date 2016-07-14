import React from 'react';
if (process.env.BROWSER) require('./styles.css');

const StatsRow = ({combined, title}) => {
  return (
    <div>
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
  );
};
export default StatsRow;
