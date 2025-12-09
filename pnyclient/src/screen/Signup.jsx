import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apis from "../config/apis.js";
import axios from "axios";
import { successToast, errorToast } from "../hepler/toastify.js";
import { useAuth } from "../context/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Redirect to home if already logged in
  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth?.user, navigate]);

  const signupHandler = async (e) => {
    e.preventDefault();

      const { data } = await axios.post(`${apis.auth}/pre-signup`, user);
      const {error, message} = data;
       if (error) {
         errorToast(error);
       }
       if (message) {
         successToast(message);
       }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={signupHandler}>
          <input
            name="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            name="email"
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4"
          />

          <input
            name="password"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4"
          />

          <button className="w-full bg-green-600 text-white py-3 rounded-lg">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
