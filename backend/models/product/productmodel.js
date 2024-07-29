const mongose = require('mongoose');
const ProductSchema = new mongose.Schema({
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
    stock_status:{
        type:Boolean,
    },
    product_exist:{
        type:Boolean,
    },
    pictures:{
        type:Array,
        default:[],
        // required:true
    },
    ownerid:{
        type:mongose.Schema.Types.ObjectId,
    },
    subcategory :{
        type:Array,
        default:[],
    },
    tags:{
        type:Array,
        default:[],
    },
    issuscribe:{type:Boolean},
    date:{type:Date},
    
},{minimize:false});
ProductSchema.methods.makeObject = function() {
    let p = this;
    p = p.toObject();
    return p;
}
const Product =  mongose.model('Product',ProductSchema);
module.exports  = Product;