const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = (id) =>{
    const ied = id;
return jwt.sign({ied},process.env.TOKEN_SECRET,{expiresIn:"2d"})
}
module.exports = {
    token
}