import React, { PropTypes } from 'react';
import { Link } from 'react-router';
//import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import statParser from '../../../utils/statParser';
import createLinks from '../../../utils/createLinks';
import _ from 'lodash';


const Standings = ({games, league, team}) => {
  const standings = statParser.createStandings(games);
  let activeTeamId = (typeof team === 'object') ? team._id : team;

  return (
    <div>
      <ul className='list-group'>
        {
          _.map(standings, (team) => {
            let {name, _id, win, loss} = team;
            let teamClass = classNames({
              'active': team._id === activeTeamId,
              'list-group-item': true,
              'noborder': true,
              'list-group-item-md': true
            });


            return (
              <li key={_id} className='list-group-item nopadding list-group-item-md'>
                <Link to={createLinks.createTeamLink(league, team)} className={teamClass}>
                <span className='inline-list-item teams-item'>
                  <span>{name}</span>
                </span>
                <span className='inline-list-item record-item'>
                  <span>{win} - {loss}</span>
                </span>
                </Link>
              </li>
            );
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

  /*function _createTeamLink(league, team) {
    let {division} = team;
    let divisionId = (typeof division === 'object' && division._id) ? division._id: division;
    return (team) ? `/${league.name}/division/${divisionId}/team/${team._id}`: '#';
  }*/
};

Standings.propTypes = {
  games: PropTypes.array,
  league: PropTypes.object
};
Standings.defaultProps = {
  games: [],
  league: {}
};

export default Standings