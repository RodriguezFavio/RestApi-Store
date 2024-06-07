const express = require('express');

const productController = require('../controllers/products');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProduct);

module.exports = router;
