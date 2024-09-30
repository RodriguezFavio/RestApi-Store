const OrderService = require('../service/orders');

exports.getMyOrders = async (req, res, next) => {
  try {
    const { sub } = req.user;
    const orders = await OrderService.findByUser(sub);

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
