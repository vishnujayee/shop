const express = require('express');
const userroute = require('./routes/Userroute');
const productroute = require('../backend/routes/productroutes');
const orderroute = require('./routes/orderroute');
const sellerroute = require("../backend/routes/seller_dahboard_routes");
require('./connecttion');
const cors = require('cors');
const app = express();

// Apply CORS middleware globally
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json("helo");
});

app.use('/users', userroute);
app.use('/products', productroute);
app.use('/orders', orderroute);
app.use('/seller', sellerroute);

// Allow all OPTIONS requests before any authentication
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.listen(3000, () => {
    console.log("backend server started");
});