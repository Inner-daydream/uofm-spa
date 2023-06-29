const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = data;
        console.log('User is: ' + req.user)
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

};

module.exports = verifyToken;