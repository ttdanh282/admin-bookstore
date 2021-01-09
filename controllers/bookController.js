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
    console.log(bookDetail);
    res.render('book-detail/book-detail',{bookDetail});
 }

 //RENDER TEMPLATE ADD BOOK
 exports.getaddbook = async(req,res,next) =>{
     let categories = await bookService.categories();
     res.render('add-book/add-book',{categories});
 }

 //ADD BOOK TO SERSVER
 exports.postaddbook = async(req,res,next) =>{
    console.log(req);
    let addBook = await bookService.postBook(req.body);
    res.send(addBook);
}

//UPDATE BOOK TO SERVER
exports.updatebook = async(req,res,next) => {
    let updateBookDetail= await bookService.putBook(req.body);
    res.send(updateBookDetail);
}