const userModel = require('../userModel');
const { ObjectId } = require('mongodb');
var bcrypt = require('bcryptjs');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'ttdanh282',
    api_key: '244482718551546',
    api_secret: '_MCtZLsUebVjr6sMxAOYld4_lto'
});

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

//UPDATE USER 
exports.putUser = async (user, id, image) => {
    let selectedUser = await userModel.findOne({ _id: ObjectId(id) });
    await cloudinary.uploader.upload(image,
        {
            folder: "users",
        },
        function (error, result) {
            console.log(result)
            selectedUser.name = user.name;
            selectedUser.email = user.email;
            selectedUser.avatar = result.url
            selectedUser.address = user.address
            selectedUser.phoneNumber = user.phoneNumber;
            selectedUser.save(function (err) {
                if (err) return handleError(err);
                return "OKE NHA";
            })
        });
}

//Block user 
exports.block = async (id) => {
    let selectedUser = await userModel.findOne({ _id: ObjectId(id) });
    selectedUser.blocked = !selectedUser.blocked;
    selectedUser.save();
}