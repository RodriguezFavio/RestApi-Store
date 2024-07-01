const CategoryService = require('../service/categories');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.find();

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.findById(id);

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

exports.postCategory = async (req, res, next) => {
  try {
    const { body } = req;
    const category = await CategoryService.create(body);

    res
      .status(201)
      .json({ message: 'created category successfully', category });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCategory = await CategoryService.update(id, updateData);

    res
      .status(201)
      .json({ message: 'updated category successfully', updatedCategory });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await CategoryService.delete(id);

    res.status(200).json({ message: 'deleted category successfully' });
  } catch (err) {
    next(err);
  }
};
