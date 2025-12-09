import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create Context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existing = state.find((p) => p._id === action.payload._id);
      if (existing) {
        return state.map((p) =>
          p._id === action.payload._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_FROM_CART":
      return state.filter((p) => p._id !== action.payload);

    case "INCREASE_QTY":
      return state.map((p) =>
        p._id === action.payload ? { ...p, quantity: p.quantity + 1 } : p
      );

    case "DECREASE_QTY":
      return state.map((p) =>
        p._id === action.payload && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

// Provider component
 const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], (initial) => {
    // Load from localStorage on init
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : initial;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);

export default CartProvider;
