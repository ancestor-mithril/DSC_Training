const { StatusCodes } = require("http-status-codes");
const { AuthorModel } = require("../models");
const { BookModel } = require("../models");
const { asyncForEach } = require("../utils");

const create = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, dateOfBirth, dateOfDeath, nationality } = req.body;

        const oldAuthor = await AuthorModel.findOne({
            name,
        });

        if (oldAuthor) {
            res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: `an author with the same name already exists`,
            });
            return;
        }

        let newAuthor = {
            name, 
            date_of_birth: dateOfBirth, 
            nationality
        }

        await AuthorModel.create({
            name, 
            date_of_birth: dateOfBirth, 
            date_of_death: (dateOfDeath) ? dateOfDeath : undefined,
            nationality
        });

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


const getAuthors = async (req, res) => {
    try {
        let authorsMap = {};
        //const all = await AuthorModel.find().populate({ path: 'books', model: BookModel });
        await AuthorModel.find({}, async function (err, authors) {
            try {
                await asyncForEach(authors, async function (author) {
                    try {
                        await author.populate({ path: 'books', model: BookModel }).execPopulate();
                        authorsMap[author._id] = author;
                    } catch (error) {
                        throw new Error(error);
                    }
                });
                return res.status(StatusCodes.OK).json({
                    success: true,
                    authorsMap,
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


const getAuthor = async (req, res) => {
    try {
        const { authorId } = req.body;

        let author = await AuthorModel.findOne ({
            _id: authorId,
        });

        if (!author) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "author not found",
            });
            return;
        }

        author.populate({ path: 'books', model: BookModel }).execPopulate();
        
        return res.status(StatusCodes.OK).json({
            success: true,
            author,
        });
    }  catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }


}


module.exports = {
    create,
    getAuthors,
    getAuthor,
};