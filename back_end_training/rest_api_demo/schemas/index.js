const Joi = require("joi");

const auth = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const author = Joi.object({
    name: Joi.string().regex(/^[ \-'a-zA-Z]*$/).min(3).max(30).required(),
    dateOfBirth: Joi.number().integer().min(-5000).max((new Date()).getFullYear()).required(),
    dateOfDeath: Joi.number().integer().min(-5000).max((new Date()).getFullYear()),
    nationality: Joi.string().regex(/^[a-z]*$/).min(2).max(2).required(),
});

const book = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    authors: Joi.array().items(
        Joi.string().regex(/^[ \-'a-zA-Z]*$/).min(3).max(30).required(),
    ).min(1).required(),
    publishDate: Joi.number().integer().min(0).max((new Date()).getFullYear()).required(),
    price: Joi.number().precision(2).min(0).required(),
    stock: Joi.number().integer().min(0).required(),
})

module.exports = {
    auth,
    author, 
    book,
};