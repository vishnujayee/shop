const multer = require("multer");
//hints - > cloudinary need bas64 string and we have buffer
const multerupload =  multer({
    storage :multer.memoryStorage(),
    limits :{
        files:5,
    },
})

module.exports = {
    multerupload ,
}