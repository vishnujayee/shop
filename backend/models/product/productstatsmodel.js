const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");
const productstatsschemeyear = new moongose.Schema({
    product_id:{type:moongose.Types.ObjectId},
    sellerid:{type:moongose.Types.ObjectId},
    total_qty_sell_by_seller:{type:Number},
    total_sale:{type:Number},
    total_net_sale:{type:Number},
    year:{type:Number},
    monthly_wise_qty:{
        type:Object,
            default:{
            january: {
                type: Number,
                default: 0,
            },
            febuary: {
                type: Number,
                default: 0,
            },
            march: {
                type: Number,
                default: 0,
            },
            april: {
                type: Number,
                default: 0,
            },
            may: {
                type: Number,
                default: 0,
            },
            june: {
                type: Number,
                default: 0,
            },
            july: {
                type: Number,
                default: 0,
            },
            august: {
                type: Number,
                default: 0,
            },
            sep: {
                type: Number,
                default: 0,
            },
            october: {
                type: Number,
                default: 0,
            },
            november: {
                type: Number,
                default: 0,
            },
            december: {
                type: Number,
                default: 0,
            },
            },
        },
            monthly_wise_sale:{
        type:Object,
            default:{
            january: {
                type: Number,
                default: 0,
            },
            febuary: {
                type: Number,
                default: 0,
            },
            march: {
                type: Number,
                default: 0,
            },
            april: {
                type: Number,
                default: 0,
            },
            may: {
                type: Number,
                default: 0,
            },
            june: {
                type: Number,
                default: 0,
            },
            july: {
                type: Number,
                default: 0,
            },
            august: {
                type: Number,
                default: 0,
            },
            sep: {
                type: Number,
                default: 0,
            },
            october: {
                type: Number,
                default: 0,
            },
            november: {
                type: Number,
                default: 0,
            },
            december: {
                type: Number,
                default: 0,
            },
            }},
        
})
const productstatsschemetoday = new moongose.Schema({
    product_id:{type:moongose.Types.ObjectId},
    total_qty_sell_by_seller:{type:Number,
        default:0,
    },
    total_sale:{type:Number},
    year:{type:Number},
    month:{type:Number},
    day:{type:Number},
    views:{type:Number},
    issuscribe:{type:Boolean},
    total_sus:{type:Number},
    total_unsus:{type:Number},
});
const productinfo = new moongose.Schema({
    productid:{type:moongose.Types.ObjectId},
    sellerid:{type:moongose.Types.ObjectId},
    views:{type:Number},
    time_added_to_cart:{type:Number},
    people_save:{type:Number},
    issuscribe:{type:Boolean},
    total_revenue:{type:Number},
    total_qty_sell:{type:Number},
});
const product_suscribe = new moongose.Schema({
    productid:{type:moongose.Types.ObjectId},
    sellerid:{type:mongoose.Types.ObjectId},
    issuscribe:{type:Boolean},
    suscribers:{type:Object},
    total_sus:{type:Number},
    recurrent_revenue:{type:Number},
});
const product_suscribe_time = new moongose.Schema({
    productid:{type:moongose.Types.ObjectId},
    sellerid:{type:mongoose.Types.ObjectId},
    year:{type:Number},
    issuscribe:{type:Boolean},
    total_sus:{type:Number},
    total_uns:{type:Number},
    recurrent_revenue:{type:Number},
});
const productyeardata = moongose.model("product_year_info",productstatsschemeyear);
// const productweeklydata = moongose.model("product_year_info",productstatsschemeweekly);
const producttodaydata = moongose.model("product_toay_info",productstatsschemetoday);
const productstats = moongose.model("product_stats",productinfo);
const productsuscribe = moongose.model("product_suscribe",product_suscribe);
const productsuscribeyear = moongose.model("product_suscribe_time",product_suscribe_time);
// const productsuscribeday = moongose.model("product_suscribe_time_day",product_suscribe_time_day);

module.exports = {
    productyeardata, producttodaydata, productstats,productsuscribe,productsuscribeyear 
}