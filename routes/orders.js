const express = require('express');
const passport = require('passport');

const ordersControllers = require('../controllers/orders');
const validatorHandler = require('../middleware/validator');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('../schemas/orders');

const router = express.Router();

router.get('/orders', ordersControllers.getOrders);

router.get(
  '/orders/:id',
  validatorHandler(getOrderSchema, 'params'),
  ordersControllers.getOrder
);

router.post(
  '/orders',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(createOrderSchema, 'body'),
  ordersControllers.postOrder
);

router.post(
  '/orders/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  ordersControllers.postAddItem
);

module.exports = router;
