import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import apis from "../config/apis";
import { successToast, errorToast } from "../hepler/toastify.js";

export default function EditProfile() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const user = auth?.user || {};

  const [form, setForm] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Try to update on server if endpoint exists
    try {
      const url = `${apis.auth}/update`; // best-effort endpoint
      const res = await axios.put(url, form, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      if (res.data && res.data.success) {
        // update local auth state
        const updatedUser = res.data.user || res.data.updatedUser || form;
        const newAuth = { ...auth, user: { ...auth.user, ...updatedUser } };
        setAuth(newAuth);
        localStorage.setItem("auth", JSON.stringify(newAuth));
        successToast("Profile updated successfully");
        navigate("/profile");
        return;
      }

      // If server responded but not success, show message
      if (res.data && res.data.error) {
        errorToast(res.data.error);
      } else {
        errorToast("Profile update endpoint not available on server.");
        // still update locally
        const newAuth = { ...auth, user: { ...auth.user, ...form } };
        setAuth(newAuth);
        localStorage.setItem("auth", JSON.stringify(newAuth));
        navigate("/profile");
      }
    } catch (err) {
      // 404 or other error: update locally and inform user
      if (err.response && err.response.status === 404) {
        errorToast("Server endpoint not found. Changes saved locally only.");
        const newAuth = { ...auth, user: { ...auth.user, ...form } };
        setAuth(newAuth);
        localStorage.setItem("auth", JSON.stringify(newAuth));
        navigate("/profile");
      } else {
        console.error(err);
        errorToast("An error occurred while updating profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="username"
              value={form.username}
              onChange={changeHandler}
              className="w-full mt-1 p-3 border rounded"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={changeHandler}
              className="w-full mt-1 p-3 border rounded"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={changeHandler}
              className="w-full mt-1 p-3 border rounded"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={changeHandler}
              className="w-full mt-1 p-3 border rounded"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
