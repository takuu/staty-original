var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/index');

var router = express.Router();

router.get('/watchlist', auth.isAuthenticated, controller.getWatchList);
router.put('/addwatch/:id', auth.isAuthenticated, controller.addWatch);
router.put('/removewatch/:id', auth.isAuthenticated, controller.removeWatch);

router.get('/:id', controller.show);

module.exports = router;
