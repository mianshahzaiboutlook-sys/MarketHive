import express from "express";
import {
  presignup,
  signup,
  login,
  forgetPassword,
  resetPassword,
  verifyOtp,
  getAllUsers,
  updateUser,
} from "../controllers/authcontroller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/pre-signup", presignup);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword); // remove :token



// NEW: Admin only
authRouter.get("/users", verifyToken, isAdmin, getAllUsers);

// Update profile (authenticated users)
authRouter.put("/update", verifyToken, updateUser);

export default authRouter;
