const { postSchema, commentSchema } = require('./joiSchemas');
const ExpressError = require('./utils/ExpressError');

module.exports.validatePost= (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in.')
        return res.redirect('/users/login');
    }
    next();
}