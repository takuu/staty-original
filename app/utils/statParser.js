import _ from 'lodash';

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

function shootingPercentage (made, attempted) {
  if (attempted === 0 || made === 0) return 0;
  let percentage = (made / attempted) * 100;
  return percentage.toFixed(1);
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
  });

  return board;
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
  createSchedule: createSchedule
};
