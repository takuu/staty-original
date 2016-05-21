/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /games              ->  index
 * POST    /games              ->  create
 * GET     /games/:id          ->  show
 * PUT     /games/:id          ->  update
 * DELETE  /games/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Game = require('./game.model.js');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of games

exports.index = function(req, res) {
  Game.find(function (err, games) {
    if(err) { return handleError(res, err); }
    res.status(200).send(games);
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id)
    .populate('homeTeam awayTeam league')
    .exec(function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    res.status(200).send(game);
  });
};

// Creates a new game in the DB.
exports.create = function(req, res) {
  let {homeTeam, homeScore, awayTeam, awayScore, division, season, league, time} = req.body;

  Game.count({homeTeam: ObjectId(homeTeam), homeScore: homeScore,
    awayTeam: ObjectId(awayTeam), awayScore: awayScore,
    division: ObjectId(division), season: ObjectId(season),
    league: ObjectId(league), time: time
  }, function(err, count) {
    if(err) { return handleError(res, err); }
    if (!count) {
      Game.create(req.body, function(err, game) {
        if(err) { return handleError(res, err); }
        return res.json(201, game);
      });
    }

  });


};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

// This query can be optimized...
exports.findByTeamId = function (req, res) {
  Game.find({$or: [{homeTeam:new ObjectId(req.params.id)},{awayTeam:new ObjectId(req.params.id)}]})
    .populate('homeTeam awayTeam league')
    .exec(function(err, games) {
      if (err) { return handleError(res, err); }
      res.status(200).send(games);
    });
};

exports.findByTeamList = function (req, res) {
  var {id} = req.query;
  var list = _.map(id.split(','), (item) => {
    return ObjectId(item);
  });
  if (list && list.length) {
    Game.find({ $or: [{'awayTeam': { $in: list }}, {'homeTeam': { $in: list }}] })
      .exec(function (err, games) {
        if (err) return handleError(res, err);
        res.status(200).send(games);
      });
  } else {
    res.status(200).send({});
  }
};

exports.findByDivisionId = function(req, res) {
  Game.find({division:new ObjectId(req.params.id)})
    .populate('homeTeam awayTeam')
    .exec(function(err, games) {
      if (err) { return handleError(res, err); }
      res.status(200).send(games);
    });
};


function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
