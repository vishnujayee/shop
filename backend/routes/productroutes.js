const routes = require('express').Router();
const Product = require('../models/productmodel');
const User = require('../models/usermodel');
const mongoose = require("mongoose")
const types = mongoose.Types;
const ObjectId = types.ObjectId
let fs = require("node:fs");
//get all product
routes.get('/', async function (req, res) {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

//create product
routes.post('/new', async(req, res) => {
    try {
        const { name, description, price, category  , brandname , images} = req.body;
        // const p = await Product.create({ name, description, brandname, price, category });
        console.log(images)
        res.status(201).json("");
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//ubdateproduct
routes.patch('/:id', async (req, res) => {
    try {
        const id = req.params;
        const { name, description, price, category, subcategory, tags, images: pictures } = req.body;
        await Product.findbyidandubdate(id, { name, description, price, category, subcategory, tags, pictures });
        const product = Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//delete
routes.delete('/:id', async (req, res) => {
    const id = req.params;
    const { user_id } = req.body;
    try {
        const user = await User.finduserbyid(user_id);
        if (!user.isAdmin) return res.status(401).send("you dont have permission");
        await Product.findbyidanddelete(id);
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).send(e.message);
    }
})
//get product page
routes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const idd = new ObjectId(id);
    console.log(idd);
    try {
        const product = await Product.findById(idd);
        const similar = await Product.find({ category: product.category }).limit(10);
        res.status(200).json({ product, similar });
    } catch (error) {
        res.status(400).send(error.message);
    }
})
//get category wise product
routes.get('/category/:category', async (req, res) => {
    try {
        const category = req.params;
        let products;
        if (category == 'all') {
            products = await Product.find();
        } else {
            products = await Product.find({ category: category });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
//add to cart
routes.post('/add-to-cart', async (req, res) => {
    try {
        const { userid, productid, price } = req.body;
        const id = new ObjectId(userid);
        let users = await User.findById(id);
        if (users.cart.products[productid]) {
            users.cart.products[productid] += 1;
        } else {
            users.cart.products[productid] = 1;
        }
        users.cart.count += 1;
        users.cart.total = Number(users.cart.total) + Number(price);
        users.markModified('cart');
        let user;
        user = await users.save();
        user = users.toJson();
        // console.log(user);
        res.status(200).json({user});
    } catch (error) {
        res.status(400).send(error.message);
    }
})
//get cart
routes.post("/getcart" , async(req,res)=>{
    const {id} = req.body;
    console.log(id);
    try{
    const user = await User.findById(new ObjectId(id));
    if(!user) {
        return res.json(201).json("user not found");
    }
    let productsid = Object.keys(user.cart.products).map((id)=>new ObjectId(id));
    let dta = await Product.find({'_id':{$in:productsid}});
    console.log(dta);
    res.status(200).json('');}catch (e){
        res.status(201).jsoj({"error":e.message});
    }

})
//increse cart qty
routes.post('/increase-cart', async (req, res) => {
    const { userid, productid, price } = req.body;
    try {
        let users = await User.findById(new ObjectId(userid));
        users.cart.products[productid] += 1;
        users.cart.count += 1;
        users.cart.total += Number(price)
        users.markModified('cart');
        let user;
        user = await users.save();
        user = users.toJson();
        res.status(200).json({user});
    } catch (e) {
        res.status(400).send(e.message);
    }
})
routes.post('/decrease-cart', async (req, res) => {
    const { userid, productid, price } = req.body;
    try {
        let userdta = await User.findById(new ObjectId(userid));
        userdta.cart.products[productid] -= 1;
        userdta.cart.count -= 1;
        userdta.cart.total -= Number(price);
        userdta.markModified('cart');
        let user;
        user = await userdta.save();
        user = userdta.toJson();
        res.status(200).json({user});
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//remove from cart
routes.post('/remove-from-cart', async (req, res) => {
    const { userid, productid, price } = req.body;
    try {
        const users = await User.findById(userid);
        users.cart.total -= Number(users.cart.products[productid]) * Number(price);
        users.cart.count -= users.cart.products[productid];
        delete users.cart.products[productid];
        users.markModified('cart');
        let user  = await users.save();
        user = user.toJson();
        res.status(200).json({user});
    } catch (e) {
        res.status(400).send(e.message);
    }})
    module.exports = routes;