import React, { PropTypes } from 'react';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import helpers from '../../../utils/helpers';

const PlayerScoreboard = ({highs, title}) => {
  // const {assists, points, blocks, rebounds, steals} = highs;

  return (
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
};
PlayerScoreboard.propTypes = {
  highs: PropTypes.object
};

PlayerScoreboard.defaultProps = {
  highs: {}
};

export default PlayerScoreboard;
