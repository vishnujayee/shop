const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = (user) =>{
return jwt.sign(user,process.env.TOKEN_SECRET,{expiresIn:'180s'})
}
module.exports = token;