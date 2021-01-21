const methodOverride = require('method-override')
const Post = require('../models/posts')

module.exports.renderIndex = async (req, res) => {
    const posts = await Post.find({});
    console.log(posts);
    res.render('posts/index', { posts });
}

module.exports.renderNew = (req, res) => {
    res.render('posts/new');
}

module.exports.renderShow = async(req, res) => {
    const post = await Post.findById(req.params.id).populate('comments');
    res.render('posts/show', { post });
}

module.exports.renderEdit = async(req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('posts/edit', { post });
}

module.exports.createPost = async(req, res) => {
    const post = new Post(req.body.post);
    await post.save();
    console.log(post)
    res.redirect(`/posts/${post.id}`);
}

module.exports.editPost = async(req, res) => {
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, {...req.body.post});
    res.redirect(`/posts/${post.id}`);
}

module.exports.deletePost = async(req, res) => {
    const id = req.params.id
    await Post.findByIdAndDelete(id);
    res.redirect('/posts')
}