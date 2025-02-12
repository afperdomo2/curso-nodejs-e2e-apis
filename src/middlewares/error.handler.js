const { ValidationError } = require('sequelize');

const { config } = require('../config/config');

function logErrors(err, req, res, next) {
  if (config.env === 'dev') {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  next(err);
}

function errorHandler(err, req, res) {
  if (res.status) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    return;
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
