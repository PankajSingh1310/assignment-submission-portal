const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    try {
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
        return token;
    } catch (error) {
        console.error(error);
    }
};

module.exports = generateToken;