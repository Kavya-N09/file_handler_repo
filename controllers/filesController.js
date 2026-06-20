
const Files = require('../models/filesModel');

exports.getAllFiles = async(req,res)=>{
    try{
        const files = await Files.find();
        if(files.length===0){
            return res.status(400).json({
                message:"No data found."
            });
        }
        res.status(200).json(files);
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
};

exports.createFiles = async(req,res)=>{
    try{
        const{name} = req.body;
        if(!req.file){
            return res.status(400).json({msg:"Please upload file"})                      
        }

        let fileUrl;
        if(process.env.NODE_ENV === "production"){
            fileUrl = req.file.path;
        }else{
            fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        }
         

        const new_file = await Files.create({
            name,file_upload:fileUrl
        });
        res.status(201).json({
            msg:"New data created!",
            new_file,
        })
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}