import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const fetchedProducts = response.data.products || [];
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
        product.id.toString().includes(term) ||
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="p-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Product List</h2>
          <div className="mb-4 flex items-center">
            <Link
              to="/admin-dashboard/products/new"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300"
            >
              Add Product
            </Link>
            <div className="flex items-center ml-4">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by ID, name, or category"
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
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">ID</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Name</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Price</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Category</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Stock</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="text-sm font-normal border-t">
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">{product.id}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">{product.name}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">${product.price}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">{product.category.name}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">{product.stock}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">
                        <Link
                          to={`/admin-dashboard/products/${product.id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md text-xs sm:text-sm transition duration-300"
                        >
                          Edit
                        </Link>
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
    </div>
  );
};

export default ProductList;
