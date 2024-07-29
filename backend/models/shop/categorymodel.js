const moongose = require("mongoose");
let categoryschema = new moongose.Schema({
    category_name:{type:String},
    sub_categories:{
        type:Object,
    },
    common_filter_id:{type:moongose.Types.ObjectId},
    iscategory:{type:Boolean},
    status:{type:Boolean},
});
let sub_categories_schema = new moongose.Schema({
    parent_category_name:{type:String},
    extra_filter_id:{type:moongose.Types.ObjectId},
    issubcategory:{type:Boolean},
    subcatgegory_name:{type:String},
    status:{type:Boolean},
    isuse:{type:Boolean},
}) 
const category =  moongose.model("category" , categoryschema);
const subcategory =  moongose.model("subcategory" , sub_categories_schema);
module.exports = {
    category,
    subcategory,
};