const bookModel = require('../bookModel');
const { ObjectId } = require('mongodb');
const categoryModel = require('../categoryModel');
const { bookdetail } = require('../../controllers/bookController');

//Paginate
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

//Get book detail
exports.detail = async (id) => {
    return await bookModel
        .findOne({ _id: ObjectId(id) })
        .populate('category', function (err, resp) {
            if (err) return handleError(err);
            return resp;
        })
}

//Update book details
exports.putBook = async(book) => {
    let selectedBook =  await bookModel.findOne({ _id: ObjectId(book._id) });
    selectedBook.title = book.title;
    await selectedBook.save(function (err) {
        if (err) return handleError(err);
        return "OKE NHA";
    })
}

//Get book categories
exports.categories = async () => {
    return await categoryModel.find({}, function (err, resp) {
        if (err) return handleError(err);
        return resp;
    }).lean();
}

//Add new book
exports.postBook = async (book) => {
    let newBook = new bookModel({
        _id: new ObjectId(),
        title: book.bookName,
        basePrice: book.basePrice,
        detail: book.detail,
        author: book.author,
        category: ObjectId(book.category)
    })
    await newBook.save(function (err) {
        if (err) return handleError(err);
        return "OKE NHA";
    })
}