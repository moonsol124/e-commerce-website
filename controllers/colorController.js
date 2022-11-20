const async = require('async');
const Color = require('../models/color');
const { body, validationResult } = require("express-validator");

exports.get_colors = function(req, res, next) {
    async.parallel({
        colors(callback) {
            Color.find({}, {}).exec(callback);
        }
    }, 
    (err, colors) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, colors: colors};
        res.status(200).json(message);
    })
}

exports.create = [
    body("name", "required and maximum length is 15")
        .trim()
        .isLength({max:15})
        .escape(),
    body("rgbValue", "required and maximum length is 15")
        .trim()
        .isLength({max:15})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const color = new Color({
            name: req.body.name,
            rgbValue: req.body.rgbValue,
        })
        color.save((err, color) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:200, color: color}
            return res.status(200).json(message);
        })
    }
]

exports.get_color = function(req, res, next) {
    console.log(req.params.colorId);
    async.parallel({
        color(callback) {
            Color.findById(req.params.colorId).exec(callback);
        }
    }, 
    (err, color) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, color: color};
        return res.status(200).json(message);
    })
}

exports.update = [
    body("name", "required and maximum length is 15")
        .trim()
        .isLength({max:15})
        .escape(),
    body("rgbValue", "required and maximum length is 15")
        .trim()
        .isLength({max:15})
        .escape(),
    function(req, res, next) {
        const errors = validationResult(req);
        async.parallel({
            color(callback) {
                Color.findById(req.params.colorId).exec(callback);
            }
        }, (err, color) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const updatedColor = new Color({
                _id: req.params.colorId,
                name: req.body.name,
                rgbValue: req.body.rgbValue,
            })

            Color.findByIdAndUpdate(req.params.colorId, updatedColor, {}, (err) => {
                if (err) {
                    const message = {message: err, status:400}
                    return res.status(400).json(message);
                }
                const message = {message: 'OK', status:201, color: color};
                return res.status(201).json(message);
            })
        })
    }
]

exports.delete = function(req, res, next) {
    async.parallel({
        color(callback) {
            Color.findById(req.params.id).exec(callback); 
        }
    }, (err, color) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        
        Color.findByIdAndRemove(req.params.colorId, (err, result) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:201, result: result};
            return res.status(201).json(message);
        })
    })
}