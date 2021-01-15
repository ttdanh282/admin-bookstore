exports.index = (req, res, next) => {
    // Get books from model
    //const books = bookModel.list();
    // Pass data to view to display list of books
    if(req.user){
        res.render('index') ;
    }
    else
    res.redirect("/login");
};