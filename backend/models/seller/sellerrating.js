const moongose = require("mongoose");
const ratingscheme = moongose.Schema({
    id:{type:moongose.Schema.Types.ObjectId},
    total_no_of_reviews:{type:Number},
    stars:{type:Number},
});
const sellerrating = mongoose.model("sellerrating", ratingscheme);
module.exports = sellerrating;