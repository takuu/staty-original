import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import helper from '../../../utils/helpers';

const PlayerList = ({players, league}) => {
  let hasNumber = helper.doesKeyExistInList(players, 'number');
  let hasName = helper.doesKeyExistInList(players, 'name');
  let hasPos = helper.doesKeyExistInList(players, 'position');
  let hasHeight = helper.doesKeyExistInList(players, 'height');

  return (
    <table className="table">
      <tbody>
      {
        _.map(players, (player) => {

          return (
            <tr key={player._id}>
              {(hasNumber) ? (<td>{player.number || '-'}</td>): ''}
              {(hasName) ? (<td><Link to={_createPlayerUrl(league, player)}>{player.name || '-'}</Link></td>): ''}
              {(hasPos) ? (<td>{player.position || '-'}</td>): ''}
              {(hasHeight) ? (<td>{player.height || '-'}</td>): ''}
            </tr>
          )
        })
      }
      </tbody>
    </table>
  );

  function _createPlayerUrl(league, player) {
    return (player) ? `/${league.name}/league/${league._id}/team/${player.team._id}/player/${player._id}`: '#';
  }
};

PlayerList.propTypes = {
  players: PropTypes.array,
  league: PropTypes.object
};

PlayerList.defaultProps = {
  players: [],
  league: {}
};

export default PlayerList;