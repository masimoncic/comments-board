const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comments')

const PostSchema = new Schema ({
    title: String,
    content: String,
    author: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
})

PostSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Post', PostSchema);