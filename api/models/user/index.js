var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/:id', controller.show);

module.exports = router;
