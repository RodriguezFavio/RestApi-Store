const OrderService = require('../service/orders');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.find();

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await OrderService.findById(id);

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const { body } = req;
    const order = await OrderService.addItem(body);

    res.status(201).json({ message: 'created order successfully', order });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedOrder = await OrderService.update(id, updateData);

    res
      .status(201)
      .json({ message: 'updated order successfully', updatedOrder });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    await OrderService.delete(id);

    res.status(200).json({ message: 'deleted order successfully' });
  } catch (err) {
    next(err);
  }
};
