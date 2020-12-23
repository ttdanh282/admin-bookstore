var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController');
var indexController = require('../controllers/indexController');
router.get('/book', bookController.allbook);
router.get('/', indexController.index);
module.exports = router;
