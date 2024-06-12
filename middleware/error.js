const APIError = require('../utils/error');

exports.errorMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    res.status(err.httpStatusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
  next();
};
