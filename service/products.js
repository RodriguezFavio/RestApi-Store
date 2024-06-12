const { faker } = require('@faker-js/faker');

const Product = require('../model/products');
const APIError = require('../utils/error');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      const product = new Product({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });

      this.products.push(product);
    }
  }

  async getProducts() {
    return this.products;
  }

  async findById(id) {
    return this.products.find((product) => product.id === id);
  }

  async addProduct(productData) {
    const id = faker.string.uuid();
    const product = new Product({ id, ...productData });
    this.products.push(product);
    return product;
  }

  async updateProduct(id, updateData) {
    const product = await this.findById(id);
    if (!product) {
      throw new APIError(404, 'Product Not Found!');
    }

    Object.assign(product, updateData);

    return product;
  }

  async deleteProduct(id) {
    const product = await this.findById(id);

    if (!product) {
      throw new APIError(404, 'Product Not Found!');
    }
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    return product;
  }
}

module.exports = ProductService;
