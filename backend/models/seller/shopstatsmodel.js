const moongose = require("mongoose");
const shopstatsscheme = new moongose.Schema({
    sellerid: { type: moongose.Types.ObjectId },
    total_life_time_orders: {
        type: Number,
        default: 0,
    },
    total_life_time_sales: {
        type: Number,
        default: 0,
    },
    total_life_time_returns: {
        type: Number,
        default: 0,
    },
    total_life_time_net_sales: {
        type: Number,
        default: 0,
    },
    total_life_time_fulfilled_orders: {
        type: Number,
        default: 0,
    },
    total_shop_visit:{type:Number},
    total_product_view:{type:Number},
    total_product_add_to_cart:{type:Number},
    by_category:{type:Object},
    by_age:{type:Object},
    total_refer_sales:{type:Number},
});

const shoptimestats = new moongose.Schema({
    sellerid: { type: moongose.Types.ObjectId },
    year: {type:Number},
    month_wise_stats_order: {
        type: Object,
        default: {
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
        }
    },
    month_wise_fulfilled_order: {
        type: Object,
        default: {
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
        }
    },
    month_wise_stats_sales: {
        Type: Object,
        default: {
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
        }
    },
    month_wise_net_sales: {
        type: Object,
        default: {
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
        }
    },
    month_return_order: {
        type: Object,
        default: {
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
        }
    },
    total_sales_in_year: {
        type: Number,
        default: 0,
    },
    net_sales: {
        type: Number,
        default: 0,
    },
    total_order_in_year: {
        type: Number,
        default: 0,
    },
    total_fullfilled_order_in_year: {
        type: Number,
        default: 0,
    },
    total_referal_sales:{type:Number},
});
const daywisestats = new moongose.Schema({
    sellerid: { type: moongose.Types.ObjectId },
    year: { type: Number },
    month: { type: Number },
    day: { type: Number },
    sales: {
        type: Number,
        default: 0,
    },
    orders: {
        type: Number,
        default: 0
    },
    netsales: {
        type: Number,
        default: 0,
    },
    fullfilledorder: { type: Number },
    returns:{type:Number},
    referal_sales:{type:Number},
    shop_visit:{type:Number},
    producview:{type:Number},
    productaddtocat:{type:Number},
});
const shoptotalstats = moongose.model("shop_stats", shopstatsscheme);
const shoptime_stats = moongose.model("shop_time_stats", shoptimestats);
const daywisestatsshop = moongose.model("daywisestats", daywisestats);
module.exports = {
    shoptotalstats, shoptime_stats, daywisestatsshop
};