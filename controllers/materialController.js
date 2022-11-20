const async = require('async');
const Material = require('../models/material');
const { body, validationResult } = require("express-validator");

exports.get_materials = function(req, res, next) {
    async.parallel({
        materials(callback) {
            Material.find({}, {}).exec(callback);
        }
    }, 
    (err, materials) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, materials: materials};
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
        const material = new Material({
            name: req.query.name,
        })
        material.save((err, material) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:200, material: material}
            return res.status(200).json(message);
        })
    }
]

exports.get_material = function(req, res, next) {
    async.parallel({
        material(callback) {
            Material.findById(req.params.materialId).exec(callback);
        }
    }, 
    (err, material) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, material: material};
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
            material(callback) {
                Material.findById(req.params.materialId).exec(callback);
            }
        }, (err, material) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const updatedmaterial = new Material({
                _id: req.params.materialId,
                name: req.query.name,
            })

            Material.findByIdAndUpdate(req.params.materialId, updatedmaterial, {}, (err) => {
                if (err) {
                    const message = {message: err, status:400}
                    return res.status(400).json(message);
                }
                const message = {message: 'OK', status:201, material: material};
                return res.status(201).json(message);
            })
        })
    }
]

exports.delete = function(req, res, next) {
    async.parallel({
        material(callback) {
            Material.findById(req.params.materialId).exec(callback); 
        }
    }, (err, material) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        
        Material.findByIdAndRemove(req.params.materialId, (err, result) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:201, material: result}
            return res.status(201).json(message);
        })
    })
}