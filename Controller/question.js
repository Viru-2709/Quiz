let QUESTION = require('../Model/Question')
var jwt = require('jsonwebtoken');
let ADMIN = require('../Model/Admin');

exports.Secure = async function (req, res, next) {
    try {
        let token = req.headers.token
        if (!token) {
            throw new Error("Please attach token")
        }
        var decode = jwt.verify(token, "ADMIN")
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

exports.Addquestion = async function (req, res, next) {
    try {
        const question = await QUESTION.create(req.body)
        res.status(201).json({
            status: "Created",
            message: "Question has been Created successfully",
            data: question
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.Allquestion = async function (req, res, next) {
    try {
        const question = await QUESTION.find().populate("category")
        res.status(200).json({
            status: "Found",
            message: "Question has been Found successfully",
            data: question
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.updatequestion = async function(req , res ,next){
    try {
        const question = await QUESTION.findByIdAndUpdate(req.params.id , req.body)
        res.status(201).json({
            status: "Updated",
            message: "Question has been Updated successfully",
            data: question
        })
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            Message:error.message
        })
    }
}

exports.deletequestion = async function(req ,res, next){
    try {
        const question = await QUESTION.findByIdAndDelete(req.params.id)
            res.status(201).json({
                status: "Deleted",
                message: "Question has been Deleted successfully",
            })
    } catch (error) {
            res.status(404).json({
                status:"Fail",
                Message:error.message
            })

    }
}