'use strict';

var express = require('express');
var controller = require('./team.controller');

var router = express.Router();

router.get('/division/:id', controller.findByDivisionId);
router.get('/league/:id', controller.findByLeagueId);
router.get('/list', controller.list);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
