/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /users              ->  index
 * POST    /users              ->  create
 * GET     /users/:id          ->  show
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('./user.model.js');
var ObjectId = require('mongoose').Types.ObjectId;


// Get a single team
exports.show = function(req, res) {
  User.findById(req.params.id)
    // .populate('division')
    .exec(function (err, team) {
      if (err) { return handleError(res, err); }
      if (!team) { return res.send(404); }
      res.status(200).send(team);
    });
};

