const APIError = require('../utils/error');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  static async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  static async find() {
    const result = await models.Customer.findAll({
      include: ['user'],
    });
    return result;
  }

  static async findById(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw new APIError(404, 'Customer Not Found');
    }
    return user;
  }

  static async update(id, updateData) {
    const user = await this.findById(id);
    const result = await user.update(updateData);
    return result;
  }

  static async delete(id) {
    const user = await this.findById(id);
    const result = await user.destroy();
    return result;
  }
}

module.exports = CustomerService;
