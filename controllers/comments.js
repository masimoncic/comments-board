const Post = require('../models/posts');
const Comment = require('../models/comments');


module.exports.createComment = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    post.comments.push(comment);
    await comment.save();
    await post.save();
    req.flash('success', 'Comment Posted')
    res.redirect(`/posts/${post._id}`)
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, { $pull: {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Deleted Comment')
    res.redirect(`/posts/${id}`);

}

//module.exports.updateComment = async (req, res) => {
//    const commentId = req.params;
//}

