import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import createLinks from '../../../utils/createLinks';
import helpers from '../../../utils/helpers';

const HighStats = ({highs, title}) => {
  const {assists, points, blocks, rebounds, steals} = highs;

  return (
    <div>
      <div className='title'>{title || 'Season Highs'}</div>
      <div className='high-container'>
      {
        _.map(highs, (item = {}, key, index) => {
          const title = helpers.camelCaseToTitle(key);
          const {game, league} = item;
          const date = (game) ? (new Date(game.date)).toDateString() : '';
          const result = (game && game.date) ? statParser.getGameResult(item) : '';

          return (
            <div key={key} className='high-block'>
              <div className='high-title'>{title}</div>
              <div className='high-stat'>{item[key]}</div>
              <div className='high-result'><Link to={createLinks.createGameLink(league, game)}>{result}</Link></div>

              <div className='high-date'>{date}</div>
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
