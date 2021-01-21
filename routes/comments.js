const express = require('express');
const router = express.Router({mergeParams: true});
const comments = require('../controllers/comments');
const wrapAsync = require('../utils/wrapAsync');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const ExpressError = require('../utils/ExpressError');
const { commentSchema } = require('../joiSchemas');
const { validateComment } = require('../middleware');


router.post('/', validateComment, wrapAsync(comments.createComment))

router.route('/:commentId')
    //.put(wrapAsync(comments.updateComment))
    .delete(wrapAsync(comments.deleteComment));
module.exports = router;