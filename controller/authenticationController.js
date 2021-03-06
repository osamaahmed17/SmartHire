const traineeModel = require('../model/traineeModel')
const otpGenerator = require('otp-generator');


const sendOTP = function (email, response) {
    const nodemailer = require('nodemailer');
    console.log(process.env.username)
    var transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        secure: true,
        port: 465,
        auth: {
            user: process.env.username,
            pass: process.env.password
        }
    });
    
    var otp = otpGenerator.generate(6, { alphabets: false, specialChars: false, upperCase: false });
    console.log(otp + " " + email);
    let body = {
        from:  process.env.username,
        to: email,
        subject: 'One Time Password from SmartHire',
        html: `<h2>Hello your OTP for email verification is <span style='background:yellow'> ${otp} <span></h2> 
        <br/> <u>please not share this OTP with anyone</u>`
    }
    const responseClass = new authenticationController();
    transporter.sendMail(body, function (error, result) {
     
        if (error) {
            
            responseClass.errorResponse.data = "Invalid Email or Server Error"
            responseClass.errorResponse.error = error
            return response.status(500).send(responseClass.errorResponse)
        }

        responseClass.response.data = "OTP Sent Successfully"
        responseClass.response.otp = otp
        responseClass.response.result = result
        return response.status(200).send(responseClass.response)

    })
}

class authenticationController {
    constructor() {

        this.verifyEmail = this.verifyEmail.bind(this);
        this.response = {
            success: true,
            data: "",
        }
        this.errorResponse = {
            success: false,
            error: "",
        };

    };

    async verifyEmail(req, res) {
        const responseClass = new authenticationController();
        const condition = req.body.condition;
        console.log(req.body.email)
        console.log(req.body.condition)
        traineeModel.findOne({ 'email': req.body.email }, function (error, present) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            if (condition === 'signup') {
                if (present) {
                    responseClass.errorResponse.error = "Email is already registred"
                    return res.status(500).send(responseClass.errorResponse)
                }
                else {
                    console.log("Hi")
                    sendOTP(req.body.email, res);
                }
            } else if (condition === 'forgotpassword') {
                if (!present) {
                    responseClass.errorResponse.error = "Email is not registered, kindly signup"
                    return res.status(500).send(responseClass.errorResponse)
                } else {
                    sendOTP(req.body.email, res);
                }
            }

        });
    }
}



module.exports = new authenticationController;