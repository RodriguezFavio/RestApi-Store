const express = require('express');

const productController = require('../controllers/products');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProduct);

router.post('/products', productController.postProduct);

router.patch('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
