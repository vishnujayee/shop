const mongoose = require('mongoose');
let products = require("../product/productmodel");
let user = require("../user/usermodel");
const OrderSchema = new mongoose.Schema({
    products: {
        type: mongoose.Types.ObjectId,
        ref:products,
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: user,
        // required: true
    },
    status: {
        type: String,
        default:"processing",
    },
    // price:{Type:Number},
    total: {
        type: Number,
        default: 0
    },
    ownerstatus:{type:String},
    ownerstatusmessage:{type:String},
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
    sellerid:{type:mongoose.Types.ObjectId},
    is_coupoun_applied:{type:Boolean},
    coupounid:{type:mongoose.Schema.Types.ObjectId},
    discount_amount:{type:Number,
        default:0,
    },
    payment:{
        type:String,
    },
}, { minimize: false});

OrderSchema.methods.toJson = function() {
    let ord = this;
    ord = ord.toObject();
    return ord;
}
const Order = mongoose.model('Orders', OrderSchema);
module.exports = Order;