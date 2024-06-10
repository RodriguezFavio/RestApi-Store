const ProductService = require('../service/products');
const { products } = require('../database/data');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await ProductService.getProducts();
    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }
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
    const product = ProductService.addProduct(body);
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await ProductService.updateProduct(id, updateData);
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(201).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductService.deleteProduct(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
