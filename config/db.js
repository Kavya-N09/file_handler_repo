
const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully.👍");
    }
    catch(err){
        console.log("Error",err);
        process.exit(1);
    }
}

module.exports = connectDB;