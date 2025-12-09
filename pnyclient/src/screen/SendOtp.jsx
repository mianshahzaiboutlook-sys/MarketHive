import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SendOtp() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/forget-password",
        { email }
      );

      setMsg(res.data.message);

      // Redirect to VerifyOtp page if OTP sent successfully
      if (res.data.message.toLowerCase().includes("sent")) {
        navigate("/verify-otp", { state: { email } });
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Forgot Password
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSend}
            className="w-full bg-blue-600 hover:bg-blue-700 
            text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            Send OTP
          </button>

          {msg && (
            <p
              className={`text-center font-medium ${
                msg.toLowerCase().includes("sent")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
