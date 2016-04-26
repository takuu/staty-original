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
exports.show = function (req, res) {
  console.log('users/:id');
  User.findById(req.params.id)
    // .populate('division')
    .exec(function (err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(404); }
      res.status(200).send(user);
    });
};

exports.getWatchList = function (req, res) {
  const { userId, access_token } = req;
  console.log('I HOPE!!', userId, access_token);
  if (!userId){
    res.status(200).send([]);
  } else {
    User.findById(userId)
      .populate('players')
      .exec(function (err, user) {
        if (err) { return handleError(res, err); }
        if (!user) { return res.send(404); }
        res.status(200).send(user);
      });
  }

};

exports.addWatch = function (req, res) {
  const { userId } = req;
  const { players } = req.body;

  const playerList = _.map(players, (player) => {
    return ObjectId(player);
  })

  User.findOneAndUpdate(
    {_id: ObjectId(userId)},
    {$addToSet: { players: {$each: playerList} }},
    {safe: true, upsert: true, new: true},
    function (err, user) {
      if (err) { return handleError(res, err); }
      res.status(200).send(user);
    }
  );
};

exports.removeWatch = function (req, res) {
  const { userId } = req;
  const { playerId } = req.body;

  User.findOneAndUpdate(
    {_id: ObjectId(userId)},
    {$pullAll: {players: [ObjectId(playerId)]}},
    {safe: true, upsert: true, new: true},
    function (err, user) {
      if (err) { return handleError(res, err); }
      res.status(200).send(user);
    }
  );
};

function handleError (res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
