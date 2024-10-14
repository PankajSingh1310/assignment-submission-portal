const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({message: "Access denied"});

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(500).json({error});
    }
};

module.exports = isLoggedIn;