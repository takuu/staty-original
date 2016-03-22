/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /teams              ->  index
 * POST    /teams              ->  create
 * GET     /teams/:id          ->  show
 * PUT     /teams/:id          ->  update
 * DELETE  /teams/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Team = require('./team.model.js');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of teams
exports.index = function(req, res) {
  Team.find(function (err, teams) {
    if(err) { return handleError(res, err); }
    res.status(200).send(teams);
  });
};

// Get a single team
exports.show = function(req, res) {
  Team.findById(req.params.id)
    .populate('division')
    .exec(function (err, team) {
      if (err) { return handleError(res, err); }
      if (!team) { return res.send(404); }
      res.status(200).send(team);
    });
};

// Creates a new team in the DB.
exports.create = function(req, res) {
  let {name, division, league} = req.body;
  Team.count({name: name, division: ObjectId(division), league: ObjectId(league)}, function (err, count) {
    if (err) { return handleError(res, err); }
    if (!count) {
      Team.create(req.body, function(err, team) {
        if(err) { return handleError(res, err); }
        return res.json(201, team);
      });
    }
  });

};

// Updates an existing team in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Team.findById(req.params.id, function (err, team) {
    if (err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    var updated = _.merge(team, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, team);
    });
  });
};

exports.list = function(req, res) {
  let idList = (req.query && req.query.q).split(',');
  Team.find({_id:{$in:idList}}, function(err, teams) {
    if (err) { return handleError(res, err); }
    res.status(200).send(teams);
  })
};

exports.findByLeagueId = function(req, res) {
  Team.find({league:new ObjectId(req.params.id)})
      .exec(function(err, teams) {
        if (err) { return handleError(res, err); }
        res.status(200).send(teams);
      });
};

exports.findByDivisionId = function(req, res) {
  Team.find({division:new ObjectId(req.params.id)})
    .populate('division')
    .exec(function(err, teams) {
      if (err) { return handleError(res, err); }
      res.status(200).send(teams);
    });
};

function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
