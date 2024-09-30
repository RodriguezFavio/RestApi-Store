const APIError = require('../utils/error');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  static async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  static async find() {
    const result = await models.User.findAll({ include: ['customer'] });
    return result;
  }

  static async findByEmail(email) {
    const result = await models.User.scope('withPassword').findOne({
      where: { email },
    });

    return result;
  }

  static async findById(id) {
    const user = await models.User.findByPk(id, {
      include: ['customer'],
    });
    if (!user) {
      throw new APIError(404, 'User Not Found');
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

module.exports = UserService;
