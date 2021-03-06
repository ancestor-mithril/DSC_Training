const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const auth = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const author = Joi.object({
    authorId: Joi.objectId(),
    name: Joi.string().regex(/^[ \-'a-zA-Z]*$/).min(3).max(30).required(),
    dateOfBirth: Joi.number().integer().min(-5000).max((new Date()).getFullYear()).required(),
    dateOfDeath: Joi.number().integer().min(-5000).max((new Date()).getFullYear()),
    nationality: Joi.string().regex(/^[a-z]*$/).min(2).max(2).required(),
});

const book = Joi.object({
    bookId: Joi.objectId(),
    title: Joi.string().min(2).max(30).required(),
    authors: Joi.array().items(
        Joi.string().regex(/^[ \-'a-zA-Z]*$/).min(3).max(30).required(),
    ).min(1).required(),
    publishDate: Joi.number().integer().min(0).max((new Date()).getFullYear()).required(),
    price: Joi.number().precision(2).min(0).required(),
    stock: Joi.number().integer().min(0).required(),
});

const user = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
});

const authorId = Joi.object({
    authorId: Joi.objectId().required(),
});

const bookId =  Joi.object({
    bookId: Joi.objectId().required(),
    noOfItems: Joi.number().integer().min(0),
});

const bookTitle = Joi.object({
    title: Joi.string().min(2).max(30).required(),
});

const authorName = Joi.object({
    name: Joi.string().regex(/^[ \-'a-zA-Z]*$/).min(3).max(30).required(),
});

module.exports = {
    auth,
    author,
    authorId,
    authorName,
    book,
    bookId,
    bookTitle,
    user,
};