const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../models");

const getUser = async (req, res) => {
    try {
        const { username } = req.user;

        const user = await UserModel.findOne({
            username,
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "user not found",
            });
            return;
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
};

const getUsers = async (req, res) => {
    try {
        let userMap = {};
        await UserModel.find({}, function (err, users) {
            users.forEach(function (user) {
                userMap[user._id] = user;
            });
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            userMap,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
};

const makeAdmin = async (req, res) => {
    try {
        const { username } = req.user;

        await UserModel.findOneAndUpdate(
            username,
            {$set: { admin: true }},
            { upsert: false }, 
            function (err, doc) {
                if (err) {
                    console.log(`Error: ${err}`);
                } else {
                    console.log("Success");
                }
            }
        );

        return res.status(StatusCodes.OK).json({
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

const deleteUser = async (req, res) => {
    try {
        const { username } = req.user;
        await UserModel.deleteOne(
            username,
        );
        return res.status(StatusCodes.OK).json({
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
    getUser,
    getUsers,
    makeAdmin,
    deleteUser,
};