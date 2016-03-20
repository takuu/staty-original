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
    let combined = combineStats(playerStats) || {};
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


    return result;
  });
  playerListSummary = _.orderBy(playerListSummary, (player) => {
    return (player.points) ? player.points / player.gameCount : 0;

  }, ['desc']);

  return playerListSummary;

}

function shootingPercentage (made, attempted) {
  if (attempted === 0 || made === 0) return 0;
  let percentage = (made / attempted) * 100;
  return helpers.roundDecimal(percentage, -1);
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
  shootingPercentage: shootingPercentage,
  createStandings: createStandings,
  createSchedule: createSchedule,
  playerListCummulativeStats: playerListCummulativeStats
};
