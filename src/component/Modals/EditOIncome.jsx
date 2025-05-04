import React, { useState, useEffect } from 'react';
import { UpdateOtherIncome } from '../services/Api/api';

const EditOIncome = ({ setEditIncome, initialData, onUpdate }) => {
  const [formData, setFormData] = useState({
    Title: '',
    Amount: '',
    Date: '',
    Due_Date: '',
    Description: '',
  });
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        Title: initialData.Title || "",
        Amount: initialData.Amount || "",
        Date: formatDate(initialData.Date),
        Due_Date: formatDate(initialData.Due_Date),
        Description: initialData.Description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setEditIncome(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedFields = {};
      for (const key in formData) {
        if (formData[key] !== initialData[key]) {
          updatedFields[key] = formData[key];
        }
      }

      const response = await UpdateOtherIncome(initialData._id, updatedFields);

      // alert("Income updated successfully!");
      onUpdate(); // Trigger parent component's data refresh
      setEditIncome(false); // Close the modal
    } catch (error) {
      console.error("Error updating income:", error);
      alert("An error occurred while updating income.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit {formData.Title} </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Amount"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter Amount"
              required
            />
          </div>

          {/* Other Fields */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="date">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="Date"
                name="Date"
                value={formData.Date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dueDate">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="Due_Date"
                name="Due_Date"
                value={formData.Due_Date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter Description"
              required
            ></textarea>
          </div>

          <div className="flex justify-evenly mt-6">
            <button
              type="button"
              className="px-8 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-8 py-2 text-white rounded-md 
                ${loading ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-orange-600 hover:to-yellow-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-orange-600 hover:to-yellow-600'}`}
              disabled={loading}
            >
              {loading ? 'Edit...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOIncome;
