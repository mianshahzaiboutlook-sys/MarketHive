import React from "react";
import { useCart } from "../context/cart";
import axios from "axios";
import { useAuth } from "../context/auth";

export default function Cart() {
  const { cart, clearCart } = useCart();
  const [auth] = useAuth();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleCheckout = async () => {
    if (!auth?.token) return alert("Login first");
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/orders/create",
        { items: cart, total },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      alert("Order placed");
      clearCart();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((i) => (
              <li key={i.product}>
                {i.name} x {i.qty} = PKR {i.price * i.qty}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: PKR {total}</p>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
