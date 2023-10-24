const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../../models/usermodel');
const checkAuth = (req, res, next ) => {
    const authheaders = req.headers.authorization;
    const token = authheaders && authheaders.split('')[1];
    if (token == null) return res.status(401).send("tokennull");
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send(err.message);
        req.user = user;
        next();

    })
}
module.exports = checkAuth;