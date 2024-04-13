let ADMIN = require('../Model/Admin')
const bcrypt =  require("bcrypt");
var jwt = require('jsonwebtoken');

exports.Secure = async function (req, res, next) {
    try {
        let token =req.headers.token
        if(!token){
            throw new Error("Please attach token")
        }
        var decode = jwt.verify(token , "ADMIN")
        const checkuser = await ADMIN.findById(decode.id)
        console.log(checkuser);
        if (!checkuser) {
            throw new Error("User Not Found!");
        }
        req.adminId = decode.id
        next()
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            Message: error.message
        })
    }
}

exports.Admin_signup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password , 10);
        const data = await ADMIN.create(req.body)
        res.status(201).json({
            status: "Done",
            Message: "Admin Created",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            Message: error.message
        })
    }
}

exports.Admin_login = async function (req,res,next){
    try {
        let checkuser = await ADMIN.findOne({email : req.body.email});
        if(!checkuser){
            throw new Error("Admin Not Found");
        }
        let checkpassword = await  bcrypt.compare(req.body.password , checkuser.password );
        if (!checkpassword) {
            throw new Error("Please Enter Valid Password");
        }
        var token = jwt.sign({id:checkuser._id},"ADMIN")
        res.status(200).json({
            status:"done",
            Message: 'Login Successful',
            data:checkuser,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            Message: error.message
        })
    }
}