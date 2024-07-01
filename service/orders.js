const APIError = require('../utils/error');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  static async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  static async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  static async find() {
    const result = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return result;
  }

  static async findById(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          attributes: ['id', 'name'],
          include: [
            {
              association: 'user',
              attributes: ['id', 'email'],
            },
          ],
        },
        {
          association: 'items',
          attributes: ['id', 'name', 'price'],
        },
      ],
    });
    if (!order) {
      throw new APIError(404, 'Order Not Found');
    }
    return order;
  }

  static async update(id, updateData) {
    const order = await this.findById(id);
    const result = await order.update(updateData);
    return result;
  }

  static async delete(id) {
    const order = await this.findById(id);
    const result = await order.destroy();
    return result;
  }
}

module.exports = OrderService;
