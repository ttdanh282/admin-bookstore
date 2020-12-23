const bookModel = require('../bookModel');
var ketqua;
exports.list = async () => {
     return await bookModel.find(function(err, resp){
        if (err) return handleError(err);
        return resp;
    })
};
