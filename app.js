var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv").config();
var cors = require('cors');
const mongoose = require("mongoose");
const passport = require('passport');
require('./passport');

const mongoDb = 'mongodb+srv://ecommerce:ecommerce@cluster0.inanp3j.mongodb.net/e-commerce?retryWrites=true&w=majority';
// const mongoDb = process.env.DATA_BASE_CONNECTION_STRING;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// db.on('open', function () {
//   db.db.listCollections().toArray(function (err, names) {
    
//     if (err) {
//       console.log(err);
//       return;
//     }

//     const filtered = names.map(arry => {
//       return arry.name;
//     })
//     console.log (filtered);
//   });
// });

var indexRouter = require('./routes/index');
const colorRouter = require('./routes/color');
const sizeRouter = require('./routes/size');
const materialRouter = require('./routes/material');
const careRouter = require('./routes/care');
const fitRouter = require('./routes/fit');
const genderRouter = require('./routes/gender');
const collectionRouter = require('./routes/collection');
const userRouter = require('./routes/user');
const { resolve } = require('path');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter, collectionRouter, userRouter);
app.use('/admin', colorRouter, sizeRouter, materialRouter, careRouter, fitRouter, genderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// product - name price description color size materials care fit reviews(possibly)
// users
// admin
// reviews -- foregin schema
// color -- foregin schema done
// size -- foregin schema done 
// materials -- foregin schema  done
// care -- foregin schema done
// fit -- foregin schema done
