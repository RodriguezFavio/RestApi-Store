const CustomerService = require('../service/customers');

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await CustomerService.find();

    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

exports.getCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await CustomerService.findById(id);

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

exports.postCustomer = async (req, res, next) => {
  try {
    const { body } = req;
    const customer = await CustomerService.create(body);

    res
      .status(201)
      .json({ message: 'created customer successfully', customer });
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCustomer = await CustomerService.update(id, updateData);

    res
      .status(201)
      .json({ message: 'updated customer successfully', updatedCustomer });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    await CustomerService.delete(id);

    res.status(200).json({ message: 'deleted customer successfully' });
  } catch (err) {
    next(err);
  }
};
