
const routes = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user/usermodel');
const generatetoken = require('../util/tokenauth/generatetoken');
const { checkAuth } =  require( '../util/tokenauth/auth');
const moongose = require('mongoose');
const Products = require("../models/product/productmodel");
const userHistory = require("../models/user/historymodel");
const Watchlist = require("../models/user/whitlistmodel");
const userPlaylist = require("../models/user/userplaylistmodel");
const Product = require('../models/product/productmodel');
const getmonth_from_month_number = require("../util/get_time_info").getmonth_from_month_number;
class Users {
    constructor(user) {
        this.userid = user._id;
        this.email = user.Email;
        this.isAdmin  = user.isAdmin;
    }
}
//signup
routes.post('/signup' ,async(req,res,next)=>{
    const {name,email,password} = req.body;
    try {
        if(!name || name.split().length == 0 || !email || email.split().length == 0 || !email.includes("@") || !password || password.split().length == 0 || password.length<8){
            res.status(400).send("Invalid credential and paswword must be greter than eight");
            return;
        };
        let founduser = await User.find({Email:email});
        if(founduser) {
            return res.status(400).json({
                iserror:false,
                message:"already user",
            })
        }
    const user = await User.create({name:name,Email:email,password:password});
    const userdata = user.toJson();
    res.json(userdata);
    } catch (e) {
        // if(e.code == 11000) return res.status(400).send("email already existed");
        res.status(400).send(e.message);
    }
})
//login
routes.post('/login', async(req,res) =>{
    console.log("function call");
    try {
        const {Email,password}  = req.body;
        if( !Email || Email.split().length == 0 || !Email.indexOf("@") || !password || password.split().length == 0 || password.length<8){
            res.status(400).send("Invalid credential and paswword must be greter than eight");
            return;
        }
        console.log(Email, password)
        //if user buyer and seller
        let user = await User.findbycredentials(Email,password);
        console.log(user);
        let id = (user._id);
        const token = generatetoken.token(id);   
        user = user.toJson();
        console.log(user);
        res.json({
            "user": user,
            "token": token
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//login with token 
// wrrite now error occur i see and make strong auth
routes.post("/logintoken" ,checkAuth);

//ubdate profile data like name ,email , phonenumber , password
routes.post('/ubdate-profile/:usertype' , async (req,res)=>{
    const {userid , name , email , phonenumber, password} = req.body;
    let type = req.params.usertype;
    if(!userid || userid == undefined) {
        return res.status(400).json({
            iserror:true,
            error:"you need to log in or invalid credientrial"
        })
    }
    if(!name || !email || !phonenumber || !password || name.split().length ==0 || email.split().length ==0 || password.split().length ==0  ) {
        return res.status(400).json({
            iserror:true,
            error:"Invalid credientrials",
        });
    }
    let user;
    try{
    if(type === 'user') {
        user = await User.findOne({_id: new moongose.Types.ObjectId(userid)});
    }else {
        user = await Seller.findOne({_id: new moongose.Types.ObjectId(userid)});
    }
    if(!user || user == undefined) {
        return res.status(404).json({
            iserror:true,
            error:"user doesn't exist",
        })
    }
    const hashpassword = await bcrypt.hash(password , 12);
    if(type === 'user') {
        console.log("here");
        user = await User.findOneAndUpdate({_id: new moongose.Types.ObjectId(userid)} , {name:name , Email:email , phonenumber:phonenumber , password:hashpassword});
    }else {
        user = await Seller.findOneAndUpdate({_id: new moongose.Types.ObjectId(userid)} , {name:name , Email:email , phonenumber:phonenumber , password:hashpassword});
    }
    user = user.toObject();
    let data = new Users(user);
    return res.status(200).json({
        iserror:false,
        error:"",
        user :data,
    })
}catch(error) {
    return res.status(400).send(error.message);
} 
});

//forgot password
routes.post('/:usertype/forgot-password' , async (req, res)=>{
    let {email} = req.body;
    try{
    let type = req.params.usertype;
    if(!email || email.split().length == 0 || !email.includes("@")) {
        return res.status(400).json({
            iserror:true,
            error:"Invaid email",
        })
    }
    let user;
    if(type == "user") {
        user = User.findOne({Email:email});
    }else {
        user = Seller.findOne({Email:email});
    }
    if(!user) {
        return res.status(404).json({
            iserror:true,
            error:"user does not exist",
        })
    }
    //mail send then using otp or using someecookies
    //change password
    res.status(200).json({
        iserro:false,
        error:"",
        message:"password changed login to your account"
    })
}catch(e) {
    return res.status(400).send(e.message);
}
})

// add product to history alson thinking o f optimise
routes.get('/add-history/:userid/:pid',async(req, res)=>{
    let uid = req.params.userid;
    let pid = req.params.pid;
    try{
    if(!pid || !uid) {
        return res.status(400).json({
            iserror:true,
            error:"need to request again",
        })
    }
    let user = await User.findOne({_id:new moongose.Types.ObjectId(uid)});
    if(!user) {return res.status(400).json({
        iserror:true,
        error:"user not exist",
    })}
    let p = await Products.findOne({_id:new moongose.Types.ObjectId(pid)});
    if(!p) {return res.status(400).json({
        iserror:true,
        error:"product not exist",
    })};
    const dateObj = new Date();
    const monthd   = dateObj.getUTCMonth() + 1; // months from 1-12
    const day     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();
    let month = getmonth_from_month_number(monthd);
        let his = await userHistory.findOne({userid:new moongose.Types.ObjectId(uid) , month:month, year :year});
        if(!his) {
            his = await userHistory.create({userid:new moongose.Types.ObjectId(uid)});
            his.month = month;
            his.year = year;
            console.log("history of this user created");
        }
        his.lastview.push(pid);
        console.log(his);
        his = await his.save(); 
        return res.status(200).json({
            message:"succesful added",
            history:his,
        })
}catch(e) {
    return res.status(400).send(e.message);
}
})
routes.patch('/delete-history/:userid/:productid' , async(req,res)=>{
    //person can delete theproduct hisory from a particular month
    let uid = req.params.userid;
    let pid = req.params.productid;
    const dateObj = new Date();
    const monthd   = dateObj.getUTCMonth() + 1; // months from 1-12
    const day     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();
    let month = getmonth_from_month_number(monthd);
    let his = await userHistory.findOne({userid:new moongose.Types.ObjectId(uid) ,year:year , month :month });
    if(!his) {
        return res.status(404).json({
            iserror:true,
            error:"user not exist",
        })
    }
    let newarr = [];
    newarr = his.lastview.filter((p)=> p!= pid);
    his.lastview = newarr;
    await his.save();
    return res.status(200).json({
        message:"deleted succesfully",
    })
});

// add to  watchlist
routes.post('/:userid/add-to-favourite', async( req ,res)=>{
    const {productid} = req.body;
    let userid = req.params.userid;
    if(!productid || !userid) {
        return res.status(400).json({
            iserror:true,
            error:"invalid input ",
        })
    }
    try {
        //product search
        let user =  User.findById({_id:new moongose.Types.ObjectId(userid)});
        if(!user) {
            return res.status(400).json({
                iserror:true,
                error:"user not found",
            })
        }
        let list = await Watchlist.findOne({userid:new moongose.Types.ObjectId(userid)});
        if(!list) {
            list = await Watchlist.create({userid:new moongose.Types.ObjectId(userid)});
        }
        list.products.push(productid);
        list.totalproducts =  list.totalproducts+1;
        list = await list.save();
        return res.status(200).json({
            message:"succesfully added",
            iserror:false,
            fav:list,
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
routes.post("/:userid/remove-favourite", async(req,res) =>{
    const {productid} = req.body;
    let uid = req.params.userid;
    try {
        //product search
        let user =  User.findById({_id:new moongose.Types.ObjectId(uid)});
        if(!user) {
            return res.status(400).json({
                iserror:true,
                error:"user not found",
            })
        }
        let list = await Watchlist.findOne({userid:new moongose.Types.ObjectId(uid)});
        if(!list) {
            return res.status(400).json({
                iserror:true,
                error:"invalid input",
            })
        }
        if(list.products.length == 0) {
            return res.status(400).json({
                iserror:true,
                error:"some error occured",
            })
        };
        let newarr = [];
        newarr = list.products.filter((p)=>p!= productid);
        list.products = newarr;
        list.totalproducts =  list.totalproducts-1;
        list = await list.save();
        return res.status(200).json({
            message:"succesfully deleted",
            iserror:false,
            fav:list,
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
})
//create playlist
routes.post('/create-playlist' , async(req,res)=>{
    const {playlistname ,userid } = req.body;
    if(!playlistname || playlistname.split(" ").length == 0 || !userid) {
        return res.status(400).json({
            iserror:true,
            errot:"invalid input",
        })
    }
    try {
        let list = await userPlaylist.create({userid : userid , playlist_name :playlistname});
        list.save();
        return res.status(200).json({
            iserror:false,
            message:"playlist with " + "" + playlistname + " " +"is sucessfully created",
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
routes.delete("/delete-list/:listid/:userid" , async(req,res)=>{
    let listid = req.params.listid;
    let userid = req.params.userid;
    try {
        let list = await userPlaylist.findOne({userid:new moongose.Types.ObjectId(userid), _id:new moongose.Types.ObjectId(listid)});
        if(!list) {
            return res.status(404).json({
                iserror:true,
                error:"list doennot exist",
            })
        };
        await userPlaylist.deleteOne({userid:new moongose.Types.ObjectId(userid), _id:new moongose.Types.ObjectId(listid)});
        res.status(200).json({
            message:"succesfull",
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
});
//flag
routes.post("/:listid/addproduct/:productid", async(req,res)=>{
let pid = req.params.productid;
console.log(pid);
let userid = req.body.userid;
try {
    let p2 = await Product.findOne({_id:new moongose.Types.ObjectId(pid)});
    let list =  await userPlaylist.findOne({_id:new moongose.Types.ObjectId(req.params.listid), userid:new moongose.Types.ObjectId(userid)});
    if(!list || !p2) {
        return res.status(404).json({
            iserror:true,
            error:"not found",
        })
    }
    list.allproducts.push(pid);
    list.total_products = list.total_products +1;
    list = await list.save();
    return res.status(200).json({
        message:"product added",
        list :list,
    })
    
} catch (error) {
    return res.status(400).send(error.message);
}
})
// delete product from list 
//flag
routes.post("/:listid/delete-product/:productid" , async( req ,res)=>{
//token se id luga
let pid = req.params.productid;
console.log(pid);
let userid = req.body.userid;
try {
    let p2 = await Product.findOne({_id:new moongose.Types.ObjectId(pid)});
    let list =  await userPlaylist.findOne({_id:new moongose.Types.ObjectId(req.params.listid), userid:new moongose.Types.ObjectId(userid)});
    if(!list || !p2) {
        return res.status(404).json({
            iserror:true,
            error:"not found",
        })
    }
    if(!list.allproducts[pid] || list.total_products == 0 ) {
        return res.status(400).json({
            iserror:true,
            error:"list is empty",
        })
    }
    list.allproducts = list.allproducts.filter((p)=>p != pid)
    list.total_products = list.total_products - 1;
    list = await list.save();
    return res.status(200).json({
        message:"product deleted",
        list :list,
    })
    
} catch (error) {
    return res.status(400).send(error.message);
}
}) 
    //save  for later and delete from cart and  delete from savefor later to push in cart







//get users ---> need to modified to show users and sellers in admin pannel need to work 
routes.get('/',async(req,res,next)=>{
    try {
        const user = await User.find({isAdmin:false});
        res.json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports = routes;