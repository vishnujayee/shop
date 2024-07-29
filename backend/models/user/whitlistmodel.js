const mongoose = require('mongoose');
const watchlistscheme = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    products:{
        type :Array,
        default:[],
    },
    totalproduct:{type:Number},
})
const Watchlist = mongoose.model('Watchlist' , watchlistscheme);
module.exports = Watchlist;