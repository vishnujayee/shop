const moongose = require("mongoose");
const reviewschemme = new moongose.Schema({
    userid:{type:moongose.Schema.Types.ObjectId},
    productid:{type:moongose.Schema.Types.ObjectId},
    sellerid:{type:moongose.Schema.Types.ObjectId},
    rating:{type:Number,
        max:5,
        min:1,
    },
    rating_title:{type:String},
    rating_message:{type:String},
    created_date:{type:Date},
    updated_date:{type:Date},
    images:{type:Array,
        default:[],
    },
    videos:{type:Array,
        default:[],
    },
});
reviewschemme.methods.makeObject = function() {
    let p = this;
    p = p.toObject();
    return p;
}
const review = moongose.model("rataings",reviewschemme);
module.exports = review;