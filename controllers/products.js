const { faker } = require('@faker-js/faker');

const Product = require('../model/products');

const ProductService = require('../service/products');

exports.getProducts = async (req, res, next) => {
  try {
    const { size } = req.query;
    const products = await ProductService.createProduct(faker, size);

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductService.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.postProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const product = new Product(body);

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
