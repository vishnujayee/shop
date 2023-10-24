const cloudimg = require('cloudinary');
const routes = require('express').Router();
require('dotenv').config();
cloudimg.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
})
routes.delete('/:public_id',async(req,res)=>{
    const publicid = req.params;
    try {
        await cloudimg.uploader.destroy(publicid);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
})
module.exports = routes;