const bookModel = require('../bookModel');
const { ObjectId} = require('mongodb');

exports.list = async () => {
     return await bookModel.find(function(err, resp){
        if (err) return handleError(err);
        return resp;
    }).lean();
};

exports.detail = async (id) => {
    return await bookModel.findOne({_id: ObjectId(id)}, function(err, resp){
        if (err) return handleError(err);
        return resp;
    }).lean();
}