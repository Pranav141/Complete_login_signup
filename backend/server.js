const express =require('express');
const app=express();
const mongoose = require('mongoose');
require('dotenv').config()
// const User=require('./modal/User')
var cors = require('cors')
const cron = require("node-cron");
mongoose.connect(process.env.MONGODBURI);
app.use(cors()); 
app.use(express.json())
app.use('/',require('./routes/SignUp'));
app.use('/',require('./routes/Login'));
cron.schedule("*/30 * * * * *", async ()=> {
    
});
app.listen(process.env.PORT,()=>{
    console.log(`The Server is Live on http://localhost:${process.env.PORT}`);
})