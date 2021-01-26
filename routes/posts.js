const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const wrapAsync = require('../utils/wrapAsync');
const { validatePost, isLoggedIn, isAuthor } = require('../middleware');



router.route('/')
    .get(wrapAsync(posts.renderIndex))
    .post(isLoggedIn, validatePost, wrapAsync(posts.createPost))

router.get('/new', isLoggedIn, posts.renderNew);

router.route('/:id')
    .get(wrapAsync(posts.renderShow))
    .put(isLoggedIn, isAuthor, validatePost, wrapAsync(posts.editPost))
    .delete(isLoggedIn, isAuthor, wrapAsync(posts.deletePost))

router.get('/:id/edit', wrapAsync(posts.renderEdit))

module.exports = router;