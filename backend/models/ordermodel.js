const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
    products: {
        type: Object
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    status: {
        type: String,
        default: 'processing'
    },
    total: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    payment:{
        type:String,
        default:"Pending"
    },
}, { minimize: false });

const Order = mongoose.model('Orders', OrderSchema);
module.exports = Order;