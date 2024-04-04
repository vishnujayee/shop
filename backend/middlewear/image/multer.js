const multer = require("multer");
const storage = multer.memoryStorage();
// const multerUploads = multer({ storage });
const upload = new multer({
    storage
})
module.exports =   upload ;