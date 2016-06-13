/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /divisions              ->  index
 * POST    /divisions              ->  create
 * GET     /divisions/:id          ->  show
 * PUT     /divisions/:id          ->  update
 * DELETE  /divisions/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Division = require('./division.model.js');
var League = require('../../models/league/league.model.js');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of divisions
exports.index = function(req, res) {
  Division.find(function (err, divisions) {
    if(err) { return handleError(res, err); }
    res.status(200).send(divisions);
  });
};

// Get a single division
exports.show = function(req, res) {
  Division.findById(req.params.id)
    .populate('season')
    .exec(function (err, division) {
    if(err) { return handleError(res, err); }
    if(!division) { return res.send(404); }
    res.status(200).send(division);
  });
};

// Creates a new division in the DB.
exports.create = function(req, res) {
  let {league, season, name} = req.body;
  Division.count({league: ObjectId(league), season: ObjectId(season), name: name}, function (err, count) {
    if (err) { return handleError(res, err); }
    if (!count) {
      Division.create(req.body, function(err, division) {
        if(err) { return handleError(res, err); }
        return res.json(201, division);
      });
    }

  });

};

// Updates an existing division in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Division.findById(req.params.id, function (err, division) {
    if (err) { return handleError(res, err); }
    if(!division) { return res.send(404); }
    var updated = _.merge(division, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, division);
    });
  });
};

/*
 exports.findByTeamId = function(req, res) {
 Game.find({$or: [{homeTeam:new ObjectId(req.params.id)},{awayTeam:new ObjectId(req.params.id)}]})
 .populate('homeTeam awayTeam')
 .exec(function(err, games) {
 if (err) { return handleError(res, err); }
 res.status(200).send(games);
 });
 }
 */

exports.findBySeasonId = function(req, res) {
  Division.find({season:new ObjectId(req.params.id)})
    .exec(function(err, divisions) {
      if (err) { return handleError(res, err); }
      console.log('Division.findBySeasonId', divisions);
      res.status(200).send(divisions);
    });
};

exports.findByLeagueId = function(req, res) {
  Division.find({league:new ObjectId(req.params.id)})
    .populate('season')
    .exec(function(err, divisions) {
      if (err) { return handleError(res, err); }
      console.log('Division.findByLeagueId', divisions);
      res.status(200).send(divisions);
    });
};
exports.findByLeagueName = function(req, res) {
  League.findOne({name: req.params.name})
    .exec(function (err, league) {
      // console.log('found league: ', league);
      if (err) { return handleError(res, err); }
      if (league) {
        // console.log('found league: ', league);
        Division.find({league:league._id})
          .populate('season')
          .exec(function (err, divisions) {
            if (err) { return handleError(res, err); }
            // console.log('Division.findByLeagueId', divisions);
            res.status(200).send(divisions);
          });
      }
    });

};

/*
exports.findByLeagueName = function(req, res) {
  console.log(req.params.name);
  Division.find({})
    .populate('league', null, {name: {$in: [req.params.name]}})
    .populate('season')
    .exec(function(err, divisions) {
      if (err) { return handleError(res, err); }
      divisions = divisions.filter(function(division) {
        return division.league != null;
      });
      res.status(200).send(divisions);
    });
};
*/

exports.getActiveDivisionsByLeagueId = function(req, res) {
  Division.find({league: new ObjectId(req.params.id)})
    .populate({
      path: 'season',
      match: { active: { $eq: true}},
      select: 'name _id',
      options: { limit: 2}
    })
  .exec(function(err, divisions) {
      if (err) { return handleError(res, err); }
      res.status(200).send(divisions);
    });

};

function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}

