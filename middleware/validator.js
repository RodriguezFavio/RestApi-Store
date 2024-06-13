const APIError = require('../utils/error');

const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(new APIError(400, error.message));
    }
    next();
  };
};

module.exports = validatorHandler;
