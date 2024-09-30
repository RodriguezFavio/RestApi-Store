const express = require('express');
const passport = require('passport');

const categoriesControllers = require('../controllers/categories');
const validatorHandler = require('../middleware/validator');
const { checkRole } = require('../middleware/auth');
const {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} = require('../schemas/categories');

const router = express.Router();

router.get('/categories', categoriesControllers.getCategories);

router.get(
  '/categories/:id',
  validatorHandler(getCategorySchema, 'params'),
  categoriesControllers.getCategory
);

router.post(
  '/categories',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validatorHandler(createCategorySchema, 'body'),
  categoriesControllers.postCategory
);

router.patch(
  '/categories/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  categoriesControllers.updateCategory
);

router.delete(
  '/categories/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  categoriesControllers.deleteCategory
);

module.exports = router;
