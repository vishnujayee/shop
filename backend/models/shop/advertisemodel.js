const moongose = require("mongoose");
let banner_schema = moongose.Schema({
    sellerid:{type:moongose.Types.ObjectId},
    img:{type:String},
    productlink:{type:String},
    startindate:{type:Date},
    endingdate:{type:Date},
    isexpired:{type:Boolean},
    status:{type:Boolean},
    ischeckpending:{type:Boolean},
    clicks:{type:Number},
    buycount:{type:Number},
    views:{type:Number},
});
let page_banner_schema =moongose.Schema({
    sellerid:{type:moongose.Types.ObjectId},
    bannerimg:{type:String},
    shoplink:{type:String},
    product_ids:{
        type:Object,
    },
    isexpired:{type:Boolean},
    product_buy_ct:{type:Number},
    clicks:{type:Number},
    startindate:{type:Date},
    endingDate:{type:Date},
    status:{type:Boolean},
    ischeckpending:{type:Boolean},
    buycount:{type:Number},
    views:{type:Number},
});
let product_adv_schema = moongose.Schema({
    sellerid:{type:moongose.Types.ObjectId},
    productid:{type:moongose.Types.ObjectId},
    product_buy_ct:{type:Number},
    isexpired:{type:Boolean},
    clicks:{type:Number},
    buycount:{type:Number},
    startindate:{type:Date},
    endingdate:{type:Date},
    status:{type:Boolean},
    ischeckpending:{type:Boolean},
    views:{type:Number},
    category:{type:String},
    subcategory:{type:String},
});
let banner = moongose.model("banner_advertise", banner_schema);
let page_with_banner = moongose.model("pagebanner",page_banner_schema);
let product_adv = moongose.model("prouctadvertise" , product_adv_schema);
module.exports = {
    banner,page_with_banner,product_adv,
};