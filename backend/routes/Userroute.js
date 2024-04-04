const routes = require('express').Router();
const User = require('../models/usermodel');
const generatetoken = require('../util/tokenauth/generatetoken');
 const { checkAuth } =  require( '../util/tokenauth/auth');
//signup
routes.post('/signup' ,async(req,res,next)=>{
    const {name,email,password} = req.body;
    try {
        if(!name || name.split().length == 0 || !email || email.split().length == 0 || !email.indexOf("@") || !password || password.split().length == 0 || password.length<8){
            res.status(400).send("Invalid credential and paswword must be greter than eight");
            return;
        }
    const user = await User.create({name:name,Email:email,password:password});
    const userdata = user.toJson();
    res.json(userdata);
    } catch (e) {
        if(e.code == 11000) return res.status(400).send("email already existed");
        res.status(400).send(e.message);
    }
})
//login
routes.post('/login', async(req,res) =>{
    console.log("function call");
    try {
        const {Email,password}  = req.body;
        if( !Email || Email.split().length == 0 || !Email.indexOf("@") || !password || password.split().length == 0 || password.length<8){
            res.status(400).send("Invalid credential and paswword must be greter than eight");
            return;
        }
        console.log(Email, password)
        let user = await User.findbycredentials(Email,password);
        console.log(user);
        let id = (user._id);
        const token = generatetoken.token(id);   
        user = user.toJson();
        console.log(user);
        res.json({
            "user": user,
            "token": token
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//login with token 
routes.post("/logintoken" ,checkAuth);

//get users
routes.get('/',async(req,res,next)=>{
    try {
        const user = await User.find({isAdmin:false}).populate('Orders');
        res.json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports = routes;