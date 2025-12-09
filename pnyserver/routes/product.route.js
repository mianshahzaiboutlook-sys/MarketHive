import express from "express";
import multer from "multer";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/add-product", upload.single("image"), addProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

//  Update route
router.put("/update-product/:id", upload.single("image"), updateProduct);
//delete route
router.delete("/delete-product/:id", deleteProduct);

export default router;
