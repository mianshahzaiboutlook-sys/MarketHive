import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { successToast } from "../hepler/toastify.js";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/products/${id}`);
        const data = await res.json();

        if (data.success) {
          setProduct(data.product);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ADD TO CART FUNCTION
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity: 1,
      },
    });

    successToast("Product added to cart!");
  };

  // Loading UI
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-pulse text-xl font-semibold text-gray-500">
          Loading product...
        </div>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* LEFT SIDE IMAGE */}
          <div className="flex justify-center items-center">
            <img
              src={`http://localhost:8080/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-[420px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mt-2 gap-2 text-yellow-500 text-lg font-medium">
              ⭐ {product.rating} <span className="text-gray-500">/ 5</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-red-600 mt-4">
              PKR {product.price}
            </p>

            {/* Description */}
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Extra Details */}
            <div className="mt-5 space-y-2 text-gray-700 text-lg">
              <p>
                <span className="font-semibold">Condition:</span>{" "}
                {product.condition}
              </p>

              <p>
                <span className="font-semibold">Stock:</span>{" "}
                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold">
                    {product.stock} available
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Out of stock
                  </span>
                )}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl text-lg font-semibold shadow hover:bg-green-700 transition-all"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl text-lg font-semibold shadow hover:bg-gray-300 transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
