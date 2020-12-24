const jwt = require("jsonwebtoken");

const encrypt = (payload) => {
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: "7d",
    });
};

const decrypt = (token) => {
    return jwt.decode(token, process.env.SECRET);
};

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}


module.exports = {
    encrypt,
    decrypt,
    asyncForEach,
}; 