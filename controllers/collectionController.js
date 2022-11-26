const async = require('async');
const Collection = require('../models/collection');
const Care = require('../models/care');
const Color = require('../models/color');
const Fit = require('../models/fit');
const Size = require('../models/size');
const Material = require('../models/material');
const Gender = require('../models/gender');
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

exports.get_collections = function(req, res, next) {
    async.parallel({
        collections(callback) {
            Collection.find({}, {}).exec(callback);
        }
    }, 
    (err, collections) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, collections: collections};
        res.status(200).json(message);
    })
}

exports.create = [
    body("name", "required and maximum length is 50")
        .trim()
        .isLength({max:50})
        .escape(),
    body("fotoUrl", "required")
        .trim()
        .escape(),
    body("price", "required")
        .trim()
        .escape(),
    body("description", "required and maximum length is 300")
        .trim()
        .isLength({max:300})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const collection = new Collection({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            fotoUrl: req.body.fotoUrl,
            color: req.body.color,
            care: req.body.care,
            size: req.body.size,
            fit: req.body.fit,
            gender: req.body.gender,
            material: req.body.material,
        })
        console.log (collection);
        collection.save((err, collection) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:200, collection: collection}
            return res.status(200).json(message);
        })
    }
]

exports.get_collection = function(req, res, next) {
    async.parallel({
        collection(callback) {
            Collection.findById(req.params.collectionId).exec(callback);
        }
    }, 
    (err, collection) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, collection: collection};
        return res.status(200).json(message);
    })
}

exports.update = [
    body("name", "required and maximum length is 50")
        .trim()
        .isLength({max:50})
        .escape(),
    body("fotoUrl", "required")
        .trim()
        .escape(),
    body("price", "required")
        .trim()
        .escape(),
    body("description", "required and maximum length is 300")
        .trim()
        .isLength({max:300})
        .escape(),
    body("color", "required")
        .trim()
        .escape(),
    body("size", "")
        .trim()
        .escape(),
    body("material", "")
        .trim()
        .escape(),
    body("fit", "")
        .trim()
        .escape(),
    body("care", "")
        .trim()
        .escape(),
    body("gender", "required")
        .trim()
        .escape(),
    function(req, res, next) {
        const errors = validationResult(req);
        async.parallel({
            collection(callback) {
                Collection.findById(req.params.collectionId).exec(callback);
            }
        }, (err, collection) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const updatedcollection = new Collection({
                _id: req.params.collectionId,
                name: req.body.name,
            })

            Collection.findByIdAndUpdate(req.params.collectionId, updatedcollection, {}, (err) => {
                if (err) {
                    const message = {message: err, status:400}
                    return res.status(400).json(message);
                }
                const message = {message: 'OK', status:201, collection: collection};
                return res.status(201).json(message);
            })
        })
    }
]

exports.delete = function(req, res, next) {
    async.parallel({
        collection(callback) {
            Collection.findById(req.params.collectionId).exec(callback); 
        }
    }, (err, collection) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        
        Collection.findByIdAndRemove(req.params.collectionId, (err, result) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:201, collection: result}
            return res.status(201).json(message);
        })
    })
}


exports.get_db_collections = function(req, res, next) {
    const mongoDb = process.env.DATA_BASE_CONNECTION_STRING;
    mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "mongo connection error"));
    db.on('open', function () {
        db.db.listCollections().toArray(function (err, names) {
          return res.status(200).json({message:"ok"});
        });
    });
}