const formidable = require('formidable');
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
    let categories = await bookService.categories();
    // console.log(bookDetail);
    console.log(categories);
    res.render('book-detail/book-detail',{bookDetail, categories});
 }

 //RENDER TEMPLATE ADD BOOK
 exports.getaddbook = async(req,res,next) =>{
     let categories = await bookService.categories();
     res.render('add-book/add-book',{categories});
 }

 //ADD BOOK TO SERSVER
exports.postaddbook = async (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        bookService.postBook(fields, files.image.path).then(() => {
            res.send("ok nha");
        });
    });
}

//UPDATE BOOK TO SERVER
exports.updatebook = async(req,res,next) => {
    let bookId = req.params.id;
    const form = formidable({ multiples: true });

     form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        bookService.putBook(fields, bookId, files.image.path).then(() => {
            res.send("ok nha");
        });
    });

    // let updateBookDetail= await bookService.putBook(req.body,req.params.id);
    // res.send(updateBookDetail);
}