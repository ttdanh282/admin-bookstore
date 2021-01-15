const userService = require('../models/services/userService');
const mongoose = require('mongoose');

//GET ALL USER
exports.alluser = async (req, res, next) => {
    let paginateUsers =  await userService.list(req.query.page);
    console.log(paginateUsers);
    res.render('user/user',{
        users: paginateUsers.docs,
        prevPage: paginateUsers.prevPage,
        nextPage: paginateUsers.nextPage,
        currentPage: paginateUsers.page,
    });
}

//GET USER DETAIL
exports.userdetail = async(req,res,next) => {
    let userDetail = await userService.detail(req.params.id);
    console.log(userDetail);
    res.render('user-detail/user-detail',{userDetail});
 }


 //BLOCK/UNLOCK USER
 exports.blockuser = async(req,res,next) => {
    await userService.block(req.params.id);
    res.redirect('/user');
 }

exports.login = function(req,res,next) {
    res.render('login/login');
}

