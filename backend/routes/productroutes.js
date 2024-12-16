const routes = require('express').Router();
const { admin } = require('../models/admin/adminstatsmodel');
let uploadimg2 = require("../middlewear/cloudinary").uploadhelper2;
let upload = require("../middlewear/image/multer").multerupload;
const Product = require('../models/product/productmodel');
const User = require('../models/user/usermodel');
const Coupoun = require("../models/product/coupounmodel");
let cpused = require("../models/product/coupounusedmodel");
const mongoose = require("mongoose");
const review = require('../models/product/rating_review_product');
const types = mongoose.Types;
const ObjectId = types.ObjectId;
class Productpage {
    constructor(p , r ,s) {
        this.products = p ;
        this.reviews = r;
        this.similar = s;
    }
};
class Productdetail {
    constructor(title , description ,price , category , images ,stock , product ,issuccribe) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.images = images;
        if(stock) this.stock_status = true;
        if(product) this.product_status = true;
        if(!issuccribe) this.suscribe = false;
    };
};

//get all product by seller 
routes.get('/all/:sellerid', async function (req, res) {
    try {
        let sellerid = req.params.sellerid;
        let pageno;
        if(!req.query.page) pageno = 0;
        pageno = parseInt(req.query.page);
        console.log(pageno);
        if(!sellerid) {
            return res.status(400).json({
                iserror:true,
                error:"Invalid request input",
                product : null,
            })
        }
        let p = (pageno == 0 || pageno == 1) ? 0 : (Math.floor((pageno/2)))*10;
        const product = await Product.find({ownerid:new mongoose.Types.ObjectId(sellerid)}).skip(p).limit(10);
        console.log(product);
        if(!product || product.length == 0) {
            return res.status(400).json({
                iserror:true,
                error:"Product not found",
                product : null,
            })
        }
        res.status(200).json(product);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
// add new product by seller 
routes.post('/new',upload.array("images",5),async(req, res) => {
    //check seller id and add limit that after 1s req
    try {
        const { name, description, price, category  , brandname} = req.body;
        if(!name || !description || !price || !category || !brandname) {
            return res.status(400).json({
                iserror:true,
                error:"enter valid input",
            })
        }
        let images = req.files;
        if(!images || images.length == 0 || images.length >= 5) {
            return res.status(400).json({
                iserror:true,
                error:"photos need to be added/ less than 5",
            })
        }
        let url =  await uploadimg2(images);
        let img = [];
        for(im of url) {
            img.push({
                url:im.url,
                id:im.public_id,
            })
        }
        console.log(img);
        let p = await Product.create({ name, description, brandname, price, category,product_exist:true,stock_status:true});
        p.pictures = img;
        p = await p.save();
        console.log(p);
        res.status(201).json({
            message:"created",
            iserror:false,
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//ubdateproduct
routes.patch('/update/:id', async (req, res) => {
    //check it is ubdate by seller of product or not 
    try {
        const id = req.params.id;
        console.log("here",id);
        const { name, description, price, category ,subcategory} = req.body;
        let p = await Product.findOneAndUpdate({_id:new mongoose.Types.ObjectId(id)},{name,description,price,category,subcategory});
        if(!p) {
            return res.status(400).json({
                iserror:true,
                error:"some error occured",
            })
        }
        // p = await Product.find({_id:new mongoose.Types.ObjectId(id)});
        let updatedproduct  = new Productdetail(p.name , p.description, p.price, p.category);
        res.status(200).json({
            message:"product updated",
            iserror :false,
            updtaeddproduct :updatedproduct,
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//delete
routes.patch('/delete/:id', async (req, res) => {
    //give msg to cart that to remove 
    //remove from pending order
    const id = req.params.id;
    const { user } = req.body; //user or seller
    try {
        let product = await Product.find({_id:new mongoose.Types.ObjectId(id)});
        if(!product ) {
            return res.status(400).json({
                iserror:true,
                error:"product not found / invalid credientail",
                product : null,
            })
        }
        const Admin = await admin.findOne({adminid : new mongoose.Types.ObjectId(user)});
        console.log(Admin);
        if (Admin && product ) {
            // await Product.updateOne({_id:new mongoose.Types.ObjectId(id)},{product_status:false});
            product.product_exist = false;
            await product.save();
            return res.status(200).json({
                iserror:false,
                message:"product deleted",
            })
        };
        product = await Product.findOne({_id:new mongoose.Types.ObjectId(id) ,ownerid:new mongoose.Types.ObjectId(user)});
        if(!product) {
            return res.status(400).json({
                iserror:true,
                error:"u are not authorized",
                product : null,
            })
        }
        product.product_exist = false;
        await product.save();
        res.status(200).json({message:"product deleted"});
    } catch (error) {
        res.status(400).send(error.message);
    }
})
//change status product out of stock
routes.post("/stock_change_status",async(req,res)=>{
    //subsribe to product
    let sellerid = req.body.sellerid;
    let pid = req.body.productid;
    let product = await Product.findOne({_id:new mongoose.Types.ObjectId(pid) , ownerid:new mongoose.Types.ObjectId(sellerid)});
    if(!product) {
        return res.status(400).json({
            iserror:true,
            error:"product not found",
        })
    }
    let status = product.stock_status;
    product.stock_status = (status == true) ? false :true;
    status = product.stock_status;
    let st = (status) ? "has stock" :"out of stock";
    await product.save();
    return res.status(200).json({
        iserror:false,
        message:`change to ${st}`,
    })
})
//get product detail page
routes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const idd = new mongoose.Types.ObjectId(id);
    try {
        let product = await Product.findById(idd);
        product = product.makeObject();
        if(!product) {
            return res.status(400).json({
                iserror:true,
                error:"product doees not exist"
            })
        };
        let p1 =  Product.find({ category: product.category }).limit(5);
        let p2 =  review.find({productid:idd}).limit(5);
        let rese = await Promise.all([p1,p2]);
        let detail = new Productdetail(product.name ,product.description , product.price, product.category, product.pictures,product.stock_status, product.product_exist);
        if(!rese[0]) {
            rese[0] = {};
        }
        if(!rese[1]) rese[1] ={};
        let page = new Productpage(detail,rese[1],rese[0]);
        res.status(200).json(page);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
//get category wise product with pagination
routes.get('/category/:category/', async (req, res) => {
    try {
        let pageno = parseInt(req.query.page);
        if(!pageno) pageno = 0;
        let skip = (pageno == 0 || pageno == 1) ? 0 : (pageno-1)*10;
        const category = req.params.category;
        let products;
        if (category == 'all') {
            products = await Product.find({product_exist:true}).skip(skip).limit(10);
        } else {
            products = await Product.find({ category: category ,product_exist:true}).skip(skip).limit(10);
        }
        res.status(200).json({
            products:products,
            iserror:false,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})
// add coupun to product
routes.post('/add-coupoun/',async(req,res)=>{
    let {coupoun ,productid , sellerid,isLimited_qty,islimited_time ,issingleuser , percent} = req.body;
    let product = await Product.findOne({_id:new mongoose.Types.ObjectId(productid) , ownerid :new mongoose.Types.ObjectId(sellerid)});
    if(!product) {
        res.status(400).json({
            iserro:true,
            error:"invalid input",
        })
    }
    let cp = await Coupoun.create({coupoun_code :coupoun , productid:new mongoose.Types.ObjectId(productid) , coupoun_discount_percentage:parseInt(percent) ,issingleuser:issingleuser});
    if(isLimited_qty && islimited_time) {
        let qty = req.body.cp_qty;
        let duetime = req.body.cp_time;
        cp.isLimited_qty = true;
        cp.islimited_time = true;
        cp.qty = parseInt(qty);
        cp.validity_time = duetime;
        await cp.save();
        return res.status(200).json({
            iserror:false,
            message:"coupoun added succesfully"
        })
    }else if(isLimited_qty) {
        let qty = parseInt(req.body.cp_qty);
        cp.isLimited_qty = true;
        cp.islimited_time = false;
        cp.qty = qty;
        await cp.save();
        return res.status(200).json({
            iserror:false,
            message:"coupoun added succesfully"
        })
    }
    else if(islimited_time){
        let duetime = req.body.cp_time;
        cp.validity_time = duetime;
        cp.isLimited_qty = false;
        cp.islimited_time = true;
        let cp = await cp.save();
        return res.status(200).json({
            iserror:false,
            message:"coupoun added succesfully",
            coupoun:cp,
        })
    }
    else {
        cp.isLimited_qty = false;
        cp.islimited_time = false;
        await cp.save();
        return res.status(200).json({
            iserror:false,
            message:"coupoun added succesfully"
        })
    }
})
//remove coupoun
routes.put("/remove-coupoun/:cpid",async(req,res)=>{
    let cpid = req.params.cpid;
    if(!cpid) {
        return res.status(400).json({
            iserror:true,
            error:"invalid input",
        })
    }
    let cp = await Coupoun.findOne({_id:new mongoose.Types.ObjectId(cpid)});
    if(!cp) {
        return res.status(400).json({
            iserror:true,
            error:"something went wrong",
        })
    }
    cp.isexpired = true;
    await cp.save();
    return res.status(200).json({
        iserror:false,
        message:"coupoun removed",
    })
});
//check copun banana jo frontedn se call ayege aur use coupen ma backend se he bajuga
//use coupoun
routes.post("use-coupoun", async(req,res)=>{
    let {coupoun , userid, productid} = req.body;
    let cp = Coupoun.find({coupoun_code:coupoun , productid:productid});
    if(!cp) {
        return res.status(204).json({
            isvalid:false,
            iserro:false,
            validmessage:"coupoun does not exist",
            discount_percent :0,
        })
    }
    if(cp.isexpires) {
        return res.staus(400).json({
            iserro:false,
            isvalidL:false,
            validmessage:"not exist",
            discount_percent:0,
        })
    }
    else if(cp.isLimited_qty && cp.qty == 0) {
        cp.isexpires = true;
        await cp.save();
        return res.status(204).json({
            isvalid:false,
            iserror:false,
            validmessage:"coupoun is expired",
            discount_percent:0,
        })//check for error here
    }else if(cp.islimited_time ){
        let time = cp.validity_time;
        if(new Date().toDateString > time) {
            cp.isexpires = true;
            return res.status(400).json({
                iserror:true,
                isvalid:false,
                validmessage:"coupunt validaity time expires",
                discount_percent:0,
            })
        }
    }
    if(cp.issingleuser) {
        let id = cp._id;
        let checkuser = await cpused.find({_id:id});
        if(!checkuser.usedby[userid]) {
            return res.status(400).json({
                iserror:false,
                isvalid:false,
                validmessage:"you already used this coupoun",
                discount_percent:0,
            })
        }else {
            checkuser.usedby[userid] = 1;
            if(cp.isLimited_qty) {
                cp.qty = cp.qty-1;
            }
            
            let per = cp.coupoun_discount_percentage; 
            await cp.save();
            await cpused.save();
            return res.status(200).json({
                iserror:false,
                isvalid:true,
                validmessage:"coupoun applied",
                discount_percent:per,
            })
        }
    };
    let per = cp.coupoun_discount_percentage;
    if(isLimited_qty) {
        cp.qty = cp.qty-1;
        await cp.save();
    }
    return res.status(200).json({
        iserror:false,
        isvalid:true,
        validmessgae:"coupoun applied",
        discount_percent:per,
    })
});
//remove coupoun

//add review , //delete review , update review 
routes.post("/add-review/:productid", async(req,res)=>{
    try {
        let urlimage = await uploadimg2(req.files.images);
        let urlvideo = await uploadimg2(req.files.videos);
        let img1 = urlimage[0].url;
        let vid1 = urlvideo[0].url;
        if(!img1 || !vid1) {
            return res.status(400).josn({
                iserror:true,
                error:"invalid input",
            });
        }
        let userid = new mongoose.Types.ObjectId(req.body.user);
        let {title , message ,rating} = req.body;
        let product = await Product.findOne({_id:new mongoose.Types.ObjectId(req.params.productid)});
        if(!product) {
            return res.status(400).json({
                iserror:true,
                error:"invalid request",
            })
        }
        let userreview = await review.create({userid:userid , sellerid : product.ownerid,productid :product._id, rating_title:title , rating:rating, rating_message:message, created_date:new Date().toDateString, updated_date:new Date().toDateString,
            images:img1 ,videos:vid1
        });
        return res.status(200).json({
            iserror:false,
            error:"",
            message:"review added",
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
//add to cart
routes.post('/add-to-cart', async (req, res) => {
    try {
        const { userid, productid, price } = req.body;
        const id = new ObjectId(userid);
        let users = await User.findById(id);
        if (users.cart.products[productid]) {
            users.cart.products[productid] += 1;
        } else {
            users.cart.products[productid] = 1;
        }
        users.cart.count += 1;
        users.cart.total = Number(users.cart.total) + Number(price);
        users.markModified('cart');
        let user;
        user = await users.save();
        user = users.toJson();
        // console.log(user);
        res.status(200).json({user});
    } catch (error) {
        res.status(400).send(error.message);
    }
})
//get cart
routes.post("/getcart" , async(req,res)=>{
    const {id} = req.body;
    console.log(id);
    try{
    const user = await User.findById(new ObjectId(id));
    if(!user) {
        return res.json(201).json("user not found");
    }
    let productsid = Object.keys(user.cart.products).map((id)=>new ObjectId(id));
    let dta = await Product.find({'_id':{$in:productsid}});
    console.log(dta);
    res.status(200).json('');
}catch (e){
        res.status(201).json({"error":e.message});
    }

})
//increse cart qty
routes.post('/increase-cart', async (req, res) => {
    const { userid, productid, price } = req.body;
    try {
        let users = await User.findById(new ObjectId(userid));
        users.cart.products[productid] += 1;
        users.cart.count += 1;
        users.cart.total += Number(price)
        users.markModified('cart');
        let user;
        user = await users.save();
        user = users.toJson();
        res.status(200).json({user});
    } catch (e) {
        res.status(400).send(e.message);
    }
})
routes.post('/decrease-cart', async (req, res) => {
    const { userid, productid, price } = req.body;
    try {
        let userdta = await User.findById(new ObjectId(userid));
        userdta.cart.products[productid] -= 1;
        userdta.cart.count -= 1;
        userdta.cart.total -= Number(price);
        userdta.markModified('cart');
        let user;
        user = await userdta.save();
        user = userdta.toJson();
        res.status(200).json({user});
    } catch (e) {
        res.status(400).send(e.message);
    }
})
//remove from cart
routes.post('/remove-from-cart', async (req, res) => {
    const { userid, productid, price } = req.body;
    try {
        const users = await User.findById(userid);
        users.cart.total -= Number(users.cart.products[productid]) * Number(price);
        users.cart.count -= users.cart.products[productid];
        delete users.cart.products[productid];
        users.markModified('cart');
        let user  = await users.save();
        user = user.toJson();
        res.status(200).json({user});
    } catch (e) {
        res.status(400).send(e.message);
    }})
    module.exports = routes;