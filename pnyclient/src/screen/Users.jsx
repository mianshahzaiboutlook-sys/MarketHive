import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";

export default function Users() {
  const [auth] = useAuth(); // ✅ Correct destructuring
  const token = auth?.token;
  const currentUser = auth?.user;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token || token.trim() === "") {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/v1/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data?.success) {
          setUsers(data.users);
        } else {
          console.error("Users fetch failed:", data?.message);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-gray-500 text-xl animate-pulse">
          Loading users...
        </h1>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-red-500 text-xl font-semibold">
          Unauthorized — Please login to view users.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          All Registered Users
        </h1>

        <p className="text-gray-600 mb-6">
          Total Users:{" "}
          <span className="font-semibold text-gray-900">{users.length}</span>
        </p>

        {/* USERS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Created At</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border font-medium">{u.username}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 border capitalize">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm ${
                        u.isAdmin
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {u.isAdmin ? "Admin" : "Custmer"}
                    </span>
                  </td>
                  <td className="p-3 border">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    className="p-3 border text-center text-gray-500"
                    colSpan="5"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Logged-in user info */}
        <div className="mt-6 text-gray-500 text-sm">
          Viewing as:{" "}
          <span className="font-semibold">{currentUser?.email}</span>
        </div>
      </div>
    </div>
  );
}
