'use strict';

var express = require('express');
var controller = require('./stat.controller');

var router = express.Router();

router.get('/player/:id', controller.getPlayerStats);
router.get('/game/:id', controller.getGameStats);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
