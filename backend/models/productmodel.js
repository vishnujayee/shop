const mongose = require('mongoose');
const ProductSchema = mongose.Schema({
    name:{
        type:String,
        required:[true,"is neccesary"]
    },
    description:{
        type:String,
        required:[true,"to showcase detail of product is neccesary"]
    },
    price:{
        type:String,
        required:[true,"is required"]
    },
    category:{
        type:String,
        required:[true,"is needed"]
    },
    subcategory:{
        type:String,   
    },
    tags:{
        type:[String],
        
    },
    pictures:{
        type:Array,
        required:true
    },
    ownerid:{
        type:mongose.Schema.Types.ObjectId,
        ref:'Seller'
    }
},{minimize:false})
const Product = new mongose.model('Product',ProductSchema);
module.exports  = Product;