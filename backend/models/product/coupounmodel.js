const moongose = require("mongoose");
const copounscheme = moongose.Schema({
    productid:{type:moongose.Types.ObjectId},
    isLimited_qty:{type:Boolean,
        default:true,
    },
    islimited_time:{type:Boolean,
        default:true,
    },
    qty:{type:Number},
    coupoun_code:{type:String},
    coupoun_discount_percentage:{type:Number,
        max:100,
        min:0,
    },
    validity_time:{type:Date},
    is_single_time_person_use:{type:Boolean},
    isexpired:{type:Boolean},
});
let coupoun = new moongose.model("coupoun",copounscheme);
module.exports = coupoun;