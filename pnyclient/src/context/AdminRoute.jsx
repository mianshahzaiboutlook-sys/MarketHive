import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth"
import { errorToast } from "../hepler/toastify";

const AdminRoute = ({ children }) => {
  const [auth] = useAuth();

  // No user logged in
  if (!auth?.user) {
    errorToast("Please login first");
    return <Navigate to="/login" />;
  }

  // User logged in but not admin
  if (!auth.user.isAdmin) {
    errorToast("Access Denied! Admins only");
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
