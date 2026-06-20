
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

let storage;

if(process.env.NODE_ENV === "production"){
    storage = new CloudinaryStorage({
        cloudinary,
        params:{
            folder:"pdf_folder",
            resource_type:"raw",
            public_id:Date.now() + "-" + file.originalname.replace(".pdf", ""),
            format: "pdf",
        }
    })
}else{
    storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"uploads/");
        },

        filename:(req,file,cb)=>{
            const uniqueName = Date.now() + "-" + file.originalname;
            cb(null,uniqueName);
        }
    })
}


const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "application/pdf"){
        cb(null,true);
    }else{
        cb(new Error("only pdf files are allowed"),false);
    }
};

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:5 * 1024 * 1024
    }
});

module.exports = upload;


