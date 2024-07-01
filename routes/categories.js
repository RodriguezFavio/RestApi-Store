const express = require('express');

const categoriesControllers = require('../controllers/categories');
const validatorHandler = require('../middleware/validator');
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
  validatorHandler(createCategorySchema, 'body'),
  categoriesControllers.postCategory
);

router.patch(
  '/categories/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  categoriesControllers.updateCategory
);

router.delete('/categories/:id', categoriesControllers.deleteCategory);

module.exports = router;
