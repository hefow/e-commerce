import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NewCategory = ({ onClose }) => {
  const { id } = useParams();  // Get categoryId from the URL
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch the category details for editing if id is present
      axios.get(`http://localhost:3000/api/categories/${id}`)
        .then(response => {
          setName(response.data.category.name);
          setDescription(response.data.category.description);
        })
        .catch(error => console.error('Error fetching category:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = { name, description };

    if (id) {
      // If `id` exists, update the existing category
      axios.put(`http://localhost:3000/api/categories/${id}`, categoryData)
        .then(() => {
          navigate('/category/all'); // Redirect to category list page
        })
        .catch(error => console.error('Error updating category:', error));
    } else {
      // If `id` doesn't exist, create a new category
      axios.post('http://localhost:3000/api/categories/create', categoryData)
        .then(() => {
          onClose(); // Close modal after submission
          navigate('/category/all'); // Redirect to category list page
        })
        .catch(error => console.error('Error creating category:', error));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">{id ? 'Edit Category' : 'Add Category'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {id ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
