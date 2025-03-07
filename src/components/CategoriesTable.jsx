import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import NewCategory from './NewCategory'; // Import the NewCategory component (for adding/updating categories)

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Hook for navigation

  // Fetch categories when the component mounts
  useEffect(() => {
    loadCategories();
  }, []);

  // Debounce search input for 500ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterCategories(searchTerm);
    }, 500); // Debounce search input for 500ms

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount or search term change
  }, [searchTerm, categories]);

  // Function to fetch categories from the backend
  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/categories/getAll');
      const fetchedCategories = response.data.categories || [];
      setCategories(fetchedCategories);
      setFilteredCategories(fetchedCategories);
    } catch (error) {
      setError(error.response ? error.response.data : "Server Error");
    } finally {
      setLoading(false);
    }
  };

  // Function to filter categories based on search term
  const filterCategories = (term) => {
    if (!term) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    loadCategories(); // Refresh the category list after adding/updating a category
  };

  // Redirect to edit page with category ID
  const handleEdit = (id) => {
    navigate(`/category/${id}`); // Redirect to the edit page
  };

  // Function to delete a category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3000/api/categories/${id}`);
        loadCategories(); // Refresh the category list after deletion
      } catch (error) {
        setError("Failed to delete category.");
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="p-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Category List</h2>
          <div className="mb-4 flex items-center">
            <button
              onClick={openModal} // Open the modal
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300"
            >
              Add Category
            </button>
            <div className="flex items-center ml-4">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by name"
                className="border border-gray-300 rounded-md py-2 px-4 w-64"
              />
            </div>
          </div>

          {loading && (
            <div className="text-center text-gray-500">Loading categories...</div>
          )}

          {error && !loading && (
            <div className="text-red-500 mt-4">{error}</div>
          )}

          <div className="overflow-x-auto max-h-[calc(100vh-100px)] overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Name</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Description</th>
                  <th className="py-2 px-4 border-b text-left text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category._id} className="text-sm font-normal border-t">
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">{category.name}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">{category.description}</td>
                      <td className="py-2 px-4 border-b text-xs sm:text-sm">
                        <button
                          onClick={() => handleEdit(category._id)} // Redirect to edit page
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-md text-xs sm:text-sm transition duration-300 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)} // Delete category
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md text-xs sm:text-sm transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">No categories found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for New Category */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times; {/* Close button */}
            </button>
            <NewCategory onClose={closeModal} /> {/* Pass the closeModal function as a prop */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
