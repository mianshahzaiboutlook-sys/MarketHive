import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Orders = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
      return;
    }

    const fetchUserOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/orders/user/${auth.user._id}`,
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
          }
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [auth.user, auth?.token, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Search filter
  const filteredOrders = orders.filter((order) =>
    (order._id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.shippingAddress?.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (order.shippingAddress?.address || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Order ID, delivery address..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Orders Table */}
        {orders.length > 0 ? (
          <>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Delivery Address</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr key={order._id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm font-semibold text-blue-600">
                          {order._id}
                        </td>
                        <td className="p-3 text-sm">
                          <div className="font-medium">
                            {order.shippingAddress?.name || "N/A"}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {order.shippingAddress?.address || "N/A"}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {order.shippingAddress?.phone || "N/A"}
                          </div>
                        </td>
                        <td className="p-3 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 font-semibold">
                          PKR {order.total}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-gray-700 mb-1">
                                {item.name} <span className="text-gray-500">x{item.qty}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4 text-5xl">📦</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-600">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
