const routes = require('express').Router();
const Order = require('../models/productmodel');
const User = require('../models/usermodel');
//creating order
routes.post('/',async(req,res)=>{
    const {userid , cart ,country ,address} = req.body;
    try {
        const user = await User.findById(userid);
        const order = await Order.create({owner:user._id,address:address,country:country,products:cart});
        order.total = cart.total;
        order.count = cart.count;
        await order.save();
        user.cart = {total:0 ,count:0};
        user.order.push(order);
        user.markModified('orders');
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//get all orders
routes.get('/',async(req,res)=>{
    try {
    const order = await Order.find().populate('owner',['email','name']);
    res.status(200).json(order);
    } catch (error) {
        res.status(400).send(e.message);
    }
    
})
//ship the order
routes.patch('/:id/mark-shipped',async(req,res)=>{
    const {ownerid} = req.body;
    const {id} = req.params;
    try {
        const user = await User.findById(ownerid);
        await Order.findByIdAndUpdate(id,{status:'shipped'});
        await Order.save();
        const order = await Order.find().populate('owner',['email','name']);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).send(error.message);
    } 
})
module.exports = routes;