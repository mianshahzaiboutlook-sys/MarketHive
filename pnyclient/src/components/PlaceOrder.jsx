import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../hepler/toastify.js";
import { useAuth } from "../context/auth.jsx";
import axios from "axios";

const PlaceOrder = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const [userInfo, setUserInfo] = useState({
    name: auth?.user?.username || "",
    email: auth?.user?.email || "",
    phone: "",
    address: "",
  });

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.phone ||
      !userInfo.address
    ) {
      return errorToast("Please fill in all fields!");
    }

    if (cart.length === 0) {
      return errorToast("Your cart is empty!");
    }

    if (!auth?.token) {
      return errorToast("Please login to place order.");
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/orders/create",
        {
          items: cart,
          userInfo,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setLoading(false);
      successToast("Order placed successfully!");
      dispatch({ type: "CLEAR_CART" });
      navigate("/");
    } catch (err) {
      setLoading(false);
      errorToast(err.response?.data?.message || "Order failed");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Info Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
          <form className="flex flex-col gap-4">
            <label className="font-medium mb-0">Full Name</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-2 rounded"
            />
            <label className="font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border p-2 rounded"
            />
            <label className="font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-2 rounded"
            />
            <label className="font-medium">Address</label>

            <textarea
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="border p-2 rounded"
            />
          </form>
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Image</th>
                <th className="p-2">Product</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2">
                    <img
                      src={`http://localhost:8080/uploads/${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">PKR {item.price}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">PKR {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: PKR {totalPrice}</h2>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
