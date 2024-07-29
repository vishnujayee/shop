const moongose = require("mongoose");
const suscribeproductmodel = new moongose.Schema({
    userid:{type:moongose.Types.ObjectId},
    all_suscribed_products:{
        type:Object,
    },
    all_suscribed_dates:{type:Object},
    total_suscribed_money:{type:Number},
});
let usersuscribe = moongose.model("user-suscriptions", suscribeproductmodel);
module.exports = usersuscribe;