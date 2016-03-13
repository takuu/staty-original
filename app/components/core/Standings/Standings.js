//import styles from './styles.styl';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import statParser from '../../../utils/statParser';


const Standings = ({games, league}) => {
  const standings = statParser.createStandings(games);

  return (
    <div>
      <ul className='list-group'>
        {
          _.map(standings, (team) => {
            let {name, _id, win, loss} = team;

            return (
              <li key={_id} className='list-group-item nopadding list-group-item-md'>
                <Link to={_createTeamLink(league, team)} className='list-group-item list-group-item-md noborder'>
                <span className='inline-list-item teams-item'>
                  <span>{name}</span>
                </span>
                <span className='inline-list-item record-item'>
                  <span>{win} - {loss}</span>
                </span>
                </Link>
              </li>
            )
          })
        }
      </ul>

    </div>
  );

  let old = (
    <table className="table">
      <tbody>
      {
        _.map(standings, (team) => {
          return (
            <tr key={team._id}>
              <td>
                <Link to={_createTeamLink(league, team)} >{team.name}</Link>
              </td>
              <td>{team.win}-{team.loss}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  );

  function _createTeamLink(league, team) {
    return (team) ? `/${league.name}/team/${team._id}`: '#';
  }
}

Standings.propTypes = {
  games: PropTypes.array,
  league: PropTypes.object
};
Standings.defaultProps = {
  games: [],
  league: {}
};

export default Standings