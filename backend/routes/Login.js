const express=require('express');
const router=express.Router();
const User=require('../modal/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')


router.post('/login',async (req,res)=>{
    let response=await User.findOne({ email:req.body.email })
    .then(user => {
        //if user not exist than return status 400
        if (!user) return res.status(400).json({ msg: "User not exist" })

        //if user exist than compare password
        //password comes from the user
        //user.password comes from the database
        bcrypt.compare(req.body.password, user.password, (err, data) => {
            //if error than throw error
            if (err) throw err

            //if both match than you can do anything
            if (data) {
                if(user.confirmation){
                    let token=jwt.sign({name:user.name},"thisisthesecret");
                    return res.status(200).json({ msg: "Login success",success:true,token:token })
                }
                else{
                    return res.status(401).json({ msg: "Please Confirm Your Email" })
                }
            } else {
                return res.status(401).json({ msg: "Invalid credencial" })
            }

        })

    })

})
        
    
    







module.exports=router;