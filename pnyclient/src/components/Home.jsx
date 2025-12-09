// import React from "react";
// import {products} from "../hepler/productdata.js";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//       {products.map((item) => (
//         <ProductCard key={item.id} product={item} />
//       ))}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const featuredImages = products
    .slice(0, 5)
    .map((p) => {
      // product.image is stored as an uploaded filename on the server
      if (!p) return null;
      // handle different shapes: uploaded filename in `image`, or array `images`, or full URL
      if (p.image) return `http://localhost:8080/uploads/${p.image}`;
      if (p.images && Array.isArray(p.images) && p.images.length > 0) return p.images[0];
      if (p.thumbnail) return p.thumbnail;
      return null;
    })
    .filter(Boolean); // remove null/undefined

  // Search filter
  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 scroll-smooth">
      {/* Hero / Search Section (carousel as background) */}
      <header className="relative h-64 md:h-80 lg:h-96 shadow-md overflow-hidden">
        {/* Carousel as background */}
        <div className="absolute inset-0 z-0">
          <Carousel items={featuredImages} />
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 container mx-auto text-center mt-8 px-6 py-10">
          <h1 className="text-4xl font-bold mb-4 text-white">MarketHive</h1>
          <p className="text-white mb-6 max-w-xl mx-auto">
            Browse our products and shop the best items at great prices.
          </p>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue focus:ring-offset-2"
          />
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto py-12 px-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;






