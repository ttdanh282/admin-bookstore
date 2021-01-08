const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    cover: String,
    basePrice: String,
    detail: String,
    category: [{type: Schema.Types.ObjectId, 
               ref: 'categories'}]
});

const categorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
});

mongoose.model('categories', categorySchema );
bookSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('books', bookSchema );