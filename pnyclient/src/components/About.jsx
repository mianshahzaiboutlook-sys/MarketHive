import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.jsx"; // your auth context (use your actual path)
import { useCart } from "../context/CartContext.jsx"; // optional: show cart count if you have it

export default function About() {
  const { user } = useAuth() || {}; // shows logged-in user if available
  const { cart } = useCart() || { cart: [] };

  return (
    <div className="min-h-screen bg-white p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              About MarketHive
            </h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">MarketHive</span> is a full-stack
              e-commerce MERN application (MongoDB, Express, React + Vite, Node)
              built with production-ready features: user signup & login,
              password reset, JWT-based authentication, protected routes, and a
              simple admin dashboard for managing products.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              The app uses <span className="font-medium">useContext</span> for
              global state (auth and cart), Tailwind CSS for styling, and a
              RESTful API on the backend. It was created as a MERN stack project
              and follows common best practices for auth, file uploads, and
              client-server separation.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="p-5 bg-gray-50 rounded-lg border">
            <h2 className="text-xl font-semibold mb-3">Core Features</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>
                User authentication (Signup / Login) with JWT & refresh tokens
              </li>
              <li>Password reset flow (email + reset token)</li>
              <li>Protected routes for user and admin areas</li>
              <li>Product listing, product details, image uploads</li>
              <li>Cart management (add/remove/update) — stored in context</li>
              <li>
                Checkout hooks to integrate payments (stubbed/placeholders)
              </li>
              <li>Admin CRUD for products (create / update / delete)</li>
            </ul>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg border">
            <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>React (Vite) + Tailwind CSS</li>
              <li>Node.js + Express (REST API)</li>
              <li>MongoDB / Mongoose (data layer)</li>
              <li>
                JWT authentication & secure HTTP-only cookies (recommended)
              </li>
              <li>Context API (useContext) for global state (auth, cart)</li>
              <li>
                File uploads for product images (backend/Express + multer)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-5 bg-white rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-3">Auth & Security Notes</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Authentication is handled via JWTs issued by the backend on login.
            Protect sensitive routes server-side and validate tokens on every
            request. For production, use HTTPS, store refresh tokens securely
            (httpOnly cookies), and enforce password strength and rate limiting.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Password reset is implemented using a one-time token sent to the
            user's email. The token is verified on the server before allowing a
            password update.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Create an account
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          >
            Login
          </Link>

          <Link
            to="/forget-password"
            className="inline-flex items-center justify-center px-6 py-3 border border-dashed border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Forgot Password
          </Link>
        </div>

        <footer className="mt-10 text-sm text-gray-500">
          <p>
            MarketHive — MERN e-commerce project. Developed by{" "}
            <span className="font-medium">Mian Shahzaib</span> as part of MERN
            training. Built with React + Vite, Tailwind, Node/Express and
            MongoDB.
          </p>
        </footer>
      </div>
    </div>
  );
}
