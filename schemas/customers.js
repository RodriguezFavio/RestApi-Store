const Joi = require('joi');

const { createUserSchema, updateUserSchema } = require('./users');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string();
const phone = Joi.string().min(7);
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema,
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  user: updateUserSchema,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
