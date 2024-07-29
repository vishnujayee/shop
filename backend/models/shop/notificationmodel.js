let mongoose = require("mongoose");
let notification = new mongoose.Schema({
    userid:{type:mongoose.Types.ObjectId},
    usertype:{type:String},
    message:{type:String},
    isview:{type:Boolean},
});
let product_notify = new mongoose.Schema({
    productid:{type:mongoose.Types.ObjectId},
    sellerid:{type:mongoose.Types.ObjectId},
    waiting_user:{type:Array},
});
let notify = mongoose.model("notify", notification);
let productnotify = mongoose.model("product_notify",product_notify); 
module.exports = {
    notify,productnotify,
}