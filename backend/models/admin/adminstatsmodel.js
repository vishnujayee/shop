const moongoose = require("mongoose");
const adminstatscheme = new moongoose.Schema({
    admin:{type:Number,
        default:1,
    },
    total_life_time_orders:{type:Number},
    total_users:{type:Number},
    total_product_on_board:{type:Number},
    total_sellers:{type:Number},
    total_buyers:{type:Number},
    total_life_time_revenue:{type:Number},
});
const daystats = new moongoose.Schema({
    admin:{type:Number,
        default:1,
    },
    year:{type:Number},
    month:{type:Number},
    day:{type:Number},
    total_order:{type:Number},
    total_sale:{type:Number},
    total_user_created:{type:Number},
    total_buyer:{type:Number},
    total_seller:{type:Number},
    total_product_added:{type:Number},
    total_cancel:{type:Number},
    total_return:{type:Number},
})
const timestats = new moongoose.Schema({
    admin:{type:Number,
        default:1,
    },
    year:{type:Number},
    month:{type:Number},
    total_user_created:{type:Number},
    total_buyers:{type:Number},
    total_sellers:{type:Number},
    total_order:{type:Number},
    total_fullfilledorder:{type:Number},
    total_cancel:{type:Number},
    total_return:{type:Number},
    total_sale:{type:Number},
    toal_product_added:{type:Number},
})
const adminscheme = moongoose.Schema({
    adminid:{type:moongoose.Types.ObjectId},
})
const admin =  moongoose.model("admin" , adminscheme);
const adminstats =  moongoose.model("adminstats" , adminstatscheme);
const daystatsshop = moongoose.model("shop-day-stats" ,daystats);
const timestatsshop = moongoose.model("time-shop-stats",timestats);
module.exports = {
    admin :admin,
    adminstats :adminstats,
    daystatsshop,timestatsshop,
};
