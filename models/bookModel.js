const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    title: String,
    cover: String,
    basePrice: String,
    detail: String,
    cate: String
});
module.exports = mongoose.model('books', bookSchema );