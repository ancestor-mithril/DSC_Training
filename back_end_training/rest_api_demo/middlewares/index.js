const { decrypt } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const requireAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
            });
            return;
        }

        const claims = decrypt(token);

        req.user = claims;
        next();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

const requireAdmin = (req, res, next) => {
    try {
        // console.log(req.user);
        if (!req.user.isAdmin) {
            res.status(StatusCodes.FORBIDDEN).json({
                success: false,
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
}


const payloadValidation = (schema) => async (req, res, next) => {
    try {
        // console.log("body", req.body);
        const value = schema.validate(req.body);
        // console.log("value", value);
        if (value.error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: value.error.message,
            });
            return;
        }

        next();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

module.exports = {
    requireAuth,
    requireAdmin,
    payloadValidation,
};