const express =require('express');
const app=express();
const mongoose = require('mongoose');
require('dotenv').config()
const User=require('./modal/User')
var cors = require('cors')
const cron = require("node-cron");
mongoose.connect(process.env.MONGODBURI);
app.use(cors()); 
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Server is working fine")
})
app.use('/',require('./routes/SignUp'));
app.use('/',require('./routes/Login'));
cron.schedule("0 0 */2 * * *", async ()=> {
    deleteUser();
});

const deleteUser=async()=>{
    let response=await User.find();
    for (const data of response) {
        let time=Date.now()-data.date.getTime();//7200000
        if(time>7200000 && data.confirmation===false){//2 hours =7200000 milliseconds
            await User.findByIdAndDelete(data._id)
        }
    }
}

app.listen(process.env.PORT,()=>{
    console.log(`The Server is Live on http://localhost:${process.env.PORT}`);
})