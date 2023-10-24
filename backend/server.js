const express = require('express');
const userroute = require('./routes/Userroute')
const productroute = require('./models/productmodel');
const imagerouter = require('./routes/imageroute');
const orderroute = require('./routes/orderroute');
const stripe = require('stripe')('sk_test_51NvKPMSF19TMEUG52SRj4ed6mjPK2xGjD4spFLO7W8QTIs2pDVmtAh0HIvzpH4CTlc4ajDy3tJo24UUg1B3xneZB00VUzCD7Re');


const io = require('socket.io');
require('./connecttion');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users', userroute);
app.use('/products', productroute);
app.use('/images', imagerouter)
app.use('orders',orderroute);
app.post('/create-payment', async (req, res) => {
    const { amount } = req.body;
    try {
        const payment = await stripe.paymentIntent.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
        })
        res.status(200).json(payment);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})
app.listen(8080, () => {
    console.log("bacakend server started")
});