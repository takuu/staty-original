'use strict';

var express = require('express');
var controller = require('./division.controller');

var router = express.Router();

router.get('/active/:id', controller.getActiveDivisionsByLeagueId);
router.get('/season/:id', controller.findBySeasonId);
router.get('/league/:id', controller.findByLeagueId);
router.get('/leagueName/:name', controller.findByLeagueName);
// router.get('/leagueName2/:name', controller.findByLeagueName2);
router.get('/', controller.index);

router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
