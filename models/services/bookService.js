const bookModel = require('../bookModel');
const { ObjectId} = require('mongodb');

exports.list = async (pageNumber) => {
    let options = {
        page: pageNumber || 1,
        limit: 5,
        populate: 'category',
        collation: {
          locale: 'en',
        },
      };
    return await bookModel.paginate({}, options, function (err, resp) {
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