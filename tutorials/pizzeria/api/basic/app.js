var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var pizzaRouter = require('./routes/pizzas');
var usersRouter = require('./routes/users');


var app = express();

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    console.log(req.method.path)

    next();
    
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/pizzas', pizzaRouter);
app.use('/users', usersRouter);



module.exports = app;
