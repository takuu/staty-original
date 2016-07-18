import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import createLinks from '../../../utils/createLinks';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');

const TeamList = ({teams, league}) => {

  var myTeam;

  if(teams.length) {
    myTeam = teams[1].name;
  }
  return (
      <div>
        <ul className='list-group'>
            {
                _.map(teams,(team, index) => {
                    let {name} = team;
                    return(
                        <li key={index} className='list-group-item nopadding list-group-item-md'>
                            <Link to={createLinks.createTeamLink(league, team)}>
                            <span>{name}</span>
                            </Link>
                        </li>
                    )
                })

            }
        </ul>
      </div>

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