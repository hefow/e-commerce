import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  // State for form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the category data to be sent
    const categoryData = {
      name,
      description,
    };

    try {
      // Send POST request to create a new category
      const response = await axios.post("http://localhost:3000/api/categories/create", categoryData);  // Replace with your backend API URL

      // If successful, display success message
      setSuccess(response.data.message);
      setError("");
      setName("");  // Reset form fields
      setDescription("");
    } catch (error) {
      // If error, display error message
      setError(error.response?.data?.error || "Something went wrong");
      setSuccess("");
    }
  };

  return (
   //  <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
   //    <h2>Add Category</h2>
      
   //    {/* Success or Error message */}
   //    {success && <div style={{ color: "green" }}>{success}</div>}
   //    {error && <div style={{ color: "red" }}>{error}</div>}

   //    {/* Category form */}
   //    <form onSubmit={handleSubmit}>
   //      <div>
   //        <label htmlFor="name">Category Name</label>
   //        <input
   //          type="text"
   //          id="name"
   //          value={name}
   //          onChange={(e) => setName(e.target.value)}
   //          required
   //        />
   //      </div>

   //      <div>
   //        <label htmlFor="description">Description</label>
   //        <textarea
   //          id="description"
   //          value={description}
   //          onChange={(e) => setDescription(e.target.value)}
   //          required
   //        ></textarea>
   //      </div>

   //      <button type="submit">Add Category</button>
   //    </form>
   //  </div>
   <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
   <h2 className="text-2xl font-semibold text-center mb-6">Add Category</h2>

   {/* Success or Error message */}
   {success && <div className="text-green-600 mb-4">{success}</div>}
   {error && <div className="text-red-600 mb-4">{error}</div>}

   {/* Category form */}
   <form onSubmit={handleSubmit} className="space-y-4">
     <div>
       <label htmlFor="name" className="block text-sm font-medium text-gray-700">
         Category Name
       </label>
       <input
         type="text"
         id="name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         required
         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
       />
     </div>

     <div>
       <label htmlFor="description" className="block text-sm font-medium text-gray-700">
         Description
       </label>
       <textarea
         id="description"
         value={description}
         onChange={(e) => setDescription(e.target.value)}
         required
         rows="4"
         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
       ></textarea>
     </div>

     <button
       type="submit"
       className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
     >
       Add Category
     </button>
   </form>
 </div>
  );
};

export default AddCategory;
