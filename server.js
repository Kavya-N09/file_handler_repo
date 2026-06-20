
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();
const filesRoutes = require('./routes/filesRoutes');

const express = require('express');
const app = express();

app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use('/api/files',filesRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log(`Server started running at port ${PORT} ...`)
});