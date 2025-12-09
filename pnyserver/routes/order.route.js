import express from "express";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const orderRoutes = express.Router();
orderRoutes.post("/create", verifyToken, createOrder);
orderRoutes.get("/user/:id", verifyToken, getUserOrders);
orderRoutes.get("/all", verifyToken, getAllOrders); 
orderRoutes.put("/:id", verifyToken, updateOrderStatus); 

export default orderRoutes;
