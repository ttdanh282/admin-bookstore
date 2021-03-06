const formidable = require('formidable');
const bookService = require('../models/services/bookService');
const mongoose = require('mongoose');

//GET ALL BOOK
exports.allbook = async (req, res, next) => {
    let paginateBooks =  await bookService.list(req.query.page, req.query.cateId ? {category:mongoose.Types.ObjectId(req.query.cateId)}: {});
    let bookCategories = await bookService.categories();
    let authors = await bookService.getAuthors();
    console.log(paginateBooks);
    res.render('books/book',{
        books: paginateBooks.docs,
        prevPage: paginateBooks.prevPage,
        nextPage: paginateBooks.nextPage,
        currentPage: paginateBooks.page,
        bookCategories,
        authors
    });
}

//GET BOOK DETAIL
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
            res.redirect("/book");
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
        try{
        bookService.putBook(fields, bookId, files.image.path).then((err,resp) => {
            res.redirect('/book');
        });
        }
        catch(error){
            res.status(error.response.status);
        }
    });
}

//DELETE BOOK
exports.deletebook = async(req,res,next) => {
    await bookService.deleteBook(req.params.id);
    res.redirect('/book');
}

//DELETE MULTIIPLE BOOKS
exports.deletemultiplebook = async(req,res,next) => {
    await bookService.deleteMultipleBooks(req.params.ids);
    res.send("Xoa nhieu oke");
}