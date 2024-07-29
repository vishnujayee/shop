const mongoose = require('mongoose');
const savelaterproductscheme = new mongoose.Schema({
    productid:{
        type:Array,
        default:[],
    },
    userid:{type:mongoose.Schema.Types.ObjectId},
})
const SaveForLater = mongoose.model("SaveForLater" , savelaterproductscheme);
module.exports = SaveForLater;