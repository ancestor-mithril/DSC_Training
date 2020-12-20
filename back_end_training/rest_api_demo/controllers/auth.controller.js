const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models");
const { encrypt } = require("../utils");

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const oldUser = await UserModel.findOne({
            username,
        });

        if (oldUser) {
            res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: "user alredy exists",
            });
            return;
        }

        const hash = bcrypt.hashSync(password, 10);

        await UserModel.create({
            username,
            password: hash,
            admin: false
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
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({
            username,
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "user not found",
            });
        }

        const checkPassword = bcrypt.compareSync(password, user.password);

        if (!checkPassword) {
            res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: "password doesnt match",
            });
        }
        console.log("isAdmin", user.admin);
        const token = encrypt({
            userId: user._id,
            isAdmin: user.admin,
        });

        res.status(StatusCodes.OK).json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
};

module.exports = {
    register,
    login,
};