import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  // If coming from SendOtp page, email can be passed via state
  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/verify-otp",
        { email, otp }
      );

      setMsg(res.data.message);

      // If OTP verified, navigate to Reset Password page
      if (res.data.message.toLowerCase().includes("verified")) {
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Verify OTP
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none tracking-widest text-center text-lg font-semibold"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            Verify OTP
          </button>

          {msg && (
            <p
              className={`text-center font-medium ${
                msg.toLowerCase().includes("verified")
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
