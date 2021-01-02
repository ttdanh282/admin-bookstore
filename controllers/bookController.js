const bookService = require('../models/services/bookService');
exports.allbook = async (req, res, next) => {
    let books =  await bookService.list();
    res.render('books/book',{books});
}

exports.bookdetail = async(req,res,next) => {
    let bookDetail = await bookService.detail(req.params.id);

    res.render('book-detail/book-detail',{bookDetail});
 }