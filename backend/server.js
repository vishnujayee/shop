const express = require('express');
const userroute = require('./routes/Userroute')
const productroute = require('../backend/routes/productroutes');
const orderroute = require('./routes/orderroute');
const sellerroute = require("../backend/routes/seller_dahboard_routes");
// const stripe = require('stripe')('sk_test_51NvKPMSF19TMEUG52SRj4ed6mjPK2xGjD4spFLO7W8QTIs2pDVmtAh0HIvzpH4CTlc4ajDy3tJo24UUg1B3xneZB00VUzCD7Re');
require('./connecttion');
const cors = require('cors');
const app = express();
const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
app.use(cors(allowCors));
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