const routes = require('express').Router();
let Order = require('../models/user/ordermodel');
const User = require('../models/user/usermodel');
const Product = require("../models/product/productmodel");
let Coupoun = require("../models/product/coupounmodel");
const Seller = require("../models/seller/sellermodel");
let mongoose = require('mongoose');
const { toInt } = require('validator');
let shop_time_stats = require("../models/seller/shopstatsmodel").shoptime_stats;
let shop_tot_stats = require("../models/seller/shopstatsmodel").shoptotalstats;
let shop_day_stats = require("../models/seller/shopstatsmodel").daywisestatsshop;
let product_toay_info = require("../models/product/productstatsmodel").producttodaydata;
let product_year_stats = require("../models/product/productstatsmodel").productyeardata;
let product_tot_stata = require("../models/product/productstatsmodel").productstats;
let getmonth_from_month_number = require("../util/get_time_info").getmonth_from_month_number;
//create order with 
routes.post("/create-order", async (req, res) => {
    try {
        let { productid, userid, qty, sellerid } = req.body;
        let product = await Product.findOne({ _id: new mongoose.Types.ObjectId(productid) });
        if (!product) {
            return res.status(400).json({
                iserror: true,
                error: "product not found",
            });
        }
        let order = await Order.create({ userid: new mongoose.Types.ObjectId(userid), products: product._id, count: qty, status: "processing", sellerid: product.ownerid, ownerstatus: "" });
        order.total = toInt(product.price) * parseInt(qty);
        await order.save();
        return res.status(201).json({
            iserror: false,
            order_summary: order,
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
})
routes.post("/create-order-by-cart", async (req, res) => {
    //set cart to empty
    let user = req.body.user;
    let product = [];
    let userinfo = await User.findOne({ _id: new mongoose.Types.ObjectId(user) });
    if (!userinfo) {
        return res.status(404).json({
            iserror: true,
            error: "user does not exist",
        })
    }
    // let productinfo =[];
    let cart = userinfo.cart;
    for (let p in cart.products) {
        // productinfo.push(Product.findOne({}))
        product.push(Order.create({ products: new mongoose.Types.ObjectId(p), count: cart.products[p], userid: new mongoose.Types.ObjectId(user), ownerstatus: "pending", status: "processing", payment: "pending" }));
    };
    product = await Promise.all(product);
    return res.status(200).json({
        iserror: false,
        order: product,
    })

})
//cancel ,add coupoen to order
routes.post("cancel_order/:orderid/type", async (req, res) => {
    //batch also handle
    try {
    let cancel_type = req.query.type;
    if(!cancel_type) {
        return res.status(400).json({
            iserror:true,
            error:"invalid request"
        })
    };
    let types = ["preorder" , "postorder"];
    let isvalidstatus = false; 
    for(let t of types) {
        if(t === cancel_type) {
            isvalidstatus = true;
            break;
        }
    };
    if(!isvalidstatus) {
        return res.status(400).json({
            iserror:true,
            error:"invalid request"
        })
    };
    let userid = req.body.user;
    let order;
    if(cancel_type === "preorder") {
        order = await Order.find({ _id: new mongoose.Types.ObjectId(req.params.orderid), userid: new mongoose.Types.ObjectId(userid), status: "processing", ownerstatus: "pending", payment: "pending" });
        if (!order) {
            return res.status(400).json({
                iserrror: true,
                error: "order doesn't exist",
            })
        };
        order.status = "cancelled";
        await order.save();
    }else if (cancel_type === "postorder") {
        order = await Order.find({ _id: new mongoose.Types.ObjectId(req.params.orderid), userid: new mongoose.Types.ObjectId(userid), status: "order", ownerstatus: "accepted", payment: "done" });
        if (!order) {
            return res.status(400).json({
                iserrror: true,
                error: "order doesn't exist",
            })
        };
        
        order.status = "cancelled",
        order.payment = "refund" 
        await order.svae();
    }
    if (!order) {
        return res.status(400).json({
            iserrror: true,
            error: "order doesn't exist",
        })
    };
    return res.status(200).json({
        iserror:false,
        message:"order cancelled",
    })
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
routes.put("/add-coupoun/:orderid", async (req, res) => { // remove coupen 
    try {
        let userid = req.body.user;
        let orderid = req.params.orderid;
        let coupou = req.body.coupoun;
        let order = await Order.findOne({ userid: new mongoose.Types.ObjectId(userid), _id: new mongoose.Types.ObjectId(orderid) });
        console.log(order);
        if (!order) {
            return res.status(400).json({
                iserrror: true,
                error: "order doesn't exist",
            });
        }
        let cp = await Coupoun.findOne({ productid: new mongoose.Types.ObjectId(order.products), coupoun_code: coupou });
        console.log(cp);
        if (cp) {
            order.is_coupoun_applied = true;
            order.coupounid = cp._id;
            order.discount_amount = cp.coupoun_discount_percentage;
            order = await order.save();
            return res.status(200).json({
                iserror: false,
                message: "coupoun applied",
                discount_per: order.discount_amount,
            });
        }
        return res.status(200).json({
            iserror: false,
            message: "",
            discount_per: order.discount_amount,
        });

    } catch (e) {
        return res.status(400).send(e.message);
    }
});
//remove coupoun
//get all order of user 
routes.get("/users/:userid/orders", async (req, res) => {
    try {
        //here also work with date improve karne ha
        let pageno = parseInt(req.query.page);
        let id = new mongoose.Types.ObjectId(req.params.userid);
        let ownerstatus = ["accepted", "rejected", "pending", "return_accepted", "return_pending", "return_rejected"];
        let payment = ["done", "pending", "refund"];
        let status = ["order", "processing", "cancelled", "return", "delievered"];
        let toporder = [];
        for (let st of ownerstatus) {
            toporder.push(Order.find({ userid: id, status: status[0], payment: payment[0], ownerstatus: st }).sort({ date: -1 }));
        }
        toporder = await Promise.all(toporder).catch(e => e);
        toporder = toporder.filter((e) => !(e instanceof Error));
        let skip = 0;
        if (pageno == 0 || pageno == 1 || !pageno) skip = 0;
        skip = (pageno - 1) * 5;
        let order = await Order.find({ userid: id, status: "delievered" }).sort({ date: -1 }).skip(skip).limit(5);
        return res.status(200).json({
            iserror: false,
            toporders: toporder,
            order: order,
        })
    } catch (error) {

    }
})
//  add coupen , remove cope  add multi coupoun by seleting multiple product ,also change stats
class SellerOrder {
    constructor(user, products, coupoun, obj) {
        if (products) {
            this.product_name = products.name;
            this.product_descriptiom = products.description;
            this.product_id = products._id;
            this.img = products.pictures;
        }
        if (user) this.buyer = user.name;
        if (coupoun) {
            this.iscoupoun = obj.is_coupoun_applied;
            this.coupun_applied = coupoun.coupoun_code;
            this.discount_amount = (parseInt(coupoun.coupoun_discount_percentage) * (obj.total) / this.qty) / 100;
        }
        this.total = obj.total;
        this.qty = obj.count;
    }
}
routes.get("/pending-order/:sellerid", async (req, res) => {
    try {
        let sellerid = new mongoose.Types.ObjectId(req.params.sellerid);
        let seller = await Seller.findOne({ _id: sellerid });
        if (!seller) {
            return res.status(400).json({
                iserror: true,
                error: "Invalid Request",
            })
        }
        let orders = await Order.find({ sellerid: sellerid, status: "order", payment: "done", ownerstatus: "pending" }).populate("userid").populate("products").populate("coupounid");
        let orderdata = [];
        for (let od of orders) {
            orderdata.push(new SellerOrder(od.userid, od.products, od.coupounid, od));
        }
        return res.status(200).json({
            iserror: false,
            orders: orderdata,
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
})
routes.put("/:order/change_owner_status",async(req,res)=>{
    //seller id from token
    try{
    let sellerid = new mongoose.Types.ObjectId(req.body.sellerid);
    let orderid = new mongoose.Types.ObjectId(req.params.order);
    let status = req.query.status;
    let useremail = req.body.email;
    if(!status || !sellerid || !orderid || useremail || status == "") {
        return res.status(400).json({
            iserror:true,
            error:"Not found/Invalid",
        })
    };
    let isuser = await User.findOne({Email:useremail});
    if(!isuser) {
        return res.status(400).json({
            iserror:true,
            error:"order not found",
        })
    };
    let isvalidstatus = false;
    let ownerstatusarr = ["accepted", "rejected", "pending", "return_accepted", "return_pending", "return_rejected"];
    for(let st of ownerstatusarr) {
        if(st === status) {
            isvalidstatus = true;
            break;
        }
    }
    if(!isvalidstatus) {
        return res.status(400).json({
            iserror:true,
            error:"invalid request"
        })
    };
    let order = await Order.findOne({_id:orderid , sellerid:sellerid , userid:new mongoose.Types.ObjectId(isuser._id), status:"order", ownerstaus:"pending"});
    if(!order) {
        return res.status(400).json({
            iserror:true,
            error:"order not found",
        })
    };
    order.ownerstatus = status;
    //send notification and email to user create a function with cases
    order = await order.save();
    return res.status(200).json({
        iserror:false,
        message:`order ${status}`,
    })
}catch(e) {
return res.status(400).send(e.message);
}
});
routes.put("/:order/return" , async(req,res)=>{
    try {
        let userid = new mongoose.Types.ObjectId(req.body.userid);
        let orderid = new mongoose.Types.ObjectId(req.params.order);
        if(!userid || !order) {
            return res.status(400).json({
                iserror:true,
                error:"invalid input request",
            })
        };
        let order = await Order.findOne({userid:userid, _id:orderid, status:"order", ownerstatus :"accepted", payment:"done"});
        if(!order) {
            return res.status(400).json({
                iserror:true,
                error:"order not found",
            })
        };
        order.status = "return";
        order.ownerstatus = "return_pending";
        await order.save();
        return res.status(200).json({
            iserror:false,
            message:"return initilized",
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
routes.put("/returns/:order/:status" , async(req,res)=>{
try {
    let sellerid = new mongoose.Types.ObjectId(req.body.sellerid);
    let orderid = new mongoose.Types.ObjectId(req.params.order);
    let status = req.params.status;
    let ownerstatusarr = ["return_accepted",  "return_rejected"];
    let isvalidstatus = false;
    for(let st of ownerstatusarr) {
        if(st === status) {
            isvalidstatus = true;
            break;
        }
    }
    if(!isvalidstatus) {
        return res.status(400).json({
            iserror:true,
            error:"invalid request"
        })
    };
    let order = await Order.findOne({_id:orderid , sellerid:sellerid , userid:new mongoose.Types.ObjectId(isuser._id), status:"return", ownerstaus:"return_pending"});
    if(!order) {
        return res.status(400).json({
            iserror:true,
            error:"order not found",
        })
    };
    order.ownerstatus = status;
    if(status === "return_accepted") {
        order.payment = "refund";
        //chnage shop and products stats

    }
    //send notification and email to user create a function with cases
    order = await order.save();
    return res.status(200).json({
        iserror:false,
        message:`order ${status}`,
    })
} catch (error) {
    return res.status(400).send(error.message);
}
});
routes.put("/:order/delievered", async(req,res)=>{
    try{
        let sellerid = new mongoose.Types.ObjectId(req.body.sellerid);
    let orderid = new mongoose.Types.ObjectId(req.params.order);
    let order = await Order.findOne({_id:orderid ,sellerid:sellerid , status:"order" , payment:"done" ,ownerstatus:"accepted"});
    if(!order) {
        return res.status(400).json({
            iserror:true,
            error:"order not found",
        })
    };
    order.status = "delieverd",
    await order.save();
    return res.status(200).json({
        iserror:false,
    })
    }catch(e) {
        return res.status(400).send(e.message);
    }
});
routes.post("/conform/payment",async(req,res)=>{
    try {
        let userid = req.body.user;
        let orderis = req.body.orderids;//obejct
        let order = [];
            for(let od in orderis) {
                order.push(Order.findOne({_id:new mongoose.Types.ObjectId(od), userid:new mongoose.Types.ObjectId(userid),status:"pending",ownerstatus:"pending", payment:"pending"})).populate("products").populate("coupounid");
            }
            order = await Promise.all(order);
            let changedorder = [];
            let productid = [];
            for(let od of order) {
                od.status = "order";
                od.payment = "done";
                productid.push(new mongoose.Types.ObjectId(od.products._id));
                changedorder.push(od.save());
            }
            changedorder = await Promise.all(changedorder);
            let {iserror , issuccess, error} = await increasestats(changedorder);
            return res.status(200).json({
            iserror:false,
            message:"order booked",
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
})
const increasestats = async(changedorder)=>{
    //day wise seller stats ,product day
    //shop year , product
    //total stats , product tot
    try{
    let sellersday = [];
    let selleryear = [];
    let sellertot = [];
    let productday = [];
    let productyear = [];
    let producttot = [];
    let date = new Date();
    let day = date.getUTCDay;
    let year = date.getUTCFullYear;
    let month = date.getUTCMonth;
    let monthname = getmonth_from_month_number(month+1);
    let sellerrev = {};
    let productrev = {};
    let productqty = {};
    for(let pd of changedorder) {
        addproductqty(productqty ,pd);
        addproductrev(productrev,pd);
        addsellerrev(sellerrev,pd);
        sellersday.push(shop_day_stats.findOne({sellerid:new mongoose.Types.ObjectId(pd.sellerid), year :year, month :month+1,day :day}));
        selleryear.push(shop_time_stats.findOne({sellerid:new mongoose.Types.ObjectId(pd.sellerid), year :year}));
        sellertot.push(shop_tot_stats.findOne({sellerid:new mongoose.Types.ObjectId(pd.sellerid)}));
        productday.push(product_toay_info.findOne({product_id:new mongose.TYpes.ObjectId(pd.products._id), year:year,month:month,day:day}));
        productyear.push(product_year_stats.findOne({product_id:new mongose.TYpes.ObjectId(pd.products._id), year:year}));
        producttot.push(product_tot_stata.findOne({productid:new mongose.TYpes.ObjectId(pd.products._id)}));
    }
    sellersday = await Promise.all(sellersday);
    selleryear = await Promise.all(selleryear);
    sellertot = await Promise.all(sellertot);
    productday = await Promise.all(productday);
    productyear = await Promise.all(productyear);
    producttot = await Promise.all(producttot);
    let changesellersday = [];
    let changeselleryear = [];
    let changesellertot = [];
    let changeproductday = [];
    let changeproductyear = [];
    let changeproducttot = [];
    for(let sd of sellersday) {
        sd.sales = sd.slaes + sellerrev[sd.sellerid];
        sd.order = sd.order+1;
        sd.netsales = sd.netsales + sellerrev[sd.sellerid];
        // sd.fullfilledorder = sd.fullfilledorder + 1;
        changesellersday.push(sd.save());
    }
    for(let sy of selleryear) {
        sy.month_wise_stats_order[monthname] = sy.month_wise_stats_order[monthname] + 1;
        // sy.month_wise_fulfilled_order[monthname] = sy.month_wise_fulfilled_order[monthname] + 1;
        sy.month_wise_stats_sales[monthname] = sy.month_wise_stats_sales[monthname] + sellerrev[sy.sellerid];
        sy.month_wise_net_sales[monthname] = sy.month_wise_net_sales[monthname] + sellerrev[sy.sellerid];
        sy.total_sales_in_year = sy.total_sales_in_year + sellerrev[sy.sellerid];
        sy.net_sales = sy.net_sales + sellerrev[sy.sellerid];
        sy.total_order_in_year = sy.total_order_in_year + 1;
        changeselleryear.push(sy.save());
    }
    for(let st of sellertot) {
        st.total_life_time_orders = st.total_life_time_orders + 1;
        st.total_life_time_sales =  st.total_life_time_sales + sellerrev[st.sellerid];
        st.total_life_time_net_sales = st.total_life_time_net_sales + sellerrev[st.sellerid];
        changesellertot.push(st.save());
    };
    //product 
    for(let pd of productday) {
        pd.total_qty_sell_by_seller = pd.total_qty_sell_by_seller + productqty[pd.product_id];
        pd.total_sale = pd.total_sale + productrev[pd.product_id];
        changeproductday.push(pd.save());
    };
    for(let py of productyear) {
        py.total_qty_sell_by_seller = py.total_qty_sell_by_seller + productqty[pd.product_id];
        py.total_sale = py.total_sale + productrev[pd.product_id];
        py.total_net_sale = py.total_net_sale + productrev[pd.product_id];
        py.monthly_wise_qty[monthname] = py.monthly_wise_qty[monthname] + productqty[pd.product_id];
        py.monthly_wise_sale = py.monthly_wise_sale + productrev[pd.product_id];
        changeproductyear.push(py.save());
    }
    for(let pt of producttot) {
        pt.total_qty_sell = pt.total_qty_sell + productqty[pd.productid];
        pt.total_revenue = pt.total_revenue + productrev[pd.productid];
        changeproducttot.push(pt.save());
    }
    changesellersday = await Promise.all(changesellersday);
    changeselleryear = await Promise.all(changeselleryear);
    changesellertot = await Promise.all(changesellertot);
    changeproductday = await Promise.all(changeproductday);
    changeproductyear = await Promise.all(changeproductyear);
    changeproducttot = await Promise.all(changeproducttot);
    return {iserror:false, error:"", issuccess:true};
} catch(e) {
    return {iserror:true , error:e.message ,issuccess:false};
}
}
function addsellerrev(sellerrev , pd) {
    if(sellerrev[new mongoose.Types.ObjectId(pd.sellerid)]) {
        let v = sellerrev[new mongoose.Types.ObjectId(pd.sellerid)] ;
        sellerrev[new mongoose.Types.ObjectId(pd.sellerid)] = v + pd.total;
        v = sellerrev[new mongoose.Types.ObjectId(pd.sellerid)] = v + pd.total;
        if(pd.is_coupoun_applied) {
            sellerrev[new mongoose.Types.ObjectId(pd.sellerid)] = v - pd.discount_amount;
        }
    }else {
        sellerrev[new mongoose.Types.ObjectId(pd.sellerid)] = pd.total - pd.discount_amount;
    }
}
function addproductrev(productrev , pd) {
    if(productrev[new mongoose.Types.ObjectId(pd.products._id)]) {
        let v = productrev[new mongoose.Types.ObjectId(pd.products._id)] ;
        productrev[new mongoose.Types.ObjectId(pd.products._id)] = v + pd.total;
        v = productrev[new mongoose.Types.ObjectId(pd.products._id)];
        if(pd.is_coupoun_applied) {
            productrev[new mongoose.Types.ObjectId(pd.products._id)] = v - pd.discount_amount;
        }
    }else {
        productrev[new mongoose.Types.ObjectId(pd.products._id)] = pd.total - pd.discount_amount;
    }
}
function addproductqty(productqty , pd) {
    if(productqty[new mongoose.Types.ObjectId(pd.products._id)]) {
        let v = productqty[new mongoose.Types.ObjectId(pd.products._id)] ;
        productqty[new mongoose.Types.ObjectId(pd.products._id)] = v + pd.count;
    }else {
        productqty[new mongoose.Types.ObjectId(pd.products._id)] =  pd.count;
    }
}
module.exports = routes;