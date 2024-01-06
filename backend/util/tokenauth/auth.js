const jwt = require('jsonwebtoken');
const User = require('../../models/usermodel');
const generatetoken = require("../tokenauth/generatetoken");
// var mongoose = require('mongoose');
require('dotenv').config();
const checkAuth = async (req, res, next ) => {
    const authheaders = (req.headers.authorization);
    const token = authheaders && authheaders.split(" ")[0];
    if (token == null) return res.status(401).send("tokennull");
    jwt.verify(token, process.env.TOKEN_SECRET,async(err, user) => {
        if (err) return res.status(403).send(err.message);
        const userid = user.ied;
        // var id = new mongoose.Types.ObjectId(userid);
        let checkuser = await User.findById(userid);
        if(!checkuser){
            return res.status(403).send("tokeninavlid");
        }
        checkuser = checkuser.toJson();
        console.log(checkuser);
        const token  = generatetoken.token(userid);
        res.json({
            "user":checkuser,
            "token":token
        })
        

    })
}
module.exports = {
    checkAuth
};