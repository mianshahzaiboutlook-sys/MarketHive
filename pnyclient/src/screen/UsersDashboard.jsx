import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { useAuth } from "../context/auth";

const UsersDashboard = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [loading, setLoading] = useState(true);

  // FETCH USERS
  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/auth/users", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        const data = await res.json();
        if (data.success) {
          setUsers(data.users || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [auth.user, auth?.token, navigate]);

  // SAFE SEARCH FILTER
  const filteredUsers = users.filter(
    (user) =>
      (user.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.isAdmin ? "admin" : "customer").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PAGINATION
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-xl text-gray-600">Loading users...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen flex">
        <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Users
            </h1>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-gray-500 text-sm">Total Users</h2>
              <p className="text-3xl font-bold text-blue-500">
                {users.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-gray-500 text-sm">Active Users</h2>
              <p className="text-3xl font-bold text-green-500">
                {users.filter((u) => u.isActive !== false).length}
              </p>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-700">Users List</h2>
                <div className="hidden">{/* placeholder for alignment */}</div>
              </div>

              {/* Search (full width below heading) */}
              <div>
                <input
                  type="text"
                  placeholder="Search users by name, email or role..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Table */}
            {users.length > 0 ? (
              <>
                <table className="w-full text-left text-black border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="p-3">#</th>
                      <th className="p-3">Username</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Address</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Join Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3">{indexOfFirstUser + index + 1}</td>
                        <td className="p-3">{user.username || "N/A"}</td>
                        <td className="p-3">{user.email || "N/A"}</td>
                        <td className="p-3">{user.phone || "N/A"}</td>
                        <td className="p-3">{user.address || "N/A"}</td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              user.isAdmin
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.isAdmin ? "Admin" : "Customer"}
                          </span>
                        </td>
                        <td className="p-3">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              user.isActive !== false
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.isActive !== false ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
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
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-600">
                <p className="text-lg">No users found.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default UsersDashboard;
