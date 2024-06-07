const Product = require('../model/products');
const products = [];

class ProductService {
  static async createProduct(productData, size) {
    const limit = size || 10;

    for (let index = 0; index < limit; index++) {
      const product = new Product({
        id: productData.string.uuid(),
        name: productData.commerce.productName(),
        price: parseInt(productData.commerce.price(), 10),
        image: productData.image.url(),
      });

      products.push(product);
    }

    return products;
  }

  static findById(id) {
    return products.find((product) => product.id === id);
  }
}

module.exports = ProductService;
