import React, { PropTypes } from 'react';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import helpers from '../../../utils/helpers';

const HighStats = ({highs, title}) => {
  const {assists, points, blocks, rebounds, steals} = highs;

  let foo = (
    <div className='high-container'>
      <div className='title'>{title || 'Season Highs'}</div>
      <ul className='list-group'>
        {
          _.map(highs, (item, key) => {
            const title = helpers.camelCaseToTitle(key);
            return (
              <li className='list-group-item'>
                <div className='high-title'>{title}</div>
                <div className='high-stat'>{item}</div>
              </li>
            );
          })
        }

      </ul>
    </div>

  );
  return (
    <div>
      <div className='title'>{title || 'Season Highs'}</div>
      <div className='high-container'>
      {
        _.map(highs, (item, key) => {
          const title = helpers.camelCaseToTitle(key);
          return (
            <div className='high-block'>
              <div className='high-title'>{title}</div>
              <div className='high-stat'>{item}</div>
            </div>
          );
        })
      }
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
