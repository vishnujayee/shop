const moongose = require("mongoose");
const sellerSchema = moongose.Schema({
    seller_name:{type:String},
    Age:{type:String},
    shop_name:{type:String},
    Email:{type:String},
    phoneNumbers:{type:String},
    Address:{type:moongose.Types.ObjectId},
    // shop_stats:{Type:moongose.Schema.Types.ObjectId},
    tags_category_that_sell:{type:Array},
    password:{type:String},
    year:{type:Number},
    month:{type:Number},
    day:{type:Number},
});
const seller = new moongose.model("seller" , sellerSchema);
module.exports = seller;