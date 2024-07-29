const { default: mongoose } = require("mongoose");

const categoryfilterschema = new mongoose.Schema({
catgory_name:{type:String},
filter_opt:{type:Object,
},

});
const attributes = new mongoose.Schema({
    attribute_name:{type:String},
    attribute_opt:{type:Object},
    catgory_name:{type:String},
    subcatgeory_name:{type:String},
    opt:{type:Object},
    ispending:{type:Boolean},
    status:{type:String},
})
const subcategoryschema = new mongoose.Schema({
    parent_category:{type:String},
    subcategory_name:{type:String},
    filter_opt:{type:Object},
});
const category_filter  = mongoose.model("catgeory_filter",categoryfilterschema);
const subcategory_filter = mongoose.model("subcategiry_filter", subcategoryschema);
const attribute = mongoose.model("attribute_filter",attributes);
module.exports = {category_filter , subcategory_filter,attribute};