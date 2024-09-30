const APIError = require('../utils/error');

const { config } = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];

  if (apiKey === config.apiKey) {
    next();
  } else {
    const error = new APIError(401, 'Unauthorized');
    next(error);
  }
};

const checkAdminRole = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    next();
  } else {
    const error = new APIError(403, 'Forbidden');
    next(error);
  }
};

const checkRole = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) {
      next();
    } else {
      const error = new APIError(403, 'Forbidden');
      next(error);
    }
  };
};

module.exports = { checkApiKey, checkAdminRole, checkRole };
