const userService = require('../models/services/userService');
const mongoose = require('mongoose');
const formidable = require('formidable');

//GET USER DETAIL
exports.userdetail = async (req, res, next) => {
    if (req.user) {
        let userDetail = await userService.detail(req.user.id);
        console.log(userDetail);
        res.render('account/account', { userDetail });
    }
    else
        res.redirect('/login');
}

//UPDATE BOOK TO SERVER
exports.updateuser = async(req,res,next) => {
    let userId = req.user.id;
    const form = formidable({ multiples: true });

     form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        userService.putUser(fields, userId, files.image.path).then((err,resp) => {
            res.redirect('/account');
        });
    });
}