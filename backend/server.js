const express = require('express');
// const bodyParser = require('body-parser');
const userroute = require('./routes/Userroute')
const productroute = require('../backend/routes/productroutes');
const imagerouter = require('./routes/imageroute');
const orderroute = require('./routes/orderroute');
// const stripe = require('stripe')('sk_test_51NvKPMSF19TMEUG52SRj4ed6mjPK2xGjD4spFLO7W8QTIs2pDVmtAh0HIvzpH4CTlc4ajDy3tJo24UUg1B3xneZB00VUzCD7Re');


// const io = require('socket.io');
require('./connecttion');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
// app.use(JSON.parse());
app.use('/users', userroute);
app.use('/products', productroute);
app.use('/orders',orderroute);
app.use('/images',imagerouter);
app.listen(8080, () => {
    console.log("bacakend server started");
});