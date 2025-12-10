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
    name: "Macbook Pro 2",
    description:
      "Experience cutting-edge performance and sleek design with the MacBook. Powered by Apple’s latest processors, it delivers lightning-fast speed for work, creativity, and entertainment. The Retina display provides stunning visuals with true-to-life colors, while the long-lasting battery ensures productivity on the go. Lightweight and ultra-portable, the MacBook combines style, power, and reliability in one premium device—perfect for students, professionals, and tech enthusiasts alike.\r\n\r\nKey Features:\r\n\r\nPowerful Apple M-series processor for smooth multitasking\r\n\r\nHigh-resolution Retina display with vibrant colors\r\n\r\nLong battery life for all-day use\r\n\r\nSlim and lightweight design for portability\r\n\r\nmacOS for a seamless and secure user experience",
    price: 280000,
    rating: 4.9,
    stock: 12,
    condition: "New",
    image: "1765170922495-macbookpros",
  },
  {
    name: "Nike Air Max",
    description:
      "Premium lifestyle sneakers featuring a breathable mesh upper and Nike’s largest Air unit for maximum cushioning. Designed for comfort, style, and everyday wear.",
    price: 18000,
    rating: 4.5,
    stock: 32,
    condition: "New",
    image: "1765287481051-shoes",
  },
  {
    name: "Anker Powerbank 20000mAh",
    description:
      "A high-capacity 20,000mAh portable power bank with fast-charging technology. Equipped with PowerIQ and VoltageBoost for quick charging and dual USB outputs to power two devices at once. Lightweight, durable, and perfect for travel.",
    price: 6500,
    rating: 4.3,
    stock: 20,
    condition: "New",
    image: "1765287416012-power",
  },
  {
    name: "AeroBeat MiniPods",
    description:
      "AeroBeat MiniPods are ultra-compact true-wireless earbuds featuring a smooth matte finish and a sleek oval charging case. Designed for comfort, stable fit, and crisp audio, these earbuds deliver enhanced bass, clear vocals, and reliable connectivity. The LED indicators on the case show real-time battery status, making them perfect for everyday music, calls, and workouts.\r\nThe vibrant dual-tone lighting in the design adds a stylish and modern look",
    price: 32000,
    rating: 4.7,
    stock: 15,
    condition: "New",
    image: "1765177265607-AeroBeat MiniPods",
  },
  {
    name: "BassBlaze Pro Headphones",
    description:
      "BassBlaze Pro Headphones deliver immersive, high-definition audio with deep bass and crystal-clear treble. Their plush, cushioned earcups and adjustable dual-band head support ensure long-lasting comfort. The stylish metallic-magenta finish paired with a modern circular design gives these headphones a premium and trendy look. Ideal for music lovers, gamers, and everyday use",
    price: 89000,
    rating: 4.8,
    stock: 10,
    condition: "New",
    image: "1765177353572-BassBlaze Pro Headphones",
  },
  {
    name: "AeroWatch S9 Smartwatch",
    description:
      "AeroWatch S9 is a sleek, lightweight smartwatch featuring a vibrant full-touch HD display, heart-rate monitoring, sleep tracking, sport modes, and instant notifications. With a long-lasting battery and water-resistant build, it is perfect for fitness lovers and daily wear",
    price: 35000,
    rating: 4.4,
    stock: 18,
    condition: "New",
    image: "1765177581472-AeroWatch S9 Smartwatch",
  },
  {
    name: "TitanX Ultra Smartwatch",
    description:
      "TitanX Ultra is a premium smartwatch equipped with an AMOLED display, built-in GPS, wireless calling, health sensors, and over 100+ workout modes. Its metallic frame and stylish strap give a classy look, while the powerful battery ensures up to a week of usage on a single charge",
    price: 28000,
    rating: 4.6,
    stock: 25,
    condition: "New",
    image: "1765177645502-TitanX Ultra Smartwatch",
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
