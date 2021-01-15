const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    avatar: String,
    email: String,
    address: String,
    phoneNumber: String,
    password: String,
    verified: Boolean,
    createdAt: Date,
    updatedAt: Date,
    blocked: Boolean
});
userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', userSchema );