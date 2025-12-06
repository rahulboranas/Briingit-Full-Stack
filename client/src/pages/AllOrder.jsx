import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",

  PLACED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummeryApi.getAllOrders });

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600 font-medium">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-4 bg-orange-50 max-w-full mx-auto">
      
      {/* ORANGE HEADER */}
      <h1 className="text-2xl font-bold mb-6 text-white bg-orange-600 px-4 py-3 rounded-xl shadow">
         All Orders
      </h1>

      {orders.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No Orders Found 
        </div>
      )}

      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-orange-200 shadow-md rounded-xl p-5 bg-white hover:shadow-xl transition-all duration-300"
          >
            {/* ORDER HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h5 className="text-sm font-semibold bg-orange-100 text-orange-700 border border-orange-400 rounded-full px-4 py-1 inline-block">
                  Order ID: #{order._id}
                </h5>
                <h2 className="font-bold text-xl mt-2 text-gray-900">
                  {order.userInfo?.name}
                </h2>
                <p className="text-sm text-gray-600">{order.userInfo?.email}</p>
                {order.userInfo?.mobile && (
                  <p className="text-sm text-gray-600">
                    Mobile: {order.userInfo.mobile}
                  </p>
                )}
              </div>
            </div>

            {/* STATUS SECTION */}
            <div className="flex flex-wrap gap-3 mb-3">
              <div
                className={`px-3 py-1 rounded-lg text-sm font-semibold shadow-sm ${statusColors[order.paymentStatus]}`}
              >
                Payment: {order.paymentStatus}
              </div>

              <div
                className={`px-3 py-1 rounded-lg text-sm font-semibold shadow-sm ${statusColors[order.orderStatus]}`}
              >
                Status: {order.orderStatus}
              </div>
            </div>

            <hr className="my-3" />

            {/* ADDRESS */}
            <div className="text-sm mb-3">
              <p className="font-semibold text-gray-800 mb-1">
                 Delivery Address:
              </p>
              <p>{order.deliveryAddress.address_line}</p>
              <p>
                {order.deliveryAddress.city}, {order.deliveryAddress.state}
              </p>
              <p>
                {order.deliveryAddress.pincode},{" "}
                {order.deliveryAddress.country}
              </p>
              <p>Mobile: {order.deliveryAddress.mobile}</p>
            </div>

            <hr className="my-3" />

            {/* PRODUCTS */}
            <div className="space-y-2">
              <p className="font-semibold text-gray-800 mb-1">🛍 Products:</p>

              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 shadow-sm"
                >
                  <img
                    src={item.image?.[0]}
                    className="w-16 h-16 rounded object-cover border"
                    alt="product"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-3" />

            {/* TOTAL */}
            <div className="flex justify-between items-center">
              <div className="text-gray-700">
                Payment Method:{" "}
                <span className="font-semibold">{order.paymentMethod}</span>
              </div>

              <div className="text-right">
                <p className="text-green-700 font-extrabold text-xl">
                  ₹{order.totalAmount}
                </p>
                <p className="text-sm text-gray-500">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AllOrders;
