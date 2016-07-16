import _ from 'lodash';
import stat from '../../shared/models/stat';
import helpers from './helpers';

function combineList (list = []) {

  let clone = _.cloneDeep(list);

  let cummulativeStats = _.reduce(clone, (total, stat) => {
    _.map(Object.keys(stat), (key) => {
      total[key] = total[key] + stat[key];
    });
    return total;
  });
  return cummulativeStats;
}

function combineStats (list = []) {

  let clone = _.cloneDeep(list);

  let cummulativeStats = _.reduce(clone, (total, stat) => {
    _.map(Object.keys(stat), (key) => {
      if (key !== '__v' && typeof total[key] === 'number' && total[key] >= 0) {
        total[key] = total[key] + stat[key];
      }
    });
    return total;
  });
  return cummulativeStats;
}

function playerListCummulativeStats (stats = [], players = []) {
  let statList = _.cloneDeep(stats);
  let playerList = _.cloneDeep(players);
  let playerListSummary = [];

  if (playerList.length && statList.length);
  playerListSummary = _.map(playerList, (player) => {
    let playerStats = _.filter(statList, (stat) => {
      return stat.player._id === player._id;
    });

    /*let combined = combineStats(playerStats) || {};
    let gameCount = playerStats.length;

    let result = {
      gameCount: gameCount,
      player: player,
      avgFieldGoalsMade: helpers.roundDecimal(combined.fieldGoalsMade / gameCount, -1) || 0,
      avgFieldGoalsAttempted: helpers.roundDecimal(combined.fieldGoalsAttempted / gameCount, -1) || 0,
      fieldGoalPercentage: shootingPercentage(combined.fieldGoalsMade, combined.fieldGoalsAttempted),
      avgThreePointsMade: helpers.roundDecimal(combined.threePointsMade / gameCount, -1) || 0,
      avgThreePointsAttempted: helpers.roundDecimal(combined.threePointsAttempted / gameCount, -1) || 0,
      threePointPercentage: shootingPercentage(combined.threePointsMade, combined.threePointsAttempted),
      avgFreeThrowsMade: helpers.roundDecimal(combined.freeThrowsMade / gameCount, -1) || 0,
      avgFreeThrowsAttempted: helpers.roundDecimal(combined.freeThrowsAttempted / gameCount, -1) || 0,
      freeThrowsPercentage: shootingPercentage(combined.freeThrowsMade, combined.freeThrowsAttempted),
      avgRebounds: helpers.roundDecimal(combined.totalRebounds / gameCount, -1) || 0,
      avgAssists: helpers.roundDecimal(combined.assists / gameCount, -1) || 0,
      avgSteals: helpers.roundDecimal(combined.steals / gameCount, -1) || 0,
      avgBlocks: helpers.roundDecimal(combined.blocks / gameCount, -1) || 0,
      avgFouls: helpers.roundDecimal(combined.fouls / gameCount, -1) || 0,
      avgPoints: helpers.roundDecimal(combined.points / gameCount, -1) || 0,
      ...combined
    }

    return result;*/

    return playerCummulativeStats(playerStats, player);
  });
  playerListSummary = _.orderBy(playerListSummary, ['avgPoints', 'gameCount'], ['desc', 'desc']);

  return playerListSummary;
}

function playerCummulativeStats(stats = [], player = {}) {
  let combined = combineStats(stats) || {};
  let gameCount = stats.length;

  let result = {
    gameCount: gameCount,
    player: player,
    avgFieldGoalsMade: helpers.roundDecimal(combined.fieldGoalsMade / gameCount, -1) || 0,
    avgFieldGoalsAttempted: helpers.roundDecimal(combined.fieldGoalsAttempted / gameCount, -1) || 0,
    fieldGoalPercentage: shootingPercentage(combined.fieldGoalsMade, combined.fieldGoalsAttempted),
    avgThreePointsMade: helpers.roundDecimal(combined.threePointsMade / gameCount, -1) || 0,
    avgThreePointsAttempted: helpers.roundDecimal(combined.threePointsAttempted / gameCount, -1) || 0,
    threePointPercentage: shootingPercentage(combined.threePointsMade, combined.threePointsAttempted),
    avgFreeThrowsMade: helpers.roundDecimal(combined.freeThrowsMade / gameCount, -1) || 0,
    avgFreeThrowsAttempted: helpers.roundDecimal(combined.freeThrowsAttempted / gameCount, -1) || 0,
    freeThrowsPercentage: shootingPercentage(combined.freeThrowsMade, combined.freeThrowsAttempted),
    avgRebounds: helpers.roundDecimal(combined.totalRebounds / gameCount, -1) || 0,
    avgAssists: helpers.roundDecimal(combined.assists / gameCount, -1) || 0,
    avgSteals: helpers.roundDecimal(combined.steals / gameCount, -1) || 0,
    avgBlocks: helpers.roundDecimal(combined.blocks / gameCount, -1) || 0,
    avgFouls: helpers.roundDecimal(combined.fouls / gameCount, -1) || 0,
    avgPoints: helpers.roundDecimal(combined.points / gameCount, -1) || 0,
    ...combined
  };

  return result;
}

