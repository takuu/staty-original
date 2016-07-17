import React, {PropTypes} from 'react';
if (process.env.BROWSER) require('./styles.css');
import classNames from 'classnames';

const StatsRow = ({combined, title, highlight}) => {
  let statClass = classNames({
    'bold': highlight,
    'num': true
  });

  let rowClass = classNames({
    'table-row': true,
    'stat-row-result': highlight
  })
  return (
    <div>
      <div className={rowClass}>
        <div className='text' style={{width: '100px'}}><b>{title}</b></div>
        <div className={statClass}>{combined.gameCount}</div>
        <div className={statClass}>{combined.avgFieldGoalsMade}</div>
        <div className={statClass}>{combined.avgFieldGoalsAttempted}</div>
        <div className={statClass}>{(combined.fieldGoalPercentage >= 0) ? combined.fieldGoalPercentage : '-'}</div>

        <div className={statClass}>{combined.avgThreePointsMade}</div>
        <div className={statClass}>{combined.avgThreePointsAttempted}</div>
        <div className={statClass}>{(combined.threePointPercentage >= 0) ? combined.threePointPercentage : '-'}</div>

        <div className={statClass}>{combined.avgFreeThrowsMade}</div>
        <div className={statClass}>{combined.avgFreeThrowsAttempted}</div>
        <div className={statClass}>{(combined.freeThrowsPercentage >= 0) ? combined.freeThrowsPercentage : '-'}</div>

        <div className={statClass}>{combined.avgRebounds}</div>
        <div className={statClass}>{combined.avgAssists}</div>
        <div className={statClass}>{combined.avgSteals}</div>
        <div className={statClass}>{combined.avgBlocks}</div>
        <div className={statClass}>{combined.avgFouls}</div>
        <div className={statClass}>{combined.avgPoints}</div>
      </div>
    </div>
  );
};

StatsRow.propTypes = {
  combined: PropTypes.object.isRequired,
  title: PropTypes.string,
  highlight: PropTypes.bool
};

StatsRow.defaultProps = {
  combined: {},
  title: '',
  highlight: false
};
export default StatsRow;
