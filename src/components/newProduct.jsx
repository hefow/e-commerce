import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function NewProduct({ onClose }) {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null, // File upload handling
    stock: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch categories and product details (if editing)
  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProductDetails(); // Fetch product details if editing
    } else {
      // Clear form data if creating a new product
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        image: null,
        stock: "",
      });
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories/getAll");
      if (response.data?.categories) {
        setCategories(response.data.categories);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories.");
    }
  };

  const fetchProductDetails = async () => {
    if (!id) return; // Don't attempt to fetch product details if there's no ID

    try {
      const response = await axios.get(`http://localhost:3000/api/products/${id}`);
      console.log("API Response:", response.data); // Debugging log
      const product = response.data.product;
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category?._id || "", // Fallback to empty string if category is undefined
        image: product.image, // Ensure this matches the backend response
        stock: product.stock,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle files separately
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const form = new FormData();

      // Append all fields except the image
      for (const key in formData) {
        if (key !== "image" && formData[key] !== null && formData[key] !== undefined) {
          form.append(key, formData[key]); // Append non-empty fields
        }
      }

      // Handle the image field separately
      if (formData.image instanceof File) {
        form.append("image", formData.image); // Append the new image file
      } else if (formData.image === null || formData.image === "") {
        form.append("image", ""); // Send an empty value if no image is provided
      } else {
        // If the image is a URL (existing image), do not append it to the form
        console.log("Using existing image URL:", formData.image);
      }

      console.log("Form Data to be Sent:", formData); // Debugging log

      const url = id
        ? `http://localhost:3000/api/products/${id}` // Update product if ID exists
        : "http://localhost:3000/api/products/"; // Create product if no ID

      const method = id ? "put" : "post";

      const response = await axios[method](url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Backend Response:", response.data); // Debugging log

      if (response.status === 200 || response.status === 201) {
        setSuccess(id ? "Product updated successfully!" : "Product created successfully!");
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          image: null,
          stock: "",
        });
        if (onClose) {
          onClose(); // Close the modal if it's used as a modal
        } else {
          navigate("/products"); // Redirect to the product list page
        }
      } else {
        setError("Failed to save product.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message); // Backend error message
      } else {
        setError("An error occurred while saving the product.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times; {/* Close icon */}
        </button>
      )}

      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Product" : "Create New Product"}
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      {/* Ensure form fields are populated with data only when editing */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default NewProduct;