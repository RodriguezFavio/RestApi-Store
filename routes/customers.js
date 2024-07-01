const express = require('express');

const customersControllers = require('../controllers/customers');
const validatorHandler = require('../middleware/validator');
const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customers');

const router = express.Router();

router.get('/customers', customersControllers.getCustomers);

router.get(
  '/customers/:id',
  validatorHandler(getCustomerSchema, 'params'),
  customersControllers.getCustomer
);

router.post(
  '/customers',
  validatorHandler(createCustomerSchema, 'body'),
  customersControllers.postCustomer
);

router.patch(
  '/customers/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  customersControllers.updateCustomer
);

router.delete('/customers/:id', customersControllers.deleteCustomer);

module.exports = router;
