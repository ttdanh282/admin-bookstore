const mongoose = require('mongoose');
const URI = process.env.URI;
exports.connect_mongodb = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true});
    } catch (e) {
        console.error(e);
    }
}
