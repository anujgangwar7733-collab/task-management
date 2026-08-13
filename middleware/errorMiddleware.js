const mongoose = require('mongoose');

// Middleware to validate MongoDB ObjectId parameters
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Task ID format'
    });
  }
  next();
};

// Middleware to handle 404 Not Found routes
const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';

  // Handle Mongoose Validation Errors (e.g., missing title or invalid enum value)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Handle Mongoose Cast Error (e.g., invalid ID format)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field: ${err.path}`;
  }

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = {
  validateObjectId,
  notFound,
  errorHandler
};
