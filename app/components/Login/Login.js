import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';


const Standings = ({games, league, team}) => {
  const standings = statParser.createStandings(games);
  let activeTeamId = (typeof team === 'object') ? team._id : team;

  return (
    <div>
      Login
    </div>
  );
};

Standings.propTypes = {
};
Standings.defaultProps = {
};

export default Standings