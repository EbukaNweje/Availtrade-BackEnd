const User = require("../models/User")
const bcrypt = require("bcryptjs");
const createError = require("../utilities/error");
const jwt = require("jsonwebtoken")
const {validationResult } = require('express-validator');
const transporter = require("../utilities/email")


exports.register = async (req, res, next)=>{
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      User.findOne({ email }, async (err, user) => {
        // console.log(user)
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (user) { 
            return next(createError(400, "email already in use"))
        } 
        else if(!user){
         
        if(req.body.password !== req.body.confirmPassword){
            return next(createError(404, "Password does not match"))
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const hash2 = bcrypt.hashSync(req.body.confirmPassword, salt);
            
         const newUser = new User({ 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password:hash,
            confirmPassword: hash2,
            email: req.body.email,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            referenceId: req.body.referenceId
         })
         const token = jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin}, process.env.JWT, {expiresIn: "1d"})
         newUser.token = token

         await newUser.save()
         const mailOptions ={
            from: process.env.USER,
            to: newUser.email,
            subject: "Successful Registration",
          html: `
           <h4>Hi ${newUser.firstName} ${newUser.lastName}</h4>
           <p>
           Welcome to preeminentcryptotrade, your Number 1 online trading platform.

            Your Trading account has been set up successfully with login details:

            Email:  ${newUser.email}
            Password: The password you registered with.

            You can go ahead and fund your Trade account to start up your Trade immediately.

            Deposit through Bitcoin.

            For more enquiry kindly contact your account manager or write directly with our live chat support on our platform or you can send a direct mail to us at support@preeminentcryptotrade.com.

            Thank You for choosing our platform and we wish you a successful trading.

            preeminentcryptotrade TEAM (C)
           </p>
       
            `,
        }
  
        transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }
        })
         res.status(201).json({
            message: "User has been created.",
            data: newUser
        })
        }
      })
      
    }catch(err){
        next(err)
    }
}


exports.login = async (req, res, next)=>{
    try{
        const Users = await User.findOne({email: req.body.email})
        if(!Users) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, Users.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"))

        const token1 = jwt.sign({id:Users._id, isAdmin:Users.isAdmin}, process.env.JWT, {expiresIn: "1d"})
        Users.token = token1

        await Users.save()

        const {token, password, isAdmin, ...otherDetails} = Users._doc

        //  res.cookie("access_token", token, {
        //     httpOnly: true, 
        //  }).

        const mailOptions ={
            from: process.env.USER,
            to: Users.email,
            subject: "Successful Login!",
          html: `
           <h4>Dear ${Users.firstName} ${Users.lastName}</h4>
           <p>Welcome back!</p>
           <p> You have logged in successfully to Preeminentcryptotrade</p>
           <p>If you did not initiate this, change your password immediately and send our Customer Center a email to <br/> ${process.env.USER}
           </p>
           <p>Why send this email? We take security very seriously and we want to keep you in the loop of activities on your account.</p>
            `,
        }
  
        transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }
        })

         res.status(200).json({...otherDetails})
    }catch(err){
        next(err)
    }
}
