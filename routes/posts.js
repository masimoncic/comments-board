const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const wrapAsync = require('../utils/wrapAsync');
const { validatePost, isLoggedIn } = require('../middleware');



router.route('/')
    .get(wrapAsync(posts.renderIndex))
    .post(isLoggedIn, validatePost, wrapAsync(posts.createPost))

router.get('/new', isLoggedIn, posts.renderNew);

router.route('/:id')
    .get(wrapAsync(posts.renderShow))
    .put(validatePost, wrapAsync(posts.editPost))
    .delete(wrapAsync(posts.deletePost))

router.get('/:id/edit', wrapAsync(posts.renderEdit))

module.exports = router;