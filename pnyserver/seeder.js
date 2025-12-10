import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Auth from "./models/auth.schema.js"; // updated
import Product from "./models/product.schema.js";
import { DB_CONNECTION_STRING } from "./config/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log("Database Connected for Seeding");
  } catch (err) {
    console.log("Database Connection Error", err);
    process.exit(1);
  }
};
// Demo users
const users = [
  {
    username: "Test User",
    email: "user@example.com",
    password: bcrypt.hashSync("User@123", 10),
    role: ["buyer"],
    isAdmin: false,
    isBlocked: false,
  },
  {
    username: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("Admin@123", 10),
    role: ["buyer"],
    isAdmin: true,
    isBlocked: false,
  },
];

// Dummy products
const products = [
  {
    name: "MacBook Pro 14",
    description: "Powerful M1 Pro chip, 16GB RAM, 512GB SSD.",
    price: 280000,
    rating: 4.9,
    stock: 12,
    condition: "New",
    image: "https://i.ibb.co/mac.jpg",
  },
  {
    name: "Nike Air Max",
    description: "Stylish and comfortable running shoes.",
    price: 18000,
    rating: 4.5,
    stock: 32,
    condition: "New",
    image: "https://i.ibb.co/nike.jpg",
  },
  {
    name: "Anker Powerbank 20000mAh",
    description: "Fast charging portable battery.",
    price: 6500,
    rating: 4.3,
    stock: 20,
    condition: "New",
    image: "https://i.ibb.co/powerbank.jpg",
  },
  {
    name: "Logitech MX Master 3S Mouse",
    description: "Ergonomic wireless mouse with silent clicks.",
    price: 32000,
    rating: 4.7,
    stock: 15,
    condition: "New",
    image: "https://i.ibb.co/logitech.jpg",
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Premium noise‑cancelling wireless headphones.",
    price: 89000,
    rating: 4.8,
    stock: 10,
    condition: "New",
    image: "https://i.ibb.co/sony-headphones.jpg",
  },
  {
    name: "HP 24-inch LED Monitor",
    description: "1080p IPS display with ultra‑thin bezels.",
    price: 35000,
    rating: 4.4,
    stock: 18,
    condition: "New",
    image: "https://i.ibb.co/hp-monitor.jpg",
  },
  {
    name: "JBL Charge 5 Bluetooth Speaker",
    description: "Portable waterproof speaker with deep bass.",
    price: 28000,
    rating: 4.6,
    stock: 25,
    condition: "New",
    image: "https://i.ibb.co/jbl.jpg",
  },
];

// Seeder
const seedDB = async () => {
  await connectDB();

  try {
    await Auth.deleteMany();
    await Product.deleteMany();

    console.log("🗑️ Old data removed");

    await Auth.insertMany(users);
    await Product.insertMany(products);

    console.log("✅ Dummy Users & Products Added Successfully");
    process.exit();
  } catch (err) {
    console.log("❌ Seeder Error", err);
    process.exit(1);
  }
};

seedDB();
