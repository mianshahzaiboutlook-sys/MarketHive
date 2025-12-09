import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { useAuth } from "../context/auth";

const ProductsDashboard = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // FETCH PRODUCTS
  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProducts();
  }, [auth.user, navigate]);

  // SAFE SEARCH FILTER
  const filteredProducts = products.filter((prd) =>
    (prd.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PAGINATION
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <DashboardLayout>
      <div className="min-h-screen flex">
        <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Products
            </h1>
            <Link
              to="/dashboard/addproduct"
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
            >
              + Add New Product
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-gray-500 text-sm">Total Products</h2>
              <p className="text-3xl font-bold text-red-500">
                {products.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-gray-500 text-sm">Total Stock</h2>
              <p className="text-3xl font-bold text-red-500">
                {products.reduce((sum, p) => sum + (p.stock || 0), 0)}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-gray-500 text-sm">Avg Rating</h2>
              <p className="text-3xl font-bold text-red-500">
                {(
                  products.reduce((sum, p) => sum + (p.rating || 0), 0) /
                    products.length || 0
                ).toFixed(1)}
              </p>
            </div>
          </div>

          {/* Manage Products Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-700">Products List</h2>
                <Link
                  to="/dashboard/addproduct"
                  className="hidden"
                >
                  {/* kept for alignment if needed */}
                </Link>
              </div>

              {/* Search (full width below heading) */}
              <div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-left text-black border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Condition</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.map((prd, index) => (
                  <tr
                    key={prd._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3">{indexOfFirstProduct + index + 1}</td>
                    <td className="p-3">{prd.name}</td>
                    <td className="p-3">PKR {prd.price}</td>
                    <td className="p-3">{prd.stock}</td>
                    <td className="p-3">{prd.rating}</td>
                    <td className="p-3">{prd.condition}</td>

                    <td className="p-3 flex justify-center gap-2">
                      <Link
                        to={`/dashboard/edit-product/${prd._id}`}
                        className="bg-yellow-500 text-white px-6 py-1 rounded-lg hover:bg-red-600"
                      >
                        Edit
                      </Link>
                      <Link
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            try {
                              const res = await fetch(
                                `http://localhost:8080/api/v1/products/delete-product/${prd._id}`,
                                { method: "DELETE" }
                              );
                              const data = await res.json();
                              if (data.success) {
                                setProducts(
                                  products.filter((p) => p._id !== prd._id)
                                );
                                alert("Product deleted successfully!");
                              } else {
                                alert("Failed to delete product!");
                              }
                            } catch (err) {
                              console.error(err);
                              alert("Error deleting product. Try again.");
                            }
                          }
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default ProductsDashboard;
