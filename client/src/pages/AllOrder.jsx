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
    console.log("resonsedata",orders)
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
    <div className="p-4 max-w-full mx-auto">

      <h1 className="text-xl font-semibold mb-4 text-blue-600 shadow p-2 rounded">
        All Orders
      </h1>

      {orders.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No Orders Found ❌</div>
      )}

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-sm p-4 bg-white"
          >
            {/* USER */}
            <div className="mb-2">
 <h5 className=" text-sm bg-blue-100 border border-blue-500 rounded-2xl px-5 py-1"> Order_ID: #{order?._id}</h5>
              <h2 className="font-semibold text-lg"> {order.userInfo?.name}</h2>
              <p className="text-sm text-gray-600">{order.userInfo?.email}</p>
              {order.userInfo?.mobile && (
                <p className="text-sm text-gray-600">
                  Mobile: {order.userInfo.mobile}
                </p>
              )}
            </div>

            {/* STATUS SECTION */}
            <div className="flex gap-3 mb-3">

              {/* Payment Status */}
              <div
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  statusColors[order.paymentStatus]
                }`}
              >
                Payment: {order.paymentStatus}
              </div>

              {/* Order Status */}
              <div
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  statusColors[order.orderStatus]
                }`}
              >
                Status: {order.orderStatus}
              </div>

            </div>

            <hr className="my-2" />

            {/* ADDRESS */}
            <div className="text-sm mb-2">
              <p className="font-medium text-gray-800"> Delivery Address:</p>
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

            <hr className="my-2" />

            {/* PRODUCTS */}
            <div className="space-y-2">
              <p className="font-medium text-gray-800 mb-1">🛒 Products:</p>

              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border rounded-md p-2"
                >
                  <img
                    src={item.image?.[0]}
                    className="w-14 h-14 rounded object-cover"
                    alt="product"
                  />

                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Price: ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-2" />

         {/* TOTAL + CREATED DATE */}
<div className="flex justify-between items-center">
  <div className="text-gray-700">
    Payment Method: <span className="font-semibold">{order.paymentMethod}</span>
  </div>

  <div className="text-right">
    <p className="text-green-700 font-semibold text-lg">
      ₹{order.totalAmount}
    </p>
    <p className="text-sm text-gray-500">
      Ordered on: {new Date(order.createdAt).toLocaleString("en-IN", {
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
