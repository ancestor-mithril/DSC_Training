const { StatusCodes } = require("http-status-codes");
const { AuthorModel } = require("../models");

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

        if (dateOfDeath) {
            newAuthor.date_of_death = dateOfDeath;
        }

        await AuthorModel.create({
            name, 
            date_of_birth: dateOfBirth, 
            date_of_death: dateOfDeath,
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


module.exports = {
    create,
};