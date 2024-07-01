const express = require('express');

const userController = require('../controllers/users');
const validatorHandler = require('../middleware/validator');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/users');

const router = express.Router();

router.get('/users', userController.getUsers);

router.get(
  '/users/:id',
  validatorHandler(getUserSchema, 'params'),
  userController.getUser
);

router.post(
  '/users',
  validatorHandler(createUserSchema, 'body'),
  userController.postUser
);

router.patch(
  '/users/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  userController.updateUser
);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;
