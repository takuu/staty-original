var express = require('express');
var User = require('../models/user/user.model');
var ObjectId = require('mongoose').Types.ObjectId;
var jwtToken = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  console.log('req.cookies: ', req.cookies);
  const { token } = req.cookies;
  if (!token) {
    res.status(200).send({not_logged_in: true});
    return;
  }
  const decode = jwtToken.decode(token);
  const {id, access_token} = decode || {};
  req.userId = id;
  req.access_token = access_token;
  next();
};

module.exports.isAuthenticated = isAuthenticated;
