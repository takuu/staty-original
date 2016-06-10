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
var Regulation = require('./regulation.model.js');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of regulations


// Get a single league
exports.show = function(req, res) {
  Regulation.findById(req.params.id, function (err, regulation) {
    if(err) { return handleError(res, err); }
    if(!regulation) { return res.send(404); }
    res.status(200).send(regulation);
  });
};

exports.findByLeagueId = function(req, res) {
  Regulation.find({league:new ObjectId(req.params.id), disabled: false})
    .exec(function(err, regulations) {
      if (err) { return handleError(res, err); }
      res.status(200).send(regulations);
    });
};

function handleError(res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
