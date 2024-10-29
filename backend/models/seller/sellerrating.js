const moongose = require("mongoose");
const ratingscheme = new moongose.Schema({
    id:{type:moongose.Schema.Types.ObjectId},
    total_no_of_reviews:{type:Number},
    stars:{type:Number},
});
const sellerrating =  moongose.model("sellerrating", ratingscheme);
module.exports = sellerrating;