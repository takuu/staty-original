import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './styles.css';

const TeamList = ({teams, league}) => {
  debugger;
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