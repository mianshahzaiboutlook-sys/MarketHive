import Product from "../models/product.schema.js";

// Add Product (existing)
export const addProduct = async (req, res) => {
  try {
    const { name, description, rating, price, stock, condition } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({
      name,
      description,
      rating,
      price,
      stock,
      condition,
      image,
    });

    await product.save();

    res.status(201).json({ success: true, message: "Product added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single product (existing)
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all products (existing)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update product (NEW)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, rating, price, stock, condition } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.rating = rating || product.rating;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.condition = condition || product.condition;

    // Replace image only if a new file is uploaded
    if (req.file) {
      product.image = req.file.filename;
    }

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
