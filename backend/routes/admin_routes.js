const { default: mongoose } = require('mongoose');
const shop = require('../models/seller/shopstatsmodel').daywisestatsshop;

const routes = require('express').Router();
let category = require("../models/shop/categorymodel").category;
let subcategory = require("../models/shop/categorymodel").subcategory;
let attributes =  require("../models/shop/filter_model").attribute;
let categoryfilter =  require("../models/shop/filter_model").category_filter;
let subcategoryfilter =  require("../models/shop/filter_model").subcategory_filter;
let adminstats = require("../models/admin/adminstatsmodel").adminstats;
let admintodaystats = require("../models/admin/adminstatsmodel").daystatsshop;
let admintimestats = require("../models/admin/adminstatsmodel").timestatsshop;
let admin = require("../models/admin/adminstatsmodel").admin;
let productstatssuscribe = require("../models/product/productstatsmodel").productsuscribe;
let productstats = require("../models/product/productstatsmodel").producttodaydata;


// send mail , crete filter and catgeory


routes.get("/:admnid/shop-stats" , async(req,res)=>{
    try {
        let adminid = new mongoose.Types.ObjectId(req.params.adminid);
        let isadmin  = await admin.findOne({adminid:adminid});
        if(!isadmin) {
            return res.status(400).json("error");
        };
        let admintotstats = await adminstats.findOne({admin:1,});
        let totusers = admintotstats.total_users;
        let totbuyers = admintotstats.total_buyers;
        let totsellers = admintotstats.total_sellers;
        let totproducts = admintotstats.total_product_on_board;
        let totrevnue = admintotstats.total_life_time_revenue;
        let totorders = admintotstats.total_life_time_orders;
        //today stats 
        let admintoday = await admintodaystats.findOne({admin:1, year:new Date().getUTCFullYear , month:new Date().getUTCMonth+1, day:new Date().getUTCDate});
        let totday_new_user = admintoday.total_user_created;
        let total_orders = admintoday.total_order;
        let total_sale = admintoday.total_sale;
        let total_return = admintoday.total_return;
        let total_cancel = admintoday.total_cancel;
        let total_new_buyers = admintoday.total_buyer;
        let total_new_sellers = admintoday.total_seller;
        let total_new_products = admintoday.total_product_added;
        //
        let i = 1;
        let yearstats = [];
        while(i++ <= 12) {
            yearstats.push(admintimestats.findOne({admin:1 ,year:new Date().getUTCFullYear ,month:i}));
        }
        yearstats = await Promise.all(yearstats);
        yearstats = yearstats.filter((e)=>!(e instanceof Error));
        //
        let top_selling_product_today = await gettopproducts();
        //top seller top catgeory ,top viewed product
        let top_seller = await gettopsellers();
        return res.status(200).json("hehe");
} catch (error) {
        return res.status(400).send(error.message);
    }
})
async function gettopsellers() {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth + 1; // Months are 0-indexed in JavaScript Date
    const currentDay = currentDate.getUTCDate();
    let sellers  = await shop.aggregate([
        {
            $match:{
                year: currentYear,
                month: currentMonth,
                day: currentDay,
            },
        },
        {
            $group: {
                _id: "$sellerid",
                totalsale: { $sum: "$sales" }
            }
        },
        {
            $sort:{totalsale:-1},
        },
        {
            $limit:5,
        },
        {
            $lookup:{
                from:"seller",
                localField:"sellerid",
                foreignField:"_id",
                as:"seller",
            }
        },
        {
            $unwind:"$seller"
        },
        {
            $project:{
                sellerid:1,
                totalsale:1,
                seller:1,
            }
        }
    ]);
    return sellers;
}
async function gettopproducts() {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth + 1; // Months are 0-indexed in JavaScript Date
    const currentDay = currentDate.getUTCDate();
    
    let products = await productstats.aggregate([
        {
            $match: {
                year: currentYear,
                month: currentMonth,
                day: currentDay
            }
        },
        {
            $group: {
                _id: "$product_id",
                totalQtySold: { $sum: "$total_qty_sell_by_seller" }
            }
        },
        {
            $sort: {
                totalQtySold: -1
            }
        },
        {
            $limit: 5
        },
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $project: {
                _id: 0,
                productid: "$product_id",
                totalQtySold: 1,
                productDetails: 1
            }
        }
    ]);
    return products;
}


routes.post("/create-category",async(req,res)=>{
    try {
        let adminid = new moongose.Types.ObjectId(req.body.user);
        let categoryname = req.body.category;
        let iscategory = await category.findOne({category_name:categoryname});
        let subcatgeorynames = req.body.subcategory;
        if(iscategory) {
            for(let sb  in subcatgeorynames) {
                let sub = await subcategory.findOne({parent_category_name:categoryname ,subcatgegory_name:sb});
                if(!sub) {
                    await subcategory.create({parent_category_name:category , subcatgegory_name:sb, isuse:false,status:"subcategory"});
                } 
            }
        }else {
            await category.create({parent_category_name:category ,status:"category"});
        }
        return res.json("done");
    } catch (error) {
        return res.send(error.message);
    }
});
rouets.get("/:category/attributes",async(req,res)=>{
    try {
        let category = req.params.category;
        await attributes.find({catgory_name:category});
    } catch (error) {
        
    }
});


module.exports = routes;