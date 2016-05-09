/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /stats              ->  index
 * POST    /stats              ->  create
 * GET     /stats/:id          ->  show
 * PUT     /stats/:id          ->  update
 * DELETE  /stats/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Stat = require('./stat.model.js');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of stats
exports.index = function(req, res) {
  Stat.find(function (err, stats) {
    if(err) { return handleError(res, err); }
    res.status(200).send(stats);
  });
};

// Get a single stat
exports.show = function(req, res) {
  Stat.findById(req.params.id, function (err, stat) {
    if(err) { return handleError(res, err); }
    if(!stat) { return res.send(404); }
    res.status(200).send(stat);
  });
};

// Creates a new stat in the DB.
exports.create = function(req, res) {
  let {player, game} = req.body;
  Stat.count({player: ObjectId(player), game: ObjectId(game)}, function (err, count) {
    if (err) { return handleError(res, err); }
    if (!count) {
      Stat.create(req.body, function(err, stat) {
        if(err) { return handleError(res, err); }
        return res.json(201, stat);
      });
    }
  });

};

// Updates an existing stat in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stat.findById(req.params.id, function (err, stat) {
    if (err) { return handleError(res, err); }
    if(!stat) { return res.send(404); }
    var updated = _.merge(stat, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stat);
    });
  });
};

exports.getPlayerStats = function(req, res) {
  var id = req.params.id;
  Stat.find({player: id})
    .populate('vsTeam game')
    .exec(function(err, stats) {
    res.status(200).send(stats);
  });
};

exports.getPlayerListStats = function(req, res) {
  var {id} = req.query;
  var list = id.split(',');
  console.log('test: ', list);
  if (list && list.length) {
    Stat.find({'player': { $in: [list] }})
      .populate('division', 'name _id')
      .populate('league', 'name _id')
      .populate('season', 'name _id active')
      .populate('team vsTeam game player')
      .exec(function(err, stats) {
        if (err) return handleError(res, err);
        res.status(200).send(stats);
      });
  } else {
    res.status(200).send({});
  }
};

exports.getTeamStats = function(req, res) {
  var id = req.params.id;
  Stat.find({team: id})
    .populate('team vsTeam game player')
    .exec(function(err, stats) {
      res.status(200).send(stats);
    });
};


exports.getGameStats = function(req, res) {
  var id = req.params.id;
  Stat.find({game: id})
    .populate('player game')
    .exec(function(err, stats) {
    res.status(200).send(stats);
  });
};

function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
