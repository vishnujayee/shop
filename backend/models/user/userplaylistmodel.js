const mongoose = require('mongoose');
const whihlistplaylistschema =new  mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    playlist_name:{
        type:String,
    },
    allproducts:{
        type:Array,
        default:[],
    },
    total_products:{type:Number,
        default:0,
    },
})
const UserPlaylist = mongoose.model("playlists" , whihlistplaylistschema);
module.exports = UserPlaylist;