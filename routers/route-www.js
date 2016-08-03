
var express = require('express');

var router = express.Router();

var index = require('../middlewares/www/index');

router.get('/', index.home);
