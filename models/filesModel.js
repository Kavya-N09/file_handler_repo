
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    file_upload:{
        type:String,
        required:true
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Files",fileSchema);