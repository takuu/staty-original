/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /leagues              ->  index
 * POST    /leagues              ->  create
 * GET     /leagues/:id          ->  show
 * PUT     /leagues/:id          ->  update
 * DELETE  /leagues/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var League = require('./league.model');

// Get list of league
exports.index = function(req, res) {
  console.log('League index');
  League.find(function (err, leagues) {
    if(err) { return handleError(res, err); }
    res.status(200).send(leagues);
  });
};

// Get a single league
exports.show = function(req, res) {
  League.findById(req.params.id, function (err, league) {
    if(err) { return handleError(res, err); }
    if(!league) { return res.send(404); }
    res.status(200).send(league);
  });
};

// Creates a new league in the DB.
exports.create = function(req, res) {
  League.create(req.body, function(err, league) {
    if(err) { return handleError(res, err); }
    return res.json(201, league);
  });
};

// Updates an existing league in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  League.findById(req.params.id, function (err, league) {
    if (err) { return handleError(res, err); }
    if(!league) { return res.send(404); }
    var updated = _.merge(league, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, league);
    });
  });
};

// Deletes a league from the DB.
exports.destroy = function(req, res) {
  League.findById(req.params.id, function (err, league) {
    if(err) { return handleError(res, err); }
    if(!league) { return res.send(404); }
    league.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes a league from the DB.
exports.destroy = function(req, res) {
  League.findById(req.params.id, function (err, league) {
    if(err) { return handleError(res, err); }
    if(!league) { return res.send(404); }
    league.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.search = function(req, res) {
  League.findOne({name: req.query.name}).exec(function(err, league) {
    // do something with returned docs
    if(err) { return handleError(res, err); }
    res.status(200).send(league);
  });
};


function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
