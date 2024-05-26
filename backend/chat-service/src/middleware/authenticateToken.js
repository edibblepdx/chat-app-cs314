require('dotenv').config
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) throw "no token found";
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = {
            email: decoded.email,
            _id: decoded.id,
            name: decoded.name
        };
        next();
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = authenticateToken;