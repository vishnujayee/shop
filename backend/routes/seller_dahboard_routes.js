const express = require("express");
const { default: mongoose } = require("mongoose");
const shop_total_stats = require("../models/seller/shopstatsmodel").shoptotalstats;
const shop_year_month_stats = require("../models/seller/shopstatsmodel").shoptime_stats;
const shop_day_stats = require("../models/seller/shopstatsmodel").daywisestatsshop;
const product_year_stats = require("../models/product/productstatsmodel").productyeardata;
const product_todat_stats = require("../models/product/productstatsmodel").producttodaydata;
const product_suscribe = require("../models/product/productstatsmodel").productsuscribe;
const product_tot_stats = require("../models/product/productstatsmodel").productstats;
let getmonth_from_month_number = require("../util/get_time_info");
const Product = require("../models/product/productmodel");
const Order = require("../models/user/ordermodel");
const seller = require("../models/seller/sellermodel");
const { productnotify } = require("../models/shop/notificationmodel");
const sellerrating = require("../models/seller/sellerrating");
let routes = express.Router(); 

routes.get("/:sellerid/dashboard_stats", async (req, res) => {
    try {
        let sellerid = new mongoose.Types.ObjectId(req.params.sellerid);
        if (!sellerid) {
            return res.status(400).json({
                iserror: true,
                error: "some error occured",
            })
        }
        let year = new Date().getUTCFullYear();
        let month = new Date().getUTCMonth();
        let day = new Date().getUTCDay();
        let thisyearsales = await shop_year_month_stats.findOne({ sellerid: sellerid, year: year });
        let todayinfo = await shop_day_stats.findOne({ sellerid: sellerid, year: year, month: month + 1, day: day });
        let pendingorders = await Order.find({ sellerid: sellerid, status: "order", payment: "done", ownerstatus: "pending" });
        let returnorders = await Order.find({ sellerid: sellerid, status: "return", payment: "done", ownerstatus: "return_pending" });
        let yearsellagg = await product_year_stats.aggregate([
            {
                $match: {
                    year: year,
                    sellerid:sellerid
                }
            },
            {
                $group: {
                    _id: "$product_id",
                    totalQtySold: { $sum: "$total_qty_sell_by_seller" }
                }
            },
            { $sort: { totalQtySold: -1 } },
            { $limit: 3 }
        ]);
        var sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        let weeklysellagg = await product_todat_stats.aggregate([
                {
                    $match: {
                        day: { $gte: sevenDaysAgo, $lte: new Date().getUTCDay() },
                        year:year,
                        month:month+1,
                        sellerid:sellerid,
                        
                    }
                },
                {
                    $group: {
                        _id: "$product_id",
                        totalQtySold: { $sum: "$total_qty_sell_by_seller" }
                    }
                    
                },
                { $sort: { totalQtySold: -1 } },
                {$limit:3},
            ]);
            let todaysellagg = await product_todat_stats.aggregate([
                {
                    $match:{
                        day:day,
                        year:year,
                        month:month+1,
                        sellerid:sellerid,
                    },
                },
                {$group:{
                        _id :"$product_id",
                        totalQtySold:{$sum:"$total_qty_sell_by_seller"}
                    }
                },
                    {$sort:{totalQtySold:-1}},
                    {$limit:3},
            ]);
        let monthname = getmonth_from_month_number.getmonth_from_month_number(month + 1);
        let rating = await sellerrating.findOne({_id:sellerid});
        // -----------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------
        // -------------------------------------------------------------------DashBoard_Data_list
        let yearnetsales = thisyearsales.net_sales ? thisyearsales.net_sales : 0;
        let monthsales = thisyearsales.month_wise_stats_sales[monthname];
        let monthnetsales = thisyearsales.month_wise_net_sales[monthname];
        let todaysales = todayinfo.sales;
        let todayorder = todayinfo.orders;
        let todaynetsales = todayinfo.netsales;
        let fullfiledorder = todayinfo.fullfilledorder;
        let shop_visit = todayinfo.shop_visit;
        let product_view = todayinfo.producview;
        let product_add_to_cart = todayinfo.productaddtocat;
        let pending_orders = pendingorders.length;
        let returnorder = returnorders.length;
        let highest_selling_product_this_year = yearsellagg;
        let highest_selling_product_this_week = weeklysellagg;
        let highest_selling_product_today = todaysellagg;
        let shoprating = rating.stars/rating.total_no_of_reviews;
        let rewies = rating.total_no_of_reviews;
        console.log(thisyearsales,todayinfo,pending_orders,returnorders,yearsellagg,todaysellagg,weeklysellagg,pendingorders);
        return res.status(200).json({
            iserror: false,
            data:{
                yearnetsales,monthsales,monthnetsales,todaysales,todayorder,todaynetsales,fullfiledorder,pending_orders,
                returnorder,highest_selling_product_this_year,highest_selling_product_this_week,highest_selling_product_today
            }
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
// top sales by age sales by catgeory
// product - > product wise sales and quantity-year me ketne bej chuke ha , total view product , total product added to cart , total checkout, toal product avaible to suscribe,
// total susriber suscribing product , top suscribed product , recurrent money , product wating list of users
routes.get("/:sellerid/all-stats" ,async(req,res)=>{
    try {
        let sellerid = new mongoose.Types.ObjectId(req.params.sellerid);
        let shop_stats = await shop_total_stats.findOne({
            sellerid:sellerid ,
        });
        let totsales = shop_stats.total_life_time_net_sales;
        let totalproductviews = shop_stats.total_product_view;
        let toaladdtocart = shop_stats.total_product_add_to_cart;
        let totorders = shop_stats.total_life_time_orders;
        let fulfill_order = shop_stats.total_life_time_fulfilled_orders;
        let shop_view = shop_stats.total_shop_visit;
        let product_avaible_to_sus = await product_suscribe.find({sellerid:sellerid,issuscribe:true}).count();
        let suscriberdata = await gettotsus(sellerid);
        let total_suscribers = suscriberdata[0].total_suscriber;
        let total_suscribe_rev = suscriberdata[0].total_revenu;
        let people_wating_for_stock = await gettotnotiers(sellerid)[0].totalwaiting;
        //year wise order sales net sales , unit sold  month wise inc in netsales order unit sold
        let yearwisesale = {};
        let yearwiseorder = {};
        let yearwisenetsales = {};
        let yeatwisefullfill = {};
        
        let i = 1;
        let yearstats = [];
        let year = new Date().getUTCFullYear;
        while(i++ >= 5) {
            yearstats.push(shop_year_month_stats.findOne({sellerid:sellerid ,year:year-i}));
        }
        yearstats = await Promise.all(yearstats).catch(e=>e);
        for(let st of yearstats) {
            if(!(st instanceof Error)) {
                let sale = st.total_sales_in_year;
                let netsale = st.net_sales;
                let order  =st.total_order_in_year
                let fulfillorder = st.total_fullfilled_order_in_year;
                yearwisenetsales[st.year] = netsale;
                yearwisesale[st.year] = sale;
                yearwiseorder[st.year] = order;
                yeatwisefullfill[st.year] = fulfill_order;
            }
        }
        let monthwisesale ;
        let monthwiseordr;
        let monthwisenetsales ;
        let monthwisefullfill;
        let thisyear = shop_year_month_stats.findOne({sellerid:sellerid, year:year});
        monthwisesale = thisyear.month_wise_stats_sales;
        monthwisenetsales = thisyear.month_wise_net_sales;
        monthwiseordr = thisyear.month_wise_stats_order;
        monthwisefullfill = thisyear.month_wise_fulfilled_order;
        return res.status(200).json("seller stats");
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
async function gettotnotiers(sellerid) {
    let totnot = await productnotify.aggregate([
        {
            $project: {
                sellerid: 1,
                waitingCount: { $size: "$waiting_user" }
            }
        },
            {
                $group:{
                    sellerid:sellerid,
                    totalwaiting:{$sum:"$waitingCount"},
                }
            },
            {
                $project: {
            _id: 0,
            sellerid: "$sellerid",
            totalwaiting: 1
        }
            }
        
    ]);
    return totnot;
}
async function gettotsus(sellerid) {
    let totsus = await product_suscribe.aggregate([
            {
                $match:{
                    sellerid:sellerid,
                    issuscribe:true,
                },
            },
            {
                $group:{
                    sellerid:sellerid,
                    total_suscriber:{$sum:"$total_sus"},
                    total_revenu:{$sum:"$recurrent_revenue"},
                }
            },
            {
                $project:{
                    sellerid:"$sellerid",
                    total_suscriber:1,
                    total_revenu:1,
                    
                }
            }
        
    ]);
    return totsus;
}

routes.get("/:sellerid/get-product-stats", getproducts);
async function getproducts() {
    let sellerid = new mongoose.Types.ObjectId(req.params.sellerid);
    let pageno = parseInt(req.query.page);
    pageno = (pageno == 0 || !pageno ? 1 : pageno);
    let pagesize = 10;
    let productyearqtyandprice = await product_year_stats.aggregate([
        {
            $match:{
                sellerid:sellerid,
                year:new Date().getUTCFullYear,
            }
    },
    {
        $lookup:{
            from:"products",
            localField:"product_id",
            foreignField:"_id",
            as:"productdetail",
        }
    },
    {
        $unwind:"$productdetail"
    },
    ,
    {
        $project:{
            total_qty_sell_by_seller:1,
            total_net_sale:1,
            poduct:"$productdetail",
        }
    },
    {
        $skip:(pageno-1)*pagesize,
    }
    ,{
        $limit:pagesize,
    }
    ]);
    
    return res.staus.json({
        iserror:false,
        products:productyearqtyandprice,
        // totalproducts:totproduct,
    })
};
async function getProductNumber(req,res) {
    let sellerid = new mongoose.Types.ObjectId(req.params.sellerid);
    let totproduct = await Product.find({sellerid:sellerid ,product_exist:true}).count();
    return res.status(200).json({
        iserror:'false',
    totalproducts:totproduct,
    })
}
routes.get("/:sellerid/product-count",getProductNumber);
routes.get("/:product/stats", async(req,res)=>{
    try {
        let productid = new mongoose.Types.ObjectId(req.params.product);
        let producttotinfo = await product_tot_stats.findOne({productid :productid});
        let product_all_views = producttotinfo.views;
        let people_save = producttotinfo.people_save;
        let tot_revenue = producttotinfo.total_revenue;
        let tot_qty_sell = producttotinfo.total_qty_sell;
        let issus = producttotinfo.issuscribe;
        if(issus) {
            let sus = await product_suscribe.findOne({productid:productid});
            let tot_sus =  sus.total_sus;
            let tot_sus_rev = sus.recurrent_revenue;
        }
        let today_product_data = await product_todat_stats.findOne({productid:productid , year:new Date().getUTCFullYear , month:new Date().getUTCMonth+1 ,day:new Date().getUTCDay});
        let today_view = today_product_data.views;
        let today_qty = today_product_data.total_qty_sell_by_seller;
        let today_sale = today_product_data.total_sale;
        if(issus) {
            let gainsus = today_product_data.total_sus;
            let lossses  = today_product_data.total_unsus;
        }
        let pyear = await product_year_stats.findOne({productid:productid,year:new Date().getUTCFullYear});
        let montwiseqty = pyear.monthly_wise_qty;
        let monthly_wise_sale = pyear.monthly_wise_sale;
        return res.status(200).json("product");
    } catch (error) {
        return res.status(400).send(error.message);
    }
})
module.exports = routes;