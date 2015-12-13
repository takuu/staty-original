/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /seasons              ->  index
 * POST    /seasons              ->  create
 * GET     /seasons/:id          ->  show
 * PUT     /seasons/:id          ->  update
 * DELETE  /seasons/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Season = require('./season.model.js');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of seasons

exports.index = function(req, res) {
  console.log(req.query, 'query: ', req.query);
  Season.find(function (err, seasons) {
    if(err) { return handleError(res, err); }
    res.status(200).send(seasons);
  });
};

// Get a single season
exports.show = function(req, res) {
  Season.findById(req.params.id, function (err, season) {
    if(err) { return handleError(res, err); }
    if(!season) { return res.send(404); }
    res.status(200).send(season);
  });
};

// Creates a new season in the DB.
exports.create = function(req, res) {
  Season.create(req.body, function(err, season) {
    if(err) { return handleError(res, err); }
    return res.json(201, season);
  });
};

// Updates an existing season in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Season.findById(req.params.id, function (err, season) {
    if (err) { return handleError(res, err); }
    if(!season) { return res.send(404); }
    var updated = _.merge(season, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, season);
    });
  });
};


exports.findByLeagueId = function(req, res) {
  Season.find({league:new ObjectId(req.params.id), disabled: false})
    .exec(function(err, seasons) {
      if (err) { return handleError(res, err); }
      res.status(200).send(seasons);
    });
};

// Updates an existing season in the DB.
exports.disable = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Season.findById(req.params.id, function (err, season) {
    if (err) { return handleError(res, err); }
    if(!season) { return res.send(404); }
    //var updated = _.merge(season, req.body);
    season.disabled = true;
    season.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, season);
    });
  });
};

// Deletes a season from the DB.
exports.destroy = function(req, res) {
  Season.findById(req.params.id, function (err, season) {
    if(err) { return handleError(res, err); }
    if(!season) { return res.send(404); }
    season.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
