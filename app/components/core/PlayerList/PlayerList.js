import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import helper from '../../../utils/helpers';
import './styles.css';

const PlayerList = ({players, league}) => {
  let hasNumber = helper.doesKeyExistInList(players, 'number');
  let hasName = helper.doesKeyExistInList(players, 'name');
  let hasPos = helper.doesKeyExistInList(players, 'position');
  let hasHeight = helper.doesKeyExistInList(players, 'height');

  return (
    <ul className='list-group'>
      {
        _.map(players, (player) => {
          return (
            <li className='list-group-item nopadding' key={player._id}>
              <Link to={_createPlayerUrl(league, player)} className='list-group-item'>
                <span className='inline-list-item number-item'>
                  {(hasNumber) ? (player.number || '-') : ''}
                </span>
                <span className='inline-list-item name-item'>
                  {(hasName) ? (player.name || '-') : ''}
                </span>
                <span className='inline-list-item position-item'>
                  {(hasPos) ? (player.position || '-') : ''}
                </span>
                <span className='inline-list-item height-item'>
                  {(hasHeight) ? (player.height || '-') : ''}
                </span>
              </Link>
            </li>
          );
        })
      }
    </ul>
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