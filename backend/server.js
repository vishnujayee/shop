const express = require('express');
const userroute = require('./routes/Userroute');
const productroute = require('../backend/routes/productroutes');
const orderroute = require('./routes/orderroute');
const sellerroute = require("../backend/routes/seller_dahboard_routes");
require('./connecttion');
const cors = require('cors');
const app = express();

// Apply CORS middleware globally (this must be first!)
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

// Optional: Explicitly handle OPTIONS for all routes
app.options('*', cors());

app.listen(3000, () => {
    console.log("backend server started");
});