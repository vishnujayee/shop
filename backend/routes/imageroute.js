const cloudimg = require('cloudinary');
const routes = require('express').Router();
const upload  = require('../middlewear/image/multer.js');
require('dotenv').config();
cloudimg.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
})
routes.delete('/:public_id', async (req, res) => {
    const publicid = req.params;
    try {
        await cloudimg.uploader.destroy(publicid);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
})
routes.post('/upload' , async(req,res)=>{
    let imgfile = fs.createWriteStream('image.png');
        req.pipe(imgfile).on('error', (err) => console.log(err)).on('finish', ()=>{
            console.log('ssved');
        })
    let urls = [];
    for(const image of img) {
        cloudimg.v2.uploader.upload(image).then((res)=> console.log(urls.push(res.json())));
    }
    return res.status(200).json(urls);
});



module.exports = routes
