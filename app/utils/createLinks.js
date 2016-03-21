import _ from 'lodash';

function _createPlayerUrl (league, player) {
  let teamId = (typeof player.team === 'object') ? player.team._id : player.team;
  return (player) ? `/${league.name}/team/${teamId}/player/${player._id}` : '#';
}

function _createTeamLink (league, team) {
  let {division} = team;
  let divisionId = (typeof division === 'object' && division._id) ? division._id: division;
  return (team) ? `/${league.name}/division/${divisionId}/team/${team._id}`: '#';
}

export default {
  createPlayerUrl: _createPlayerUrl,
  createTeamLink: _createTeamLink
};
