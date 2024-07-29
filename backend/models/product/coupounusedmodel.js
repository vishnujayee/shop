const mongoose = require('mongoose');
const coupounused = mongoose.Schema({
    coupounid:{Type:mongoose.Schema.Types.ObjectId},
    usedby:{
        type:Object,
    }
});
let usedcoupoun = new mongoose.model("cpupounp_used",coupounused);
module.exports  = usedcoupoun;