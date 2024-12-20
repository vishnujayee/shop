const express = require('express');
const userroute = require('./routes/Userroute')
const productroute = require('../backend/routes/productroutes');
const orderroute = require('./routes/orderroute');
const sellerroute = require("../backend/routes/seller_dahboard_routes");
// const stripe = require('stripe')('sk_test_51NvKPMSF19TMEUG52SRj4ed6mjPK2xGjD4spFLO7W8QTIs2pDVmtAh0HIvzpH4CTlc4ajDy3tJo24UUg1B3xneZB00VUzCD7Re');
require('./connecttion');
const cors = require('cors');
const app = express();
app.use(cors({
   origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(checkAuth);
app.get('/',(req,res)=>{
    return res.json("helo");
});
app.use('/users', userroute);
app.use('/products', productroute);
app.use('/orders',orderroute);
app.use('/seller',sellerroute);

app.listen(3000, () => {
    console.log("bacakend server started");
});