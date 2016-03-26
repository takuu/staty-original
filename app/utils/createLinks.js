import _ from 'lodash';

function _createPlayerUrl (league = {}, player = {}) {
  let teamId = (typeof player.team === 'object') ? player.team._id : player.team;
  let playerId = (typeof player === 'object') ? player._id : player;
  return `/${league.name}/team/${teamId}/player/${playerId}`;
}

function _createTeamLink (league = {}, team = {}) {
  let {division} = team;
  let divisionId = (typeof division === 'object' && division._id) ? division._id : division;
  return (team) ? `/${league.name}/division/${divisionId}/team/${team._id}` : '#';
}

function _createDivisionLink (league, division) {
  let divisionId = (typeof division === 'object' && division._id) ? division._id : division;
  return `/${league.name}/division/${divisionId}`;
}

export default {
  createPlayerUrl: _createPlayerUrl,
  createTeamLink: _createTeamLink,
  createDivisionLink: _createDivisionLink
};
