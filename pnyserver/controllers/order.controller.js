import Order from "../models/order.schema.js";
import Product from "../models/product.schema.js";
import Auth from "../models/auth.schema.js";

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.product");
    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { items, userInfo } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Build order items and compute total server-side
    const orderItems = [];
    let total = 0;

    for (const it of items) {
      const productId = it.product || it._id || it.id;
      const qty = it.qty || it.quantity || 1;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      if (product.stock < qty) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      // prepare item snapshot
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        qty,
      });

      // decrement stock
      product.stock = product.stock - qty;
      await product.save();

      total += product.price * qty;
    }

    const order = await new Order({ 
      user: req.user._id, 
      items: orderItems, 
      total,
      shippingAddress: userInfo || {}
    }).save();
    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).populate(
      "items.product"
    );
    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user").populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
