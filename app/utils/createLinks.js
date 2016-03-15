import _ from 'lodash';

function _createPlayerUrl (league, player) {
  let teamId = (typeof player.team === 'object') ? player.team._id : player.team;
  return (player) ? `/${league.name}/team/${teamId}/player/${player._id}` : '#';
}

export default {
  createPlayerUrl: _createPlayerUrl
};
