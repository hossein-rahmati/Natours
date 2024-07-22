const morgan = require('morgan');
const express = require('express');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userTouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
