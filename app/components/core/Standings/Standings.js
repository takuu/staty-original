//import styles from './styles.styl';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import statParser from '../../../utils/statParser';


const Standings = ({games, league}) => {
  const standings = statParser.createStandings(games);
  return (
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