const routes = require('express').Router();
const User = require('../models/usermodel');
const generatetoken = require('../util/tokenauth/generatetoken');
const checkauth = require('../util/tokenauth/auth');
const token = require('../util/tokenauth/generatetoken');
//signup
routes.post('/signup' ,async(req,res,next)=>{
    const {name,email,password} = req.body;
    try {
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
    try {
        const {Email,password}  = req.body;
        console.log(Email, password)
        let user = await User.findbycredentials(Email,password);
        user = user.toJson()
        console.log(user)
        const token = generatetoken(user);        
        res.json({
            "user": user,
            "token": token
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
})
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