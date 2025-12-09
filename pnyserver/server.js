import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config/config.js";
import cors from "cors";
import path from "path";
import authRouter from "./routes/auth.route.js";

import productRouter from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import dbConfig from "./config/database.js";

const app = express();



// Middleware
app.use(cors())
app.use(express.json());


const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"))
  );
}

// Routes
app.use("/api/v1/users", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


dbConfig();
dotenv.config();

