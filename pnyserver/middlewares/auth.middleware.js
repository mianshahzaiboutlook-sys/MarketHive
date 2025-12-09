import jwt from "jsonwebtoken";
import Auth from "../models/auth.schema.js";
import { JWT_SECRET } from "../config/config.js";

// Verify JWT
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await Auth.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Check admin
export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Access denied. Admin only." });
  }
  next();
};
