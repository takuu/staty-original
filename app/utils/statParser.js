import _ from 'lodash';

function combineList(list=[]) {

  let clone = _.clone(list, true);

  let cummulativeStats = _.reduce(clone, (total, stat) => {
    _.map(Object.keys(stat), (key) => {
      total[key] = total[key] + stat[key];
    });
    return total;
  });
  return cummulativeStats;
}

function shootingPercentage(made, attempted) {
  if(attempted == 0 || made == 0) return 0;
  let percentage = (made/attempted) * 100;
  return percentage.toFixed(1)
}

function createStandings(games=[]) {
  let cloned = _.clone(games, true);
  let finishedGames = _.filter(cloned, {isUpdated: true});
  /*
   {
   'Midlife Crisis': {win: 2,lose: 3,name: 'Midlife Crisis, id: '567abc'}
   }
   */

  let board = {};
  _.map(finishedGames, (game)=> {
    board[game.homeTeam.name] = board[game.homeTeam.name] ||
      {win: 0, loss: 0, name: game.homeTeam.name, id: game.homeTeam._id};
    board[game.awayTeam.name] = board[game.awayTeam.name] ||
      {win: 0, loss: 0, name: game.awayTeam.name, id: game.awayTeam._id};

    if(game.homeScore > game.awayScore) {
      board[game.homeTeam.name].win++;
      board[game.awayTeam.name].loss++;
    } else {
      board[game.homeTeam.name].loss++;
      board[game.awayTeam.name].win++;
    }
  });

  return board;

}

function createSchedule(games=[]) {
  let cloned = _.clone(games, true);
  let unplayedGames = _.filter(cloned, {isUpdated: false});

  _.map(unplayedGames, (game) => {
    let date = new Date(game.date);
    game.prettyDate = date.toDateString();
  });

  return _.groupBy(unplayedGames, 'prettyDate');
}

export default {
  combineListofStats: combineList,
  pluckThenCombineStats: _.compose(combineList, _.pluck),
  shootingPercentage: shootingPercentage,
  createStandings: createStandings,
  createSchedule: createSchedule
}
