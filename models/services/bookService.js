const bookModel = require('../bookModel');
const { ObjectId} = require('mongodb');
// const categoryModel = require('../categoyModel');

// exports.list = async () => {
//      return await bookModel.find(function(err, resp){
//         if (err) return handleError(err);
//         return resp;
//     }).lean();
// };

exports.list = async () => {
    return await bookModel
        .aggregate([{
            $lookup:
            {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        }], function(err, resp){
            if (err) return handleError(err);
            return resp;
        })
};

exports.detail = async (id) => {
    return await bookModel.findOne({_id: ObjectId(id)}, function(err, resp){
        if (err) return handleError(err);
        return resp; 
    }).lean();
}