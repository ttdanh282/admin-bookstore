var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController');
var indexController = require('../controllers/indexController');
router.get('/book', bookController.allbook);
router.get('/book/:id', bookController.bookdetail);
router.post('book/:id', bookController.updatebook);
router.get('/add',bookController.getaddbook);
router.post('/add',bookController.postaddbook);
router.get('/', indexController.index);
module.exports = router;
    