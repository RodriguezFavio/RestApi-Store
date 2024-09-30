const express = require('express');
const passport = require('passport');

const profileController = require('../controllers/profile');

const router = express.Router();

router.get(
  '/profile/my-orders',
  passport.authenticate('jwt', { session: false }),
  profileController.getMyOrders
);

module.exports = router;
