const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config({path: '../config/index.env'})

const transporter = nodemailer.createTransport({
    host: process.env.SERVICE,
    /* port: 465,
    secure: true, */
  /*   logger: true,
    debug: true,
    ignoreTLS: true , */
    // add this 
    auth: {
      user: process.env.USER,
		pass: process.env.EMAILPASS,
        
    },
  });

module.exports = transporter;