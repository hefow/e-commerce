import React, { useState, useEffect } from "react";
import axios from "axios";

function NewProduct() {
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categories/getAll"
      );
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
      for (const key in formData) {
        if (formData[key]) {
          form.append(key, formData[key]); // Append non-empty fields
        }
      }

      const response = await axios.post(
        "http://localhost:3000/api/products/",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        setSuccess("Product created successfully!");
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          image: null,
          stock: "",
        });
      } else {
        setError("Failed to create product.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message); // Backend error message
      } else {
        setError("An error occurred while creating the product.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
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
          Create Product
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
