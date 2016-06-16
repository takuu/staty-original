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
var auth = require('../../auth/index');
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

exports.getProfile = function (req, res) {
  const { userId } = req;
  console.log('getProfile');
  User.findById(userId)
    .populate('players')
    .populate({
      path: 'players',
      populate: { path: 'season', model: 'Season' }
    })
    .populate({
      path: 'players',
      populate: { path: 'team', model: 'Team' }
    })
    .populate({
      path: 'players',
      populate: { path: 'league', model: 'League' }
    })
    .exec(function (err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(404); }
      res.status(200).send(user);
    });
};

exports.getWatchList = function (req, res) {
  const { userId, access_token } = req;
  if (!userId) {
    res.status(200).send([]);
  } else {
    User.findById(userId)
      .populate('players')
      .populate({
        path: 'players',
        populate: { path: 'team', model: 'Team' }
      })
      .populate({
        path: 'players',
        populate: { path: 'season', model: 'Season' }
      })
      .populate({
        path: 'players',
        populate: { path: 'league', model: 'League' }
      })
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
  });
  console.log('addWatch', userId, players);

  User.findOneAndUpdate(
    {_id: ObjectId(userId)},
    {$addToSet: { players: {$each: playerList} }},
    {safe: true, upsert: true, new: true})
    .populate('players')
    .populate({
      path: 'players',
      populate: { path: 'team', model: 'Team' }
    })
    .populate({
      path: 'players',
      populate: { path: 'season', model: 'Season' }
    })
    .populate({
      path: 'players',
      populate: { path: 'league', model: 'League' }
    })
    .exec(function (err, user) {
      if (err) { return handleError(res, err); }
      res.status(200).send(user);
    });

};

exports.addFacebookUser = function (req, res) {
  const { user, players } = req.body;
  if (!user.id) invalidParams(res, 'addFaceBookUser');

  console.log('addFacebookUser', user);
  let newUser = new User({fb: user, players: players});
  // TODO: This needs to update the long-token when it's renewed
  /*User.findOneAndUpdate(
    {'fb.id': user.id},
    {$setOnInsert: newUser},
    {safe: true, upsert: true, new: true},
    function (err, raw) {
      if (err) { return handleError(res, err); }
      console.log('addFacebookUser update', raw);
      req.access_token = auth.generateToken(raw._id, req.long_token);
      res.status(200).send({token: req.access_token, user: raw});
    }
  );*/

  User.findOne({'fb.id': user.id})
    .populate('players')
    .exec(function (err, raw) {
      if (err) { return handleError(res, err); }
      if (raw) {
        // Found User
        req.access_token = auth.generateToken(raw._id, req.long_token);
        const {fb: {accessToken}} = raw;
        if (accessToken != req.long_token) {
          // Update Token
          console.log('Updating ', accessToken, req.long_token);
          raw.fb.accessToken = req.long_token;
          raw.save(function(err, obj) {
            console.log('updated User: ', obj);
            obj.populate('players', function (err) {
              res.status(200).send({token: req.access_token, user: obj});
            });
          });
        } else {
          // Same User, Same Token
          res.status(200).send({token: req.access_token, user: raw});
        }
      } else {
        // New User
        newUser.save(function (err, obj) {
          if (err) { return handleError(res, err); }
          console.log('new User: ', obj);
          req.access_token = auth.generateToken(obj._id, req.long_token);
          obj.populate('players', function (err) {
            res.status(200).send({token: req.access_token, user: obj});
          });

        });
      }
    });
};

exports.removeWatch = function (req, res) {
  const { userId } = req;
  const { playerId } = req.body;

  User.findOneAndUpdate(
    {_id: ObjectId(userId)},
    {$pullAll: {players: [ObjectId(playerId)]}},
    {safe: true, upsert: true, new: true})
    .populate('players')
    .populate({
      path: 'players',
      populate: { path: 'team', model: 'Team' }
    })
    .populate({
      path: 'players',
      populate: { path: 'season', model: 'Season' }
    })
    .populate({
      path: 'players',
      populate: { path: 'league', model: 'League' }
    })
    .exec(function (err, user) {
      if (err) { return handleError(res, err); }
      res.status(200).send(user);
    });
};

function invalidParams(res, name) {
  const msg = 'invalid params in ' + name;
  console.log(msg);
  return res.send(500, msg);
}

function handleError (res, err) {
  console.log('handleError');
  console.log(err);
  return res.send(500, err);
}
