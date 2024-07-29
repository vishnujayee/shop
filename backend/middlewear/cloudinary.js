let cloudinary = require("cloudinary");
let datauri = require("datauri/parser");
let parser =  new datauri();
let path = require("path");
require('dotenv').config();
// let cloudconfig = (req,res, next)=>{
    cloudinary.v2.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
    });
    // next();
// };
async function uploadhelper(file) {
    let extname = path.extname(file.originalname).toString();
    let file64 = parser.format(extname,file.buffer);//read code of datauri and cloudinary
    let res =   cloudinary.v2.uploader.upload(file64.content,(res)=>{
        return res;
    });
    // console.log(res);
    let url = res.url;
    let id = res.public_id;
    return {url , id};
}
async function uploadhelper2(files) {
    try{
        console.log("here");
    let images = files;
        let imgurl = [];
        for(let img of images) {
            console.log("also here");
            let extname = path.extname(img.originalname).toString();
        let file64 = parser.format(extname,img.buffer);//read code of datauri and cloudinary
            imgurl.push(cloudinary.v2.uploader.upload(file64.content));
        }
        imgurl = await  Promise.all(imgurl).catch(e=>e);
        console.log("here also");
        let url =  imgurl.filter((f)=>!(f instanceof Error));
        console.log(url);
        return url;}
        catch(e) {
            throw new Error(e.message);
        }
}
module.exports =  {uploadhelper , uploadhelper2};
