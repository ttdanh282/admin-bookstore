const bookModel = require('../bookModel');
exports.list = async () => {
     return await bookModel.find(function(err, resp){
        if (err) return handleError(err);
        return resp;
    }).lean();
};
