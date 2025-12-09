import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { useAuth } from "../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  return (
    <DashboardLayout>
      <div className="min-h-screen flex">
        <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
          </div>

          {/* Orders Section (Admin) */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <AdminOrders token={auth?.token} />
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

// AdminOrders component
function AdminOrders({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8080/api/v1/orders/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(orders.map((o) => (o._id === orderId ? updatedOrder : o)));
        alert("Order status updated successfully!");
      } else {
        alert("Failed to update order status");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating order status");
    }
  };

  // Search filter
  const filteredOrders = orders.filter((order) =>
    (order._id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.user?.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.user?.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.shippingAddress?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  if (loading) return <div>Loading orders...</div>;
  if (!orders.length) return <div>No orders found.</div>;

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by order ID, customer name, email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse rounded-xl overflow-hidden shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Shipping Address</th>
              <th className="p-2">Date</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Items</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-sm">{order._id}</td>
                <td className="p-2">{order.user?.username || order.user?.email || "N/A"}</td>
                <td className="p-2 text-sm">
                  <div>{order.shippingAddress?.name}</div>
                  <div className="text-gray-600">{order.shippingAddress?.email}</div>
                  <div className="text-gray-600">{order.shippingAddress?.phone}</div>
                  <div className="text-gray-600">{order.shippingAddress?.address}</div>
                </td>
                <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-2">PKR {order.total}</td>
                <td className="p-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="p-2">
                  {order.items.map((item) => (
                    <div key={item.product} className="text-sm mb-1">
                      {item.name} x {item.qty}
                    </div>
                  ))}
                </td>
                <td className="p-2 text-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
