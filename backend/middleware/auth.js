require("dotenv").config();

const jwt = require("jsonwebtoken");
const errors = require("../messages/errors");
const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token;

    if (!token) {
        res.status(403).send({ payload: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        res.status(401).send({ payload: errors.authentication.tokenSign.failed });
    }
    next();
};

module.exports = verifyToken;