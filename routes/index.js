var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController');
var indexController = require('../controllers/indexController');
var userController = require('../controllers/userController');
var accountController = require('../controllers/accountController');
var passport = require('../passport/passport');

router.get('/book', bookController.allbook);
router.get('/book/:id', bookController.bookdetail);
router.post('/book/:id', bookController.updatebook);
router.get('/book/:id/delete', bookController.deletebook);
router.get('/book/deletemultiple/:id',bookController.deletemultiplebook);
router.get('/add',bookController.getaddbook);
router.post('/add',bookController.postaddbook);
router.get('/', indexController.index);
router.get('/login',userController.login);
router.post('/auth/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/user',userController.alluser);
router.get('/user/:id', userController.userdetail);
router.get('/user/:id/block', userController.blockuser);

router.get('/account',accountController.userdetail);
router.post('/account',accountController.updateuser);
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });
module.exports = router;
    