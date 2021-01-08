const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
});
module.exports = mongoose.model('categories', categorySchema );