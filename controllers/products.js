const ProductService = require('../service/products');
const APIError = require('../utils/error');

exports.getProducts = async (req, res, next) => {
  try {
    const query = req.query;
    const products = await ProductService.find(query);
    if (!products) {
      throw new APIError(404, 'Products List Not Found!');
    }
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductService.findById(id);
    if (!product) {
      throw new APIError(404, 'Product Not Found!');
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.postProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const product = await ProductService.create(body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await ProductService.update(id, updateData);
    if (!updatedProduct) {
      throw new APIError(404, 'Product Not Found!');
    }
    res.status(201).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductService.delete(id);
    if (!product) {
      throw new APIError(404, 'Product Not Found!');
    }
    res.status(200).json({ message: 'Product deleted successfully', product });
  } catch (err) {
    next(err);
  }
};
