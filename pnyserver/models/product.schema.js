import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    condition: { type: String, enum: ["New", "Used"], required: true },
    image: { type: String }, // filename of the uploaded image
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
