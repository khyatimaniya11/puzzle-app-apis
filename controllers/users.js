const USER = require('../model/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// user: "italiyadhruv9@gmail.com",
// pass: "eysgkzfrwtqlkasx",

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "italiyadhruv9@gmail.com",
        pass: "eysgkzfrwtqlkasx",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'italiyadhruv9@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Welcome to Surat", // Subject line
        // text: "Hello world?", // plain text body
        html: "<h1>This is testing mail</h1>", // html body
    });

    console.log("Message sent: %s", info.messageId);

}


exports.Secure = async function (req, res, next) {
    try {
        // check valid token
        // console.log(req.headers.authorization);
        let token = req.headers.authorization

        if (!token) {
            throw new Error("Please attach token")
        }

        var decoded = jwt.verify(token, 'CDMI');
        console.log(decoded.id);

        const checkUser = await USER.findById(decoded.id)

        if (!checkUser) {
            throw new Error("User not found")
        }

        next()
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.SignUp = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.gender) {
            throw new Error("Please enter valid fields")
        }
        req.body.password = await bcrypt.hash(req.body.password, 8)
        const data = await USER.create(req.body)
        var token = jwt.sign({ id: data._id }, 'CDMI');

        res.status(201).json({
            status: "success",
            message: "Signup successful",
            data,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.login = async function (req, res, next) {
    try {
        if (!req.body.email || !req.body.password) {
            throw new Error("Please enter valid fields")
        }
        const checkUser = await USER.findOne({ email: req.body.email })
        console.log(checkUser);
        if (!checkUser) {
            throw new Error("Please enter valid email")
        }

        const checkPass = await bcrypt.compare(req.body.password, checkUser.password)
        if (!checkPass) {
            throw new Error("Please enter valid password")
        }
        var token = jwt.sign({ id: checkUser._id }, 'CDMI');
        await main(checkUser.email)
        res.status(201).json({
            status: "success",
            message: "Signup successful",
            data: checkUser,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}