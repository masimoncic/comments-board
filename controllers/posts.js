const Post = require('../models/posts')

module.exports.renderIndex = async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', { posts });
}

module.exports.renderNew = (req, res) => {
    res.render('posts/new');
}

module.exports.renderShow = async(req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('posts/show', { post });
}

module.exports.createPost = async(req, res) => {
    const post = new Post(req.body.post);
    await post.save();
    console.log(post)
    res.redirect(`/posts/${post.id}`);
}