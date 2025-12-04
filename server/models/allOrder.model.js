import mongoose from "mongoose";

const allOrderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },

  userInfo: {
    name: String,
    email: String
  },

  deliveryAddress: {
    address_line: String,
    city: String,
    state: String,
    pincode: Number,
    country: String,
    mobile: Number
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product"
      },
      name: String,
      image: Array,
      price: Number,
      quantity: Number
    }
  ],

  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD"
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED"],
    default: "PENDING"
  },

  orderStatus: {
    type: String,
    enum: ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PLACED"
  },

  totalAmount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

const AllOrderModel = mongoose.model("allOrder", allOrderSchema);
export default AllOrderModel;
