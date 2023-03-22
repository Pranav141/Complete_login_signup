const express=require('express');
const router=express.Router();
const User=require('../modal/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcrypt');
const sendMail=require('../controllers/sendMail')
router.get('/',(req,res)=>{
    res.send("Hello I am routes ");
})
router.post('/signup',
    body('email','Please Enter an email').isEmail(),
    body('password','Password must be more than 8 characters').isLength({min:8}),
    body('email').custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
            return Promise.reject('E-mail already in use');
        }
      })
    ,async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const salt= await bcrypt.genSalt(10);
        let hash=await bcrypt.hash(req.body.password,salt);
        const response=await User.create({name:req.body.name,email:req.body.email,password:hash})
        let userId=response._id.toString();
        let url=`http://localhost:5000/confirmation/${userId}`
        sendMail(req.body.email,url);
        res.json({success:true,response:response});
    }
)
router.get('/confirmation/:id',async (req,res)=>{
    try {
        let temp=await User.findById(req.params.id);
        if(temp.confirmation){
            res.send(`<h3>Email is already confirmed ${temp.name}</h3>`)
        }
        else{
            let response=await User.findByIdAndUpdate(req.params.id,{confirmation:true})
            // console.log(response);
            res.send(`<h3>Your email is confirmed ${response.name}</h3>`);
        }
        
    } catch (error) {
        res.send('Link is Expired');    
    }
})
module.exports=router;