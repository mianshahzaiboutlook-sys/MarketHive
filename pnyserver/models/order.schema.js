import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    total: Number,
    status: { type: String, default: "pending" },
    shippingAddress: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
