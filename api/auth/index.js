var express = require('express');
var User = require('../models/user/user.model');
var ObjectId = require('mongoose').Types.ObjectId;
var jwtToken = require('jsonwebtoken');
var fbConfig = require('../passport/fb.js');
import config from '../config';
var request = require('request');

function isAuthenticated (req, res, next) {
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

function generateToken (id, long_token) {
  const payload = { id, access_token: long_token };
  console.log('generating Token: ', id, long_token);
  return jwtToken.sign(payload, config.token.secret, {
    expiresInMinutes: config.token.expires
  });
}

function fetchFacebookAccessToken(req, res, next) {
  const { user } = req.body;

  if(!user) {
    res.status(200).send({insufficient_credentials: true});
  }
  let getTokenUrl = `https://graph.facebook.com/oauth/access_token?client_id=${fbConfig.appID}&client_secret=${fbConfig.appSecret}&grant_type=fb_exchange_token&fb_exchange_token=${user.accessToken}`;
  request(getTokenUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let [tokenString, expireString] = body.split('&');
      let [tokenKey, tokenValue] = tokenString && tokenString.split('=');
      req.long_token = tokenValue;
      console.log('reply from Facebook -> tokenValue: ', tokenValue);
      next();
    } else {
      console.log(body);
      console.log('getTokenURL: ', getTokenUrl);
      res.status(200).send({not_logged_in: true});
      return;
    }
  });
}

function fetchFacebookAccountInfo (req, res, next) {

  const { long_token } = req;
  let getAccountUrl = `https://graph.facebook.com/me/accounts?access_token=${long_token}`;
  request(getAccountUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('body: ', body);
      console.log('data: ', body && body.data);
      next();
    } else {
      console.log(body);
      res.status(200).send({not_logged_in: true});
      return;
    }
  });
}

module.exports.isAuthenticated = isAuthenticated;
module.exports.fetchFacebookAccessToken = fetchFacebookAccessToken;
module.exports.generateToken = generateToken;

