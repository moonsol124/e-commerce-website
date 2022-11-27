const async = require('async');
const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.get_users = function(req, res, next) {
    async.parallel({
        users(callback) {
            User.find({}, {}).exec(callback);
        }
    }, 
    (err, users) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, users: users};
        res.status(200).json(message);
    })
}

exports.create = [
    body("username", "required, max length 50, min length 1")
        .trim()
        .isLength({max:50, min: 1})
        .escape(),
    body("password", "required, max length 50, min length 1")
        .trim()
        .isLength({max:50, min: 1})
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                isAdmin: false,
            })
            user.save((err, user) => {
                if (err) {
                    const message = {message: err, status:400}
                    return res.status(400).json(message);
                }
                const message = {message: "OK", status:200, user: user}
                return res.status(200).json(message);
            })
        })
    }
]

exports.get_user = function(req, res, next) {
    async.parallel({
        user(callback) {
            User.findById(req.params.userId).exec(callback);
        }
    }, 
    (err, user) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        const message = {message: 'OK', status:200, user: user};
        return res.status(200).json(message);
    })
}

exports.update = [
    body("username", "required, max length 50, min length 1")
        .trim()
        .isLength({max:50, min: 1})
        .escape(),
    body("password", "required, max length 50, min length 1")
        .trim()
        .isLength({max:50, min: 1})
        .escape(),
    function(req, res, next) {
        const errors = validationResult(req);
        async.parallel({
            user(callback) {
                User.findById(req.params.userId).exec(callback);
            }
        }, (err, user) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            bcrypt.hash(req.query.password, 10, (err, hashedPassword) => {
                const userFound = new User({
                    _id: req.params.userId,
                    username: req.query.username,
                    password: hashedPassword,
                    isAdmin: user.isAdmin,
                })
                User.findByIdAndUpdate(req.params.userId, userFound, {}, (err) => {
                    if (err) {
                        const message = {message: err, status:400}
                        return res.status(400).json(message);
                    }
                    const message = {message: 'OK', status:201, user: user};
                    return res.status(201).json(message);
                })
            })
        })
    }
]

exports.delete = function(req, res, next) {
    async.parallel({
        user(callback) {
            User.findById(req.params.userId).exec(callback); 
        }
    }, (err, user) => {
        if (err) {
            const message = {message: err, status:400}
            return res.status(400).json(message);
        }
        
        User.findByIdAndRemove(req.params.userId, (err, result) => {
            if (err) {
                const message = {message: err, status:400}
                return res.status(400).json(message);
            }
            const message = {message: "OK", status:201, user: result}
            return res.status(201).json(message);
        })
    })
}

exports.login = function(req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) {
            const message = {message: 'Something is not right', error: err, user : user, status:400}
            return res.status(400).json(message);
        }
        if (!user) {
            const message = {message: "Username or passwords do not match", user: user, status:400}
            return res.status(400).json(message);
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                return res.send(err);
            }  
            const token = jwt.sign({user: user}, 'your_jwt_secret', {expiresIn: '1h'});
            const message = {message: "Login successful", token: token, user: user, status: 200};
            return res.status(200).json(message);
        });
    })(req, res);
}

exports.logout = function(req, res, next) {
    return res.cookie('jwt', '', { maxAge: 1});
}