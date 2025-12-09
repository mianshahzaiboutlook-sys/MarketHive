// import React from "react";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="bg-white  rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 border">
//       {/* Product Image */}
//       <img
//         src={`http://localhost:8080/uploads/${product.image}`}
//         alt={product.name}
//         className="w-full h-56 object-cover rounded-t-xl"
//       />

//       <div className="p-4">
//         <h2 className="font-semibold text-lg text-gray-800">{product.name}</h2>

//         <p className="text-gray-500 mt-1">PKR {product.price}</p>

//         {/* Rating */}
//         <div className="flex items-center mt-2 text-yellow-500 gap-1">
//           ⭐ {product.rating}
//         </div>

//         {/* Condition */}
//         <p className="text-sm text-gray-600 mt-1">
//           Condition: <span className="font-semibold">{product.condition}</span>
//         </p>

//         {/* Stock */}
//         <p className="text-sm text-gray-600">
//           Stock: <span className="font-semibold">{product.stock}</span>
//         </p>

//         <div className="flex mt-4 gap-2">
//           <Link
//             to={`/product/${product._id}`}
//             className="flex-1 bg-blue-600 text-center text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             View Details
//           </Link>

//           <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { successToast } from "../hepler/toastify.js";

 const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    // alert(`${product.name} added to cart!`);
     successToast(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 border">
      <img
        src={`http://localhost:8080/uploads/${product.image}`}
        alt={product.name}
        className="w-full h-56 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800">{product.name}</h2>
        <p className="text-gray-500 mt-1">PKR {product.price}</p>
        <div className="flex items-center mt-2 text-yellow-500 gap-1">
          ⭐ {product.rating}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Condition: <span className="font-semibold">{product.condition}</span>
        </p>
        <p className="text-sm text-gray-600">
          Stock: <span className="font-semibold">{product.stock}</span>
        </p>

        <div className="flex mt-4 gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-blue-600 text-center text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link>
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProductCard;