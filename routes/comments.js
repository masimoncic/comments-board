const express = require('express');
const router = express.Router({mergeParams: true});
const comments = require('../controllers/comments');
const wrapAsync = require('../utils/wrapAsync');
const { validateComment, isLoggedIn, isCommentAuthor } = require('../middleware');


router.post('/', isLoggedIn, validateComment, wrapAsync(comments.createComment))

router.route('/:commentId')
    //.put(wrapAsync(comments.updateComment))
    .delete(isCommentAuthor, wrapAsync(comments.deleteComment));
module.exports = router;