const bookService = require('../models/services/bookService');
exports.allbook = async (req, res, next) => {
    let books =  await bookService.list();
    console.dir(books);
    res.render('books/book',{books});
}
