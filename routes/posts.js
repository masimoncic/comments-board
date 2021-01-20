const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');


router.route('/')
    .get(posts.renderIndex)
    .post(posts.createPost)

router.get('/new', posts.renderNew);

router.route('/:id')
    .get(posts.renderShow)
    .put(posts.editPost)
    .delete(posts.deletePost)

router.get('/:id/edit', posts.renderEdit)

module.exports = router;