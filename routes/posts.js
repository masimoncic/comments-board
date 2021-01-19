const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');


router.route('/')
    .get(posts.renderIndex)
    .post(posts.createPost)
router.get('/new', posts.renderNew);


router.get('/:id', posts.renderShow);


module.exports = router;