/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /schedules              ->  index
 * POST    /schedules              ->  create
 * GET     /schedules/:id          ->  show
 * PUT     /schedules/:id          ->  update
 * DELETE  /schedules/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Schedule = require('./schedule.model.js');

// Get list of players
exports.index = function(req, res) {
  Schedule.find(req.query, function (err, players) {
    if(err) { return handleError(res, err); }
    res.status(200).send(players);
  });
};

// Get a single player
exports.show = function(req, res) {
  Schedule.findById(req.params.id, function (err, player) {
    if(err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    res.status(200).send(player);
  });
};

// Creates a new player in the DB.
exports.create = function(req, res) {
  Schedule.create(req.body, function(err, player) {
    if(err) { return handleError(res, err); }
    return res.json(201, player);
  });
};

// Updates an existing player in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Schedule.findById(req.params.id, function (err, player) {
    if (err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    var updated = _.merge(player, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, player);
    });
  });
};
// Deletes a player from the DB.
exports.destroy = function(req, res) {

};

function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
