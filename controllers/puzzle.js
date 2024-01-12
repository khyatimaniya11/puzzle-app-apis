const PUZZLE = require('../model/puzzle')

exports.AllPuzzle = async function (req, res, next) {
    try {
        const data = await PUZZLE.find()
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

exports.AddPuzzle = async function (req, res, next) {
    try {
        console.log(req.body);
        req.body.image = req.file.filename
        if (!req.body.answer || !req.body.image || !req.body.category) {
            throw new Error("Please enter valid fields")
        }
        const data = await PUZZLE.create(req.body)
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

exports.UpdatePuzzle = async function (req, res, next) {
    try {
        // console.log(req.body);
        if (req.file) {
            req.body.image = req.file.filename
        }
        const data = await PUZZLE.findByIdAndUpdate(req.query.id, req.body, { new: true })
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

exports.DeletePuzzle = async function (req, res, next) {
    try {
        const data = await PUZZLE.findByIdAndDelete(req.query.id)
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