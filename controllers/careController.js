const async = require('async');
const Care = require('../models/care');
const { body, validationResult } = require("express-validator");

exports.get_cares = function(req, res, next) {
    async.parallel({
        cares(callback) {
            Care.find({}, {}).exec(callback);
        }
    }, 
    (err, cares) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, cares: cares};
        res.status(200).json(message);
    })
}

exports.create = [
    body("name", "required and maximum length is 50")
        .trim()
        .isLength({max:50})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const care = new Care({
            name: req.query.name,
        })
        care.save((err, care) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:200, care: care}
            return res.status(200).json(message);
        })
    }
]

exports.get_care = function(req, res, next) {
    async.parallel({
        care(callback) {
            Care.findById(req.params.careId).exec(callback);
        }
    }, 
    (err, care) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, care: care};
        return res.status(200).json(message);
    })
}

exports.update = [
    body("name", "required and maximum length is 50")
        .trim()
        .isLength({max:50})
        .escape(),
    function(req, res, next) {
        const errors = validationResult(req);
        async.parallel({
            care(callback) {
                Care.findById(req.params.careId).exec(callback);
            }
        }, (err, care) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const updatedcare = new Care({
                _id: req.params.careId,
                name: req.query.name,
            })

            Care.findByIdAndUpdate(req.params.careId, updatedcare, {}, (err) => {
                if (err) {
                    const message = {message: err, status:400}
                    return res.status(400).json(message);
                }
                const message = {message: 'OK', status:201, care: care};
                return res.status(201).json(message);
            })
        })
    }
]

exports.delete = function(req, res, next) {
    async.parallel({
        care(callback) {
            Care.findById(req.params.careId).exec(callback); 
        }
    }, (err, care) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        
        Care.findByIdAndRemove(req.params.careId, (err, result) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:201, care: result}
            return res.status(201).json(message);
        })
    })
}