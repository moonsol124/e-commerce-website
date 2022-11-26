const async = require('async');
const Gender = require('../models/gender');
const { body, validationResult } = require("express-validator");

exports.get_genders = function(req, res, next) {
    async.parallel({
        genders(callback) {
            Gender.find({}, {}).exec(callback);
        }
    }, 
    (err, genders) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, genders: genders};
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
        const gender = new Gender({
            name: req.body.name,
        })
        gender.save((err, gender) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:200, gender: gender}
            return res.status(200).json(message);
        })
    }
]

exports.get_gender = function(req, res, next) {
    async.parallel({
        gender(callback) {
            Gender.findById(req.params.genderId).exec(callback);
        }
    }, 
    (err, gender) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, gender: gender};
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
            gender(callback) {
                Gender.findById(req.params.genderId).exec(callback);
            }
        }, (err, gender) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const updatedgender = new Gender({
                _id: req.params.genderId,
                name: req.body.name,
            })

            Gender.findByIdAndUpdate(req.params.genderId, updatedgender, {}, (err) => {
                if (err) {
                    const message = {message: err, status:400}
                    return res.status(400).json(message);
                }
                const message = {message: 'OK', status:201, gender: gender};
                return res.status(201).json(message);
            })
        })
    }
]

exports.delete = function(req, res, next) {
    async.parallel({
        gender(callback) {
            Gender.findById(req.params.genderId).exec(callback); 
        }
    }, (err, gender) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        
        Gender.findByIdAndRemove(req.params.genderId, (err, result) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:201, gender: result}
            return res.status(201).json(message);
        })
    })
}