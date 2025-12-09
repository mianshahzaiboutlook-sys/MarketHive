import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { successToast } from "../hepler/toastify.js";
import { useAuth } from "../context/auth.jsx";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const increaseQty = (id) => dispatch({ type: "INCREASE_QTY", payload: id });
  const decreaseQty = (id) => dispatch({ type: "DECREASE_QTY", payload: id });

  const removeItem = (id, name) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    successToast(`${name} removed from cart`);
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    successToast("Cart cleared!");
  };



  const goToCheckout = () => {
    if (!auth?.token) {
      successToast("Please login to proceed to checkout.");
      return navigate("/login");
    }else {
      navigate("/place-order");
    }
    
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Total</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <img
                    src={`http://localhost:8080/uploads/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">PKR {item.price}</td>
                <td className="p-3 flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item._id)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </td>
                <td className="p-3">PKR {item.price * item.quantity}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => removeItem(item._id, item.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold">Total: PKR {totalPrice}</h2>
          <div className="flex gap-2">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={goToCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
