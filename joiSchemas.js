const Joi = require('joi');

module.exports.postSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().max(180).required(),
        content: Joi.string().required(),
    }).required(),
})

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        content: Joi.string().required(),
    }).required()
    
})

