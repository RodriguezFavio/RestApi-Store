const express = require('express');

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
  validatorHandler(addProductSchema, 'body'),
  productController.postProduct
);

router.patch(
  '/products/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  productController.updateProduct
);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
