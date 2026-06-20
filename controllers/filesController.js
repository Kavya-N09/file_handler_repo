
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

// exports.createFiles = async (req, res) => {
//   try {
//     console.log("===== Upload API Called =====");

//     console.log("Body:", req.body);
//     console.log("File:", req.file);

//     const { name } = req.body;

//     if (!req.file) {
//       console.log("No file received");
//       return res.status(400).json({
//         msg: "Please upload file"
//       });
//     }

//     let fileUrl;

//     console.log("NODE_ENV =", process.env.NODE_ENV);

//     if (process.env.NODE_ENV === "production") {
//       fileUrl = req.file.path;
//     } else {
//       fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     }

//     console.log("File URL:", fileUrl);

//     const new_file = await Files.create({
//       name,
//       file_upload: fileUrl
//     });

//     console.log("Saved successfully");

//     res.status(201).json({
//       msg: "New data created!",
//       new_file
//     });

//   } catch (err) {
//     console.error(err);
//     console.error(err.stack);

//     res.status(500).json(err);
//   }
// };


exports.createFiles = async(req,res)=>{
    try{
        console.log("===== req.file =====");
        console.log(req.file);
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
    catch (err) {
    console.error("Controller Error Trace:", JSON.stringify(err, null, 2));
    console.error("Error Message Text:", err.message);
    
    return res.status(500).json({
        message: err.message || "An unexpected controller error occurred"
    });
}
}