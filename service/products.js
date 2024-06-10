const Product = require('../model/products');
const { products } = require('../database/data');

class ProductService {
  static findById(id) {
    return products.find((product) => product.id === id);
  }

  static async getProducts() {
    return products;
  }

  static addProduct(productData) {
    const product = new Product(productData);
    products.push(product);
    return product;
  }

  static async updateProduct(id, updateData) {
    const product = this.findById(id);
    if (product) {
      Object.assign(product, updateData);
      return product;
    }

    return null;
  }

  static async deleteProduct(id) {
    const product = this.findById(id);

    if (product) {
      const index = products.indexOf(product);
      products.splice(index, 1);
      return product;
    }
    console.log(product);
    return null;
  }
}

module.exports = ProductService;
