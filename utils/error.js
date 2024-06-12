class APIError extends Error {
  httpStatusCode;
  constructor(httpStatusCode, message) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = APIError;
