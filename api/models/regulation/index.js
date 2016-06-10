'use strict';

var express = require('express');
var controller = require('./regulation.controller');

var router = express.Router();

router.get('/league/:id', controller.findByLeagueId);
router.get('/:id', controller.show);

module.exports = router;
