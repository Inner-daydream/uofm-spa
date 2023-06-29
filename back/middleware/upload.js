const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");
//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${nanoid.nanoid()}.${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 20 * 1000000 }, // 20MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});



const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg|webp/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};

module.exports = upload;