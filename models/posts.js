const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    title: String,
    content: String,
    author: String,
    comments: [],
})

module.exports = mongoose.model('Post', PostSchema);