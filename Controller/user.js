const USER = require('../Model/User')
const bcrypt = require("bcrypt");


exports.user_signup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await USER.create(req.body)
        res.status(201).json({
            status: "DOne",
            Message: "User Creadted",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            Message: error.message
        })
    }
}

exports.user_login = async function (req, res, next) {
    try {
        const checkuser = await USER.findOne({ email: req.body.email })
        if (!checkuser) {
            throw new Error("User not Found")
        }
        const checkpassword = await bcrypt.compare(req.body.password, checkuser.password)
        if (!checkpassword) {
            throw new Error("Please Enter Valid Password")
        }
        res.status(200).json({
            status: "Done",
            Message: "User Login",
            data: checkuser
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            Message: error.message
        })
    }
}