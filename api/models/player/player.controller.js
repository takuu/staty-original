/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /players              ->  index
 * POST    /players              ->  create
 * GET     /players/:id          ->  show
 * PUT     /players/:id          ->  update
 * DELETE  /players/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Player = require('./player.model.js');

// Get list of players
exports.index = function(req, res) {
  Player.find(req.query)
    .populate('team')
    .exec(function (err, players) {
    if(err) { return handleError(res, err); }
    res.status(200).send(players);
  });
};

// Get a single player
exports.show = function(req, res) {
  Player.findById(req.params.id, function (err, player) {
    if(err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    res.status(200).send(player);
  });
};

// Creates a new player in the DB.
exports.create = function(req, res) {
  Player.create(req.body, function(err, player) {
    if(err) { return handleError(res, err); }
    return res.json(201, player);
  });
};

// Updates an existing player in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Player.findById(req.params.id, function (err, player) {
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

// Search for a player
exports.search = function(req, res) {
  let keyword = req.query.q || 'Taku';
  var find = {'$text':{'$search':keyword}};
  var findScore = {'score':{'$meta':'textScore'}};
  var sort = {'score': {'$meta':'textScore'} };
  Player.find(find, findScore).sort(sort)
    .populate('team')
    .exec(function(err, players) {
    // do something with returned docs

    if(err) { return handleError(res, err); }
    res.status(200).send(players);
  });
};

function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
