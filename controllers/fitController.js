const async = require('async');
const Fit = require('../models/fit');
const { body, validationResult } = require("express-validator");

exports.get_fits = function(req, res, next) {
    async.parallel({
        fits(callback) {
            Fit.find({}, {}).exec(callback);
        }
    }, 
    (err, fits) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, fits: fits};
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
        const fit = new Fit({
            name: req.body.name,
        })
        fit.save((err, fit) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:200, fit: fit}
            return res.status(200).json(message);
        })
    }
]

exports.get_fit = function(req, res, next) {
    async.parallel({
        fit(callback) {
            Fit.findById(req.params.fitId).exec(callback);
        }
    }, 
    (err, fit) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, fit: fit};
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
            fit(callback) {
                Fit.findById(req.params.fitId).exec(callback);
            }
        }, (err, fit) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const updatedfit = new Fit({
                _id: req.params.fitId,
                name: req.body.name,
            })

            Fit.findByIdAndUpdate(req.params.fitId, updatedfit, {}, (err) => {
                if (err) {
                    const message = {message: err, status:400}
                    return res.status(400).json(message);
                }
                const message = {message: 'OK', status:201, fit: fit};
                return res.status(201).json(message);
            })
        })
    }
]

exports.delete = function(req, res, next) {
    async.parallel({
        fit(callback) {
            Fit.findById(req.params.fitId).exec(callback); 
        }
    }, (err, fit) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        
        Fit.findByIdAndRemove(req.params.fitId, (err, result) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:201, fit: result}
            return res.status(201).json(message);
        })
    })
}