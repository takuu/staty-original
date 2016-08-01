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

function getTeamRanking (combinedStats = [], teamId = '') {
  combinedStats = [{"_id":"56f565c9a81b4e2d1c11500c","combinedPoints":372,"combinedTotalRebounds":300,"combinedFreeThrowsMade":49,"combinedFreeThrowsAttempted":99,"combinedThreePointsMade":9,"combinedThreePointsAttempted":62,"combinedFieldGoalsMade":157,"combinedFieldGoalsAttempted":454,"combinedBlocks":8,"combinedSteals":72,"combinedAssists":49},{"_id":"56f565c9a81b4e2d1c115006","combinedPoints":499,"combinedTotalRebounds":319,"combinedFreeThrowsMade":58,"combinedFreeThrowsAttempted":104,"combinedThreePointsMade":42,"combinedThreePointsAttempted":128,"combinedFieldGoalsMade":199,"combinedFieldGoalsAttempted":511,"combinedBlocks":18,"combinedSteals":75,"combinedAssists":97},{"_id":"56f565c9a81b4e2d1c11500b","combinedPoints":500,"combinedTotalRebounds":322,"combinedFreeThrowsMade":55,"combinedFreeThrowsAttempted":98,"combinedThreePointsMade":49,"combinedThreePointsAttempted":163,"combinedFieldGoalsMade":198,"combinedFieldGoalsAttempted":517,"combinedBlocks":10,"combinedSteals":54,"combinedAssists":62},{"_id":"56f565c9a81b4e2d1c11500a","combinedPoints":482,"combinedTotalRebounds":315,"combinedFreeThrowsMade":59,"combinedFreeThrowsAttempted":104,"combinedThreePointsMade":75,"combinedThreePointsAttempted":273,"combinedFieldGoalsMade":174,"combinedFieldGoalsAttempted":571,"combinedBlocks":9,"combinedSteals":71,"combinedAssists":86},{"_id":"56f565c9a81b4e2d1c115004","combinedPoints":526,"combinedTotalRebounds":302,"combinedFreeThrowsMade":83,"combinedFreeThrowsAttempted":139,"combinedThreePointsMade":32,"combinedThreePointsAttempted":134,"combinedFieldGoalsMade":205,"combinedFieldGoalsAttempted":503,"combinedBlocks":16,"combinedSteals":82,"combinedAssists":84},{"_id":"56f565c9a81b4e2d1c115007","combinedPoints":558,"combinedTotalRebounds":318,"combinedFreeThrowsMade":89,"combinedFreeThrowsAttempted":122,"combinedThreePointsMade":80,"combinedThreePointsAttempted":221,"combinedFieldGoalsMade":195,"combinedFieldGoalsAttempted":523,"combinedBlocks":26,"combinedSteals":63,"combinedAssists":48},{"_id":"56f565c9a81b4e2d1c11500d","combinedPoints":314,"combinedTotalRebounds":257,"combinedFreeThrowsMade":46,"combinedFreeThrowsAttempted":85,"combinedThreePointsMade":18,"combinedThreePointsAttempted":79,"combinedFieldGoalsMade":125,"combinedFieldGoalsAttempted":386,"combinedBlocks":11,"combinedSteals":46,"combinedAssists":34},{"_id":"56f565c9a81b4e2d1c115005","combinedPoints":608,"combinedTotalRebounds":308,"combinedFreeThrowsMade":87,"combinedFreeThrowsAttempted":142,"combinedThreePointsMade":57,"combinedThreePointsAttempted":132,"combinedFieldGoalsMade":232,"combinedFieldGoalsAttempted":515,"combinedBlocks":23,"combinedSteals":65,"combinedAssists":63},{"_id":"56f565c9a81b4e2d1c115009","combinedPoints":406,"combinedTotalRebounds":266,"combinedFreeThrowsMade":70,"combinedFreeThrowsAttempted":108,"combinedThreePointsMade":31,"combinedThreePointsAttempted":143,"combinedFieldGoalsMade":152,"combinedFieldGoalsAttempted":427,"combinedBlocks":19,"combinedSteals":54,"combinedAssists":55},{"_id":"56f565c9a81b4e2d1c115008","combinedPoints":469,"combinedTotalRebounds":332,"combinedFreeThrowsMade":78,"combinedFreeThrowsAttempted":132,"combinedThreePointsMade":58,"combinedThreePointsAttempted":238,"combinedFieldGoalsMade":167,"combinedFieldGoalsAttempted":530,"combinedBlocks":10,"combinedSteals":62,"combinedAssists":82}];
  teamId = '56f565c9a81b4e2d1c11500c';

  // const COMBINED_STATS_MAP = {
  //   combinedPoints: {label: 'Field Goal %', weight: 1, suffix: 'FG%'},
  // };

  // TODO: We need Games Played Passed
  const currentTeam = _.find(combinedStats, {_id: teamId});




  /*
    Returns:
    {
      fieldGoalPercentage: { rank: 1, data: '48.7 FG%', label: 'Field Goal %', weight: 1 },
      PointsScored: { rank: 2, data: '45.5 PPG', label: 'Points Scored', weight: 1 },
      threePointPercentage: { rank: 3, data: '38.7 FG%', label: '3-point %', weight: 1 },
      totalRebounds: { rank: 4, data: '48.7 RPG', label: 'Total Rebounds', weight: 1 },
      freeThrowPercentage: { rank: 5, data: '48.7 FG%', label: 'Free Throw %', weight: .5 },
      totalBlocks: { rank: 6, data: '2.1 BPG', label: 'Total Blocks', weight: .5 },
      totalSteals: { rank: 7, data: '48.7 FG%', label: 'Total Steals', weight: .5 },
      totalAssists: { rank: 8, data: '12.5 APG', label: 'Total Assists', weight: .7 },
   */
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
