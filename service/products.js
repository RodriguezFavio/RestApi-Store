const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const APIError = require('../utils/error');

class ProductService {
  static async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset, price, price_min, price_max } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }
    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }

    const products = await models.Product.findAll(options);

    return products;
  }

  static async findById(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw new APIError(404, 'Product not found');
    }
    return product;
  }

  static async create(productData) {
    const product = await models.Product.create(productData);

    return product;
  }

  static async update(id, updateData) {
    const product = await this.findById(id);
    const result = await product.update(updateData);

    return result;
  }

  static async deleteProduct(id) {
    const product = await this.findById(id);
    const result = await product.destroy();

    return result;
  }
}

module.exports = ProductService;
