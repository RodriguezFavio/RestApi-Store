const APIError = require('../utils/error');
const { models } = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  static async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  static async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  static async findById(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw new APIError(404, 'Category Not Found');
    }
    return category;
  }

  static async update(id, updateData) {
    const category = await this.findById(id);
    const result = await category.update(updateData);
    return result;
  }

  static async delete(id) {
    const category = await this.findById(id);
    const result = await category.destroy();
    return result;
  }
}

module.exports = CategoryService;
