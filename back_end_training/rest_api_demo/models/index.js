const UserModel = require("./user.model");
const BookModel = require("./book.model");
const AuthorModel = require("./author.model");
const TransactionModel = require("./transaction.model");

module.exports = {
    UserModel: UserModel.UserModel,
    BookModel: BookModel.BookModel,
    AuthorModel: AuthorModel.AuthorModel,
    TransactionModel: TransactionModel.TransactionModel,
};