const express = require('express');
const passport = require('passport');

const authControllers = require('../controllers/auth');
const validatorHandler = require('../middleware/validator');
const {
  loginAuthSchema,
  recoverySchema,
  changePasswordSchema,
} = require('../schemas/auth');

const router = express.Router();

router.post(
  '/login',
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', { session: false }),
  authControllers.postLogin
);

router.post(
  '/recovery',
  validatorHandler(recoverySchema, 'body'),
  authControllers.postMail
);

router.post(
  '/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  authControllers.postNewPassword
);

module.exports = router;
