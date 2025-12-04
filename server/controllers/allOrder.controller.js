import AllOrderModel from "../models/allOrder.model.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await AllOrderModel.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: orders
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getAllOrderAsPerUser = async (req, res) => {
  try {
    const userId = req.userId; // 🔥 JWT middleware se aa raha hai


    const orders = await AllOrderModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
console.log("order",orders)
    return res.json({
      success: true,
      data: orders
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

