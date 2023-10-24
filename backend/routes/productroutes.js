const routes = require('express').Router();
const Product = require('../models/productmodel');
const User = require('../models/usermodel');
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
routes.post('/', async function (req, res) {
    try {
        const { name, description, price, category, subcategory, tags, images: pictures } = req.body;
        await Product.create({ name, description, price, category, subcategory, tags, pictures });
        const products = Product.find();
        res.status(201).json(products);
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
    try {
        const product = await Product.findbyid(id);
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
        const user = await User.findbyid(userid);
        const usercart = user.cart;
        if (user.cart[productid]) {
            user.cart[productid] += 1;
        } else {
            user.cart[productid] = 1;
        }
        usercart.count += 1;
        usercart.total = Number(usercart.total) + Number(price);
        user.cart = usercart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
//increse cart qty
routes.post('/increase-cart', async (req, res) => {
    const { userid, productid, price } = req.body;
    try {
        const user = await User.findbyid(userid);
        const usercart = user.cart;
        user.cart[productid] += 1;
        usercart.count += 1;
        usercart.total += Number(price);
        user.cart = usercart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
routes.post('/decrease-cart', async (req, res) => {
    const { userid, productid, price } = req.body;
    try {
        const user = await User.findbyid(userid);
        const usercart = user.cart;
        user.cart[productid] -= 1;
        usercart.count -= 1;
        usercart.total -= Number(price);
        user.cart = usercart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//remove from cart
routes.post('/remove-from-cart', async (req, res) => {
    const { userId, productId, price } = req.body;
    try {
        const user = await User.findById(userId);
        const userCart = user.cart;
        userCart.total -= Number(userCart[productId]) * Number(price);
        userCart.count -= userCart[productId];
        delete userCart[productId];
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }})
    module.exports = routes;