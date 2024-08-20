const morgan = require('morgan');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const MongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('node:path');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP headers
app.use(helmet());

// Development logging
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again in an hour.',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(MongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevents parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQunatity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Routes
app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
  });
});

app.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours',
  });
});

app.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
