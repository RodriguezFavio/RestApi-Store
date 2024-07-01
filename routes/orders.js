const express = require('express');

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
  '/orders/add-item',
  validatorHandler(addItemSchema, 'body'),
  ordersControllers.postOrder
);

// router.patch(
//   '/orders/:id',
//   validatorHandler(getOrderSchema, 'params'),
//   validatorHandler(updateCustomerSchema, 'body'),
//   ordersControllers.updateCustomer
// );

// router.delete('/orders/:id', ordersControllers.deleteCustomer);

module.exports = router;
