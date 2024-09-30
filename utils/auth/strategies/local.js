const { Strategy } = require('passport-local');

const AuthService = require('../../../service/auth');

const LocalStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await AuthService.getUser(email, password);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = LocalStrategy;
