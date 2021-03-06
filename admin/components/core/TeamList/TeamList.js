import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');

const TeamList = ({teams, league}) => {
  return (
    <ul className='list-group'>
      <li className='list-group-item nopadding'></li>
    </ul>
  );
};

TeamList.propTypes = {
  teams: PropTypes.array,
  league: PropTypes.object
};

TeamList.defaultProps = {
  teams: [],
  league: {}
};

export default TeamList;