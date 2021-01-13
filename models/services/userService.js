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