const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    verified: Boolean,
    createdAt: Date,
    updatedAt: Date
});
module.exports = mongoose.model('users', userSchema );