const nodemailer = require('nodemailer');
require('dotenv').config()
const sendMail=async(userEmail,url)=>{
    // let testAccount = await nodemailer.createTestAccount()
        
    
    const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        service:"gmail",
        auth: {
            user: process.env.email,
            pass: process.env.password
        }
    });
    var message = {
        from: process.env.email,
        to: userEmail,
        subject: "Account Verification",
        text: "Plaintext version of the message",
        html: `<p>Please click on the link to confirm Your account with us. ${url}</p>`
      };
    let info=await transporter.sendMail(message);
    // res.send("I am sending mail");
}
module.exports=sendMail;