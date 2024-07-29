const moongose = require('mongoose');
const addressSchema = moongose.Schema({
country:{
    type:String
},
state:{
    type:String
},
pincode:{
    type:Number
},
fullAdress:{
    type:String
},
userid:{
    type:moongose.Schema.Types.ObjectId,
},
usertype:{type:String},
})
const Address = moongose.model("Address" , addressSchema);
module.exports = Address;