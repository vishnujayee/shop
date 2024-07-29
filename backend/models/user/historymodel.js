const mongoose = require('mongoose');
const HistorySchema = new mongoose.Schema({
    userid : {
        type :mongoose.Schema.Types.ObjectId,
        ref:"users",
        
    },
    year:{type:Number,},
    month:{
        type:String,
    },
    lastview : {
        type:Array,
        default:[],
    },
},{minmize:false});
const History = mongoose.model("UserHistory" , HistorySchema);
module.exports = History;