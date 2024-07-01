const APIError = require('../utils/error');
const { ValidationError } = require('sequelize');

exports.errorMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    res.status(err.httpStatusCode).json({ message: err.message });
  } else if (err instanceof ValidationError) {
    res.status(409).json({ error: err.errors[0].message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(err);
  }
};