function getMaxStats (stats = []) {

  return {
    points: _.maxBy(stats, 'points'),
    assists: _.maxBy(stats, 'assists'),
    steals: _.maxBy(stats, 'steals'),
    blocks: _.maxBy(stats, 'blocks'),
    totalRebounds: _.maxBy(stats, 'totalRebounds')
  };
  /*debugger;
  return _.reduce(stats, (result, stat, key) => {
    let max = max || {};
    max.points = (stat.points > result.points) ? stat : result;
    max.assists = (stat.assists > result.assists) ? stat : result;
    max.steals = (stat.steals > result.steals) ? stat : result;
    max.blocks = (stat.blocks > result.blocks) ? stat : result;
    max.totalRebounds = (stat.totalRebounds > result.totalRebounds) ? stat : result;
    return max;
  });*/
}

function getWinningStats (stats = []) {
  return _.filter(stats, (stat) => {
    return didWeWin(stat);
  });
}

function didWeWin (stat = {}) {
  let {team, game: {homeTeam, awayTeam, homeScore, awayScore}} = stat;
  let myScore = 0, theirScore = 0;

  if (helpers.getObjId(team) === helpers.getObjId(homeTeam)) {
    myScore = homeScore;
    theirScore = awayScore;
  } else if (helpers.getObjId(team) === helpers.getObjId(awayTeam)){
    myScore = awayScore;
    theirScore = homeScore;
  }

  return myScore > theirScore;
}

function getLosingStats (stats = []) {
  return _.filter(stats, (stat) => {
    let {team, game: {homeTeam, awayTeam, homeScore, awayScore}} = stat;
    let myScore = 0, theirScore = 0;

    if (helpers.getObjId(team) === helpers.getObjId(homeTeam)) {
      myScore = homeScore;
      theirScore = awayScore;
    } else if (helpers.getObjId(team) === helpers.getObjId(awayTeam)){
      myScore = awayScore;
      theirScore = homeScore;
    }

    return myScore < theirScore;
  });
}

function getLatestStats (stats, count = 0) {
  const ordered = _.orderBy(stats, ['game.date'], ['desc']);
  return ordered.splice(0,count);

}

function shootingPercentage (made, attempted) {
  if (attempted === 0 || made === 0) return 0;
  let percentage = (made / attempted) * 100;
  return helpers.roundDecimal(percentage, -1);
}

function getWinLoss (stats = []) {
  const winningStats = getWinningStats(stats);
  const losingStats = getLosingStats(stats);

  // return {win: 0, loss: 0} format
  return {win: winningStats.length, loss: losingStats.length};
}

function _getGameResult (stat = {}) {
  let {game: {homeScore, awayScore}} = stat;
  const winLoss = (didWeWin(stat)) ? 'W' : 'L';
  debugger;
  return `${winLoss} ${homeScore} - ${awayScore}`;

}

function createStandings (games = []) {
  let cloned = _.cloneDeep(games);
  let finishedGames = _.filter(cloned, {isUpdated: true});
  /*
   {
   'Midlife Crisis': {win: 2,lose: 3,name: 'Midlife Crisis, id: '567abc'}
   }
   */

  // TODO: Refactor to use _.reduce
  let board = {};
  _.map(finishedGames, (game) => {
    board[game.homeTeam.name] = board[game.homeTeam.name] ||
      {win: 0, loss: 0, name: game.homeTeam.name, _id: game.homeTeam._id};
    board[game.awayTeam.name] = board[game.awayTeam.name] ||
      {win: 0, loss: 0, name: game.awayTeam.name, _id: game.awayTeam._id};

    if (game.homeScore > game.awayScore) {
      board[game.homeTeam.name].win++;
      board[game.awayTeam.name].loss++;
    } else {
      board[game.homeTeam.name].loss++;
      board[game.awayTeam.name].win++;
    }
    board[game.homeTeam.name].winRate = board[game.homeTeam.name].win / (board[game.homeTeam.name].win + board[game.homeTeam.name].loss);
    board[game.homeTeam.name].division = game.division;
    board[game.awayTeam.name].division = game.division;
  });

  let ordered = _.orderBy(board, ['win'], ['desc']);

  return ordered;
}

function createSchedule (games = []) {
  let cloned = _.cloneDeep(games);
  let gameList = _.orderBy(cloned, ['date', ['asc']]);

  _.map(gameList, (game) => {
    let date = new Date(game.date);
    game.prettyDate = date.toDateString();
  });

  return _.groupBy(gameList, 'prettyDate');
}

export default {
  combineStats: combineStats,
  combineListofStats: combineList,
  pluckThenCombineStats: _.flowRight(combineList, _.map),
  getMaxStats: getMaxStats,
  getLatestStats: getLatestStats,
  getWinningStats: getWinningStats,
  getWinLoss: getWinLoss,
  getGameResult: _getGameResult,
  getLosingStats: getLosingStats,
  shootingPercentage: shootingPercentage,
  createStandings: createStandings,
  createSchedule: createSchedule,
  playerCummulativeStats: playerCummulativeStats,
  playerListCummulativeStats: playerListCummulativeStats
};
