const CATEGORY = require('../model/category')

exports.AllCategory = async function (req, res, next) {
    try {
        const data = await CATEGORY.find()
        res.status(201).json({
            status: "success",
            message: "All Data Get successful",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.AddCategory = async function (req, res, next) {
    try {
        console.log(req.body);
        req.body.image = req.file.filename
        if (!req.body.name || !req.body.image) {
            throw new Error("Please enter valid fields")
        }
        const data = await CATEGORY.create(req.body)
        res.status(201).json({
            status: "success",
            message: "All Data Get successful",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.UpdateCategory = async function (req, res, next) {
    try {
        // console.log(req.body);
        if (req.file) {
            req.body.image = req.file.filename
        }
        const data = await CATEGORY.findByIdAndUpdate(req.query.id, req.body, { new: true })
        res.status(201).json({
            status: "success",
            message: "All Data update successful",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.DeleteCategory = async function (req, res, next) {
    try {
        const data = await CATEGORY.findByIdAndDelete(req.query.id)
        res.status(201).json({
            status: "success",
            message: "All Data update successful",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}