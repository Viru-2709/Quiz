let CATEGORY = require('../Model/Category')
var jwt = require('jsonwebtoken');
let ADMIN = require('../Model/Admin')

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
exports.Add_Category = async function (req, res, next) {
    try {
        console.log(req.body)
        console.log(req.file);
        req.body.image = req.file.filename
        if (!req.body.categoryname || !req.body.image)
            throw new Error("Please fill all fields")
        const category = await CATEGORY.create(req.body)
        res.status(201).json({
            stastus: "Created",
            Message: "Category has been created successfully.",
            data: category
        })
    } catch (error) {
        res.status(404).json({
            stastus: "fail",
            Message: error.message
        })
    }
}

exports.All_Category = async function (req, res, next) {
    try {
        const category = await CATEGORY.find()
        res.status(200).json({
            stastus: "Found",
            Message: "Category has been Founded successfully.",
            data: category

        })
    } catch (error) {
        res.status(404).json({
            stastus: "fail",
            Message: error.message
        })
    }
}

exports.Update_Category = async function (req, res, next) {
    try {
        console.log(req.params.id);
        const category = await CATEGORY.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            stastus: "Updated",
            Message: "Category has been Updated successfully.",
            data: category
        })
    } catch (error) {
        res.status(404).json({
            stastus: "fail",
            Message: error.message
        })
    }
}

exports.Delete_Category = async function (req, res, next) {
    try {
        const category = await CATEGORY.findByIdAndDelete(req.params.id)
        res.status(200).json({
            stastus: "Deleted",
            Message: "Category has been deleted successfully."
        })
    } catch (error) {
        res.status(404).json({
            stastus: "fail",
            Message: error.message
        })
    }
}