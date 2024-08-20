"use strict";

var morgan = require('morgan');

var express = require('express');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var MongoSanitize = require('express-mongo-sanitize');

var xss = require('xss-clean');

var hpp = require('hpp');

var path = require('node:path');

var tourRouter = require('./routes/tourRouter');

var userRouter = require('./routes/userRouter');

var reviewRouter = require('./routes/reviewRoutes');

var AppError = require('./utils/appError');

var globalErrorHandler = require('./controllers/errorController');

var app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); //Middlewares
// Serving static files

app.use(express["static"](path.join(__dirname, 'public'))); //Set security HTTP headers

app.use(helmet()); // Development logging

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // Limit requests from same API


var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again in an hour.'
});
app.use('/api', limiter); // Body parser, reading data from body into req.body

app.use(express.json({
  limit: '10kb'
})); // Data sanitization against NoSql query injection

app.use(MongoSanitize()); // Data sanitization against XSS

app.use(xss()); // Prevents parameter pollution

app.use(hpp({
  whitelist: ['duration', 'ratingsAverage', 'ratingsQunatity', 'maxGroupSize', 'difficulty', 'price']
})); // Routes

app.get('/', function (req, res) {
  res.status(200).render('base', {
    tour: 'The Forest Hiker'
  });
});
app.get('/overview', function (req, res) {
  res.status(200).render('overview', {
    title: 'All Tours'
  });
});
app.get('/tour', function (req, res) {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour'
  });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', function (req, res, next) {
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server"), 404));
});
app.use(globalErrorHandler);
module.exports = app;