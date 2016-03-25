import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import statParser from '../../../utils/statParser';

const HighStats = ({highs}) => {
  const {assists, points, blocks, totalRebounds, steals} = highs;

  return (
    <div>
      <div className='title'>Season Highs</div>
      <div className='high-container'>
        <div className='high-block'>
          <div className='high-title'>Assists</div>
          <div className='high-stat'>{assists}</div>
        </div>
        <div className='high-block'>
          <div className='high-title'>Points</div>
          <div className='high-stat'>{points}</div>
        </div>
        <div className='high-block'>
          <div className='high-title'>Rebounds</div>
          <div className='high-stat'>{totalRebounds}</div>
        </div>
        <div className='high-block'>
          <div className='high-title'>Steals</div>
          <div className='high-stat'>{steals}</div>
        </div>
        <div className='high-block'>
          <div className='high-title'>Blocks</div>
          <div className='high-stat'>{blocks}</div>
        </div>
      </div>

    </div>
  );

};
HighStats.propTypes = {
  highs: PropTypes.object
};

HighStats.defaultProps = {
  highs: {}
};

export default HighStats;
