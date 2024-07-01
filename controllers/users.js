const UserService = require('../service/users');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserService.find();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.findById(id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UserService.create(body);

    res.status(201).json({ message: 'created user successfully', user });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await UserService.update(id, updateData);

    res.status(201).json({ message: 'updated user successfully', updatedUser });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await UserService.delete(id);

    res.status(200).json({ message: 'deleted user successfully' });
  } catch (err) {
    next(err);
  }
};
