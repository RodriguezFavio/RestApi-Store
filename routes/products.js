const express = require('express');
const passport = require('passport');

const productController = require('../controllers/products');
const validatorHandler = require('../middleware/validator');
const {
  addProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/products');

const router = express.Router();

router.get(
  '/products',
  validatorHandler(queryProductSchema, 'query'),
  productController.getProducts
);

router.get(
  '/products/:id',
  validatorHandler(getProductSchema, 'params'),
  productController.getProduct
);

router.post(
  '/products',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addProductSchema, 'body'),
  productController.postProduct
);

router.patch(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  productController.updateProduct
);

router.delete(
  '/products/:id',
  passport.authenticate('jwt', { session: false }),
  productController.deleteProduct
);

module.exports = router;
