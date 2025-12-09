import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    rating: "",
    price: "",
    stock: "",
    condition: "New",
    image: null, // new image to replace existing one
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/products/${id}`
        );
        const product = res.data;
        setProductData({
          name: product.name || "",
          description: product.description || "",
          rating: product.rating || "",
          price: product.price || "",
          stock: product.stock || "",
          condition: product.condition || "New",
          image: null, // image will be replaced only if user uploads new
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load product data.");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("rating", productData.rating);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("condition", productData.condition);
      if (productData.image) {
        formData.append("image", productData.image); // only if new image uploaded
      }

     await axios.put(
       `http://localhost:8080/api/v1/products/update-product/${id}`,
       formData,
       { headers: { "Content-Type": "multipart/form-data" } }
     );


      alert("Product updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to update product. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-8 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            value={productData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            min="0"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={productData.stock}
            onChange={handleChange}
            min="0"
            required
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <select
            name="condition"
            value={productData.condition}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600 font-semibold"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
