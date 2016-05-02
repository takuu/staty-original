var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/index');

var router = express.Router();

router.get('/watchlist', auth.isAuthenticated, controller.getWatchList);
router.put('/addwatch', auth.isAuthenticated, controller.addWatch);
router.put('/removewatch', auth.isAuthenticated, controller.removeWatch);
router.put('/addFacebookUser', auth.fetchFacebookAccessToken, controller.addFacebookUser);
router.get('/profile', auth.isAuthenticated, controller.getProfile);

router.get('/:id', controller.show);

module.exports = router;
