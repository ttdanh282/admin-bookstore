const bookService = require('../models/services/bookService');
exports.allbook = async (req, res, next) => {
    let paginateBooks =  await bookService.list(req.query.page);
    console.log(paginateBooks);
    res.render('books/book',{
        books: paginateBooks.docs,
        prevPage: paginateBooks.prevPage,
        nextPage: paginateBooks.nextPage,
        currentPage: paginateBooks.page
    });
}

exports.bookdetail = async(req,res,next) => {
    let bookDetail = await bookService.detail(req.params.id);
    res.render('book-detail/book-detail',{bookDetail});
 }