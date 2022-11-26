const async = require('async');
const Size = require('../models/size');
const { body, validationResult } = require("express-validator");

exports.get_sizes = function(req, res, next) {
    async.parallel({
        sizes(callback) {
            Size.find({}, {}).exec(callback);
        }
    }, 
    (err, sizes) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, sizes: sizes};
        res.status(200).json(message);
    })
}

exports.create = [
    body("name", "required and maximum length is 15")
        .trim()
        .isLength({max:15})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const size = new Size({
            name: req.body.name,
        })
        size.save((err, size) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:200, size: size}
            return res.status(200).json(message);
        })
    }
]

exports.get_size = function(req, res, next) {
    async.parallel({
        size(callback) {
            Size.findById(req.params.sizeId).exec(callback);
        }
    }, 
    (err, size) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, size: size};
        return res.status(200).json(message);
    })
}

exports.update = [
    body("name", "required and maximum length is 15")
        .trim()
        .isLength({max:15})
        .escape(),
    function(req, res, next) {
        const errors = validationResult(req);
        async.parallel({
            size(callback) {
                Size.findById(req.params.sizeId).exec(callback);
            }
        }, (err, size) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const updatedSize = new Size({
                _id: req.params.sizeId,
                name: req.body.name,
            })

            Size.findByIdAndUpdate(req.params.sizeId, updatedSize, {}, (err) => {
                if (err) {
                    const message = {message: err, status:400}
                    return res.status(400).json(message);
                }
                const message = {message: 'OK', status:201, size: size};
                return res.status(201).json(message);
            })
        })
    }
]

exports.delete = function(req, res, next) {
    async.parallel({
        size(callback) {
            Size.findById(req.params.sizeId).exec(callback); 
        }
    }, (err, size) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        
        Size.findByIdAndRemove(req.params.sizeId, (err, result) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:201, size: result}
            return res.status(201).json(message);
        })
    })
}