const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    try {
        const token = jwt.sign({ email: user.email, id: user._id }, 'secretKey');
        return token;
    } catch (error) {
        console.error(error);
    }
};

module.exports = generateToken;