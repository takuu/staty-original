import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import classNames from 'classnames';
import helpers from '../../../utils/helpers';
import './styles.css';

const PlayerList = ({players, league, player}) => {
  let hasNumber = helpers.doesKeyExistInList(players, 'number');
  let hasName = helpers.doesKeyExistInList(players, 'name');
  let hasPos = helpers.doesKeyExistInList(players, 'position');
  let hasHeight = helpers.doesKeyExistInList(players, 'height');

  let activePlayerId = helpers.getObjId(player);

  return (
    <ul className='list-group'>
      {
        _.map(players, (player) => {
          let playerClass = classNames({
            'active': player._id === activePlayerId,
            'list-group-item': true,
            'noborder': true
          });


          return (
            <li className='list-group-item nopadding' key={player._id}>
              <Link to={_createPlayerUrl(league, player)} className={playerClass}>
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
    return (player) ? `/${league.name}/team/${player.team._id}/player/${player._id}`: '#';
  }
};

PlayerList.propTypes = {
  players: PropTypes.array,
  league: PropTypes.object,
  player: PropTypes.object
};

PlayerList.defaultProps = {
  players: [],
  league: {},
  player: {}
};

export default PlayerList;