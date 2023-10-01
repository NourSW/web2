const express = require('express');
// eslint-disable-next-line no-unused-vars
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const pizzaRouter = require('./routes/films');
const usersRouter = require('./routes/users');

const app = express();

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  console.log(req.method.path);

  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/films', pizzaRouter);
app.use('/users', usersRouter);

module.exports = app;
