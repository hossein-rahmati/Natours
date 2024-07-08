const morgan = require('morgan');
const express = require('express');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userTouter');

// MIDDLEWARES
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
