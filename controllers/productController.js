const { faker } = require('@faker-js/faker');

const ProductService = require('../service/productService');

exports.getProduct = async (req, res, next) => {
  try {
    const { size } = req.query;
    const products = await ProductService.createProduct(faker, size);

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};
