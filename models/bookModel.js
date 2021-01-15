const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
require('./categoryModel');

const Schema = mongoose.Schema;
const bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    cover: String,
    basePrice: Number,
    detail: String,
    author: String,
    category: {type: Schema.Types.ObjectId, 
               ref: 'categories'}
});
bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('books', bookSchema );