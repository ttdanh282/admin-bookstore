const bookModel = require('../bookModel');
const { ObjectId } = require('mongodb');
const categoryModel = require('../categoryModel');
const { bookdetail } = require('../../controllers/bookController');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'ttdanh282',
    api_key: '244482718551546',
    api_secret: '_MCtZLsUebVjr6sMxAOYld4_lto'
});

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
exports.putBook = async (book, id, image) => {
    let selectedBook = await bookModel.findOne({ _id: ObjectId(id) });
    await cloudinary.uploader.upload(image,
        {
            folder: "books",
        },
        function (error, result) {
            console.log(result)
            selectedBook.title = book.title;
            selectedBook.author = book.author;
            selectedBook.cover = result.url
            selectedBook.detail = book.detail
            selectedBook.basePrice = book.basePrice;
            selectedBook.category = new ObjectId(book.category)
            selectedBook.save(function (err) {
                if (err) return handleError(err);
                return "OKE NHA";
            })
        });
}

//Get book categories
exports.categories = async () => {
    return await categoryModel.find({}, function (err, resp) {
        if (err) return handleError(err);
        return resp;
    }).lean();
}

//Add new book
exports.postBook = async (book, image) => {
    await cloudinary.uploader.upload(image,
        {
            folder: "books",
        },
        function (error, result) {
            console.log(result)
            let newBook = new bookModel({
                _id: new ObjectId(),
                title: book.bookName,
                cover: result.url,
                basePrice: book.basePrice,
                detail: book.detail,
                author: book.author,
                category: ObjectId(book.category)
            })
            newBook.save(function (err) {
                if (err) return handleError(err);
                return "OKE NHA";
            })
        });
}

//Delete book
exports.deleteBook = async(bookId) => {
    return await bookModel.deleteOne({_id: ObjectId(bookId)}, function(err){
        if(err) return handleError(err);
        return "oke nha";
    })  
}