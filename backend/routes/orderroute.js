const routes = require('express').Router();
const { ObjectId } = require('mongodb');
const Order = require('../models/productmodel');
const User = require('../models/usermodel');
const Address = require('../models/addressmodel');
const Product = require("../models/productmodel");
//creating order for user
routes.post('/create_order/:ref',async(req,res)=>{
    const {userid} = req.body;
    const ref = req.params;
    try {
        let user = await User.findById(new ObjectId(userid));
        if(!user) {
            return res.status(400).json({"message":"user not found login to get your orders" , "pageshow":"login"});
        }
        let orders;
        const address = await Address.findById(user.address);
        if(!address) {
            return res.status(400).json({"message":"Enter your address" , "pageshow":"add_address_page"});
        }
        let order;
        switch(ref) {
            case"cart" :
            orders = await Order.create({owner:user._id,products:user.cart.products , total:user.cart.total , count:user.cart.count , address:user.address});
            order = await order.save();
            user.cart.total = 0 ;
            user.cart.count = 0;
            user.cart.products = {};
            user.markModified('cart');
            await user.save();
            res.status(200).json({"order":order});
            break;
            case "single_order":
                let {productid ,qty} = req.body;
                let products = {productid};
                const product = await Product.findById(new ObjectId(productid));
                if(!product) return res.status(400).json({"message" :"product not found" , "pageshow":"/allproducts"});
                orders = await Order.create({owner:user._id,products:products , total :Number(qty)*Number(product.price) , count:qty , address:user.address});
                order = await Order.save();
                res.status(200).json({"order":order});
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//get all order of user
routes.post("/getorders",async (req,res)=>{
    const {userid} = req.body;
    let orders;
    try {
        let user = await User.findById(new ObjectId(userid));
        if(!user) return res.status(404).json({"message":"user not found" , "pageshow":"login"});
        orders = await Order.find({userid:userid}).populate("Address");
        if(!orders) return res.status(404).json({"message":"order not found" , "pageshow":"orders not found"});
        res.status(200).json({orders});
    } catch (e) {
        res.status(201).json({"message":e.message});
    }
})
//filter order last me kruga
module.exports = routes;