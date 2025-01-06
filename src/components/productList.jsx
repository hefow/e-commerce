import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import NewProduct from './NewProduct'; // Import the NewProduct component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterProducts(searchTerm);
    }, 500); // Debounce search input for 500ms

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount or search term change
  }, [searchTerm, products]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/products/getAll');
      console.log("API Response:", response.data);

      // Extract the products array from the response
      const fetchedProducts = response.data.products || []; // Fallback to an empty array
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      console.log("Products loaded successfully.");
      console.log("Fetched Products:", fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.response ? error.response.data : "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (term) => {
    if (!term) {
      setFilteredProducts(products); // Show all products if no search term
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        (product.category && product.category.name.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    loadProducts(); // Refresh the product list after adding a new product
  };

  // Function to delete a product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        loadProducts(); // Refresh the product list after deletion
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Failed to delete product.");
      }
    }
  };

  // Function to handle edit (redirect to NewProduct page with product ID)
  const handleEdit = (id) => {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }
    navigate(`/products/${id}`); // Redirect to the edit page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="p-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Product List</h2>
          <div className="mb-4 flex items-center">
            <button
              onClick={openModal} // Open the modal when clicked
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300"
            >
              Add Product
            </button>
            <div className="flex items-center ml-4">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by name or category"
                className="border border-gray-300 rounded-md py-2 px-4 w-64"
              />
            </div>
          </div>

          {loading && (
            <div className="text-center text-gray-500">Loading products...</div>
          )}

          {error && !loading && (
            <div className="text-red-500 mt-4">{error}</div>
          )}

          <div className="overflow-x-auto max-h-[calc(100vh-100px)] overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Name</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Price</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Category</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Image</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Stock</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="text-sm font-normal border-t">
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">{product.name}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">${product.price}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">
                        {product.category ? product.category.name : 'Uncategorized'}
                      </td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">
                        <img
                          src={product.image || 'http://localhost:3000/uploads/default.jpg'}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = 'http://localhost:3000/uploads/default.jpg'; // Fallback image
                          }}
                        />
                      </td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">{product.stock}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">
                        <button
                          onClick={() => handleEdit(product._id)} // Redirect to edit page
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md text-xs sm:text-sm transition duration-300 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)} // Delete product
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md text-xs sm:text-sm transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for New Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times; {/* Close button */}
            </button>
            <NewProduct onClose={closeModal} /> {/* Pass the closeModal function as a prop */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;