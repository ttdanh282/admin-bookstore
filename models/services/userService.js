const userModel = require('../userModel');
const { ObjectId } = require('mongodb');
var bcrypt = require('bcryptjs');


//Check user and password. Return user info if true 
exports.checkCredential = async (username, password) => {
    let user = await userModel.findOne({ email: username });
    if (!user)
        return false;
    let checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword)
        return user;
    return false;
}

exports.getUser = (id) => {
    return userModel.findOne({_id: id});
}

exports.list = async (pageNumber) => {
    let options = {
        page: pageNumber || 1,
        limit: 5,
    };
    return await userModel.paginate({}, options, function (err, resp) {
        if (err) return handleError(err);
        console.log(resp);
        return resp;
    })
};

//Get user detail
exports.detail = async (id) => {
    return await userModel
        .findOne({ _id: ObjectId(id) }, function (err, resp) {
            if (err) return handleError(err);
            return resp;
        })
}


//Block user 
exports.block = async (id) => {
    let selectedUser = await userModel.findOne({ _id: ObjectId(id) });
    selectedUser.blocked = !selectedUser.blocked;
    selectedUser.save();
}