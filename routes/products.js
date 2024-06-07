const express = require('express');

const productController = require('../controllers/products');
const { APISTORE } = process.env;

const router = express.Router();

router.get(`${APISTORE}/products`, productController.getProducts);

router.get(`${APISTORE}/products/:id`, productController.getProduct);

router.post(`${APISTORE}/products`, productController.postProduct);

module.exports = router;
