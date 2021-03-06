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

function _createLeagueRegisterLink (league = {}) {
  return `/${league.name}/register`;
}
function _createLeagueLink (league = {}) {
  return `/${league.name}`;
}

function _createGameLink (league = {}, game = {} ) {
  const {division} = game;
  let divisionId = (typeof division === 'object' && division._id) ? division._id : division;
  let gameId = (typeof game === 'object' && game._id) ? game._id : game;
  return `/${league.name}/division/${divisionId}/game/${gameId}`;
}

function _createProfileLink (user = {}) {
  const { players } = user;
  // const playerList = _.map(players, (player) => {
  //   return (typeof player === 'object' && player._id) ? player._id : player;
  // });
  // return `/profile?id=${playerList.toString()}`;
  return `/profile`;
}

export default {
  createPlayerUrl: _createPlayerUrl,
  createTeamLink: _createTeamLink,
  createDivisionLink: _createDivisionLink,
  createProfileLink: _createProfileLink,
  createLeagueRegisterLink: _createLeagueRegisterLink,
  createLeagueLink: _createLeagueLink,
  createGameLink: _createGameLink
};
