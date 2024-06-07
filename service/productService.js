const Product = require('../model/product');

class ProductService {
  static async createProduct(productData, size) {
    const products = [];
    const limit = size || 10;

    for (let index = 0; index < limit; index++) {
      const product = new Product({
        id: productData.string.uuid(),
        name: productData.commerce.productName(),
        price: parseInt(productData.commerce.price(), 10),
        image: productData.image.imageUrl(),
      });

      products.push(product);
    }

    return products;
  }
}

module.exports = ProductService;
