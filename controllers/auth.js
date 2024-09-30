const AuthService = require('../service/auth');

exports.postLogin = async (req, res, next) => {
  try {
    const user = req.user;

    const auth = await AuthService.signToken(user);

    res.status(200).json(auth);
  } catch (err) {
    next(err);
  }
};

exports.postMail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const mail = await AuthService.recoveryPassword(email);
    res.status(200).json(mail);
  } catch (err) {
    next(err);
  }
};

exports.postNewPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const result = await AuthService.changePassword(token, newPassword);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
