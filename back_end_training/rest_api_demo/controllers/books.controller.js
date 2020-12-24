const { StatusCodes } = require("http-status-codes");
const { BookModel, AuthorModel } = require("../models");
const { asyncForEach } = require("../utils");

const create = async (req, res) => {
    try {
        const { title, authors, publishDate, price, stock } = req.body;

        let authorsId = Array();
        // console.log("authors", authors);

        for (let name of authors) {
            const author = await AuthorModel.findOne({
                name,
            });
            if (!author) {
                res.status(StatusCodes.CONFLICT).json({
                    success: false,
                    message: `An author with name ${name} doesn't exist`,
                });
                return;
            }
            authorsId.push(author._id);
        }
        // console.log(authorsId);

        const oldBook = await BookModel.findOne({
            title, 
            authors: authorsId,
        });

        if (oldBook) {
            res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: `a book with title ${title} and authors ${authors} already exists`,
            });
            return;
        }

        const bookId = await BookModel.create({
            title,
            authors: authorsId,
            publish_date: publishDate,
            price,
            stock,
        });

        // console.log(`book id: ${bookId}`);

        for (let authorId of authorsId) {
            var query = { '_id': authorsId };

            AuthorModel.findOneAndUpdate(
                query,
                { $push: { books: bookId  } },
                { upsert: false }, 
                function (err, doc) {
                    if (err) {
                        console.log(`Error: ${err}`);
                    } else {
                        console.log("Success");
                    }
                }
            );
        }

        return res.status(StatusCodes.CREATED).json({
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
}

const getBooks = async (req, res) => {
    try {
        let booksMap = {};
        //const all = await BookModel.find().populate({ path: 'authors', model: AuthorModel });
        await BookModel.find({}, async function (err, books) {
            try {
                await asyncForEach(books, async function (book) {
                    try {
                        await book.populate({ path: 'authors', model: AuthorModel }).execPopulate();
                        booksMap[book._id] = book;
                        throw new Error("ok");
                    }
                    catch (error) {
                        console.log(error);
                        throw new Error(error);
                    }
                });
                return res.status(StatusCodes.OK).json({
                    success: true,
                    booksMap,
                });

            } catch (error) {
                console.error(error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "something went wrong",
                });
            }
        });
        return;
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
}

module.exports = {
    create,
    getBooks,
};