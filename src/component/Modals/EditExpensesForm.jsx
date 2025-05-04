import React, { useState, useEffect } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { FaRegFileAlt, FaTrash } from 'react-icons/fa';
import { GetExpanse } from '../services/Api/api';

const EditExpensesForm = ({ setEditData, }) => {
  const [title, setTitle] = useState('Rent or Mortgage');
  const [description, setDescription] = useState('The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in Resident.');
  const [date, setDate] = useState('2024-12-05');
  const [amount, setAmount] = useState(1500); // Store as number for easier manipulation
  const [file, setFile] = useState({ name: 'OldFile.jpg', size: '1.2' });
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = async () => {
    setError(null);
    try {
      const data = await GetExpanse();
      if (data && Array.isArray(data)) {
        setExpenses(data);
      } else {
        setError('Failed to load data or data is invalid.');
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 1024 * 1024 * 2) {
        alert('File size should be less than 2MB.');
        return;
      }
      setFile({
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2), // File size in KB
      });
    }
  };

  const handleFileClear = () => {
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted: 
    Title: ${title}, 
    Description: ${description}, 
    Date: ${date}, 
    Amount: ₹${amount}, 
    File: ${file ? file.name : 'No File'}`);
  };

  const handleCancel = () => {
    if (setEditData) {
      setEditData(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <div className="form-group mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Title<span className="text-red-800"> *</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none border-black focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-1">
            Description<span className="text-red-800"> *</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none border-black focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter description"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="form-group mb-4 flex-1">
            <label htmlFor="date" className="block text-gray-700 mb-1">
              Date<span className="text-red-800"> *</span>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none border-black focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="form-group mb-4 flex-1">
            <label htmlFor="amount" className="block text-gray-700 mb-1">
              Amount<span className="text-red-800"> *</span>
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter amount"
              required
            />
          </div>
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 mb-1">
            Upload Bill<span className="text-red-800"> *</span>
          </label>
          <div className="border border-black rounded-md p-2">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700"
              >
                <BiImageAdd />
              </label>
              {file && (
                <div className="text-sm flex items-center space-x-2">
                  <FaRegFileAlt className="text-gray-600" />
                  <span>
                    {file.name} ({file.size} KB)
                  </span>
                  <button
                    type="button"
                    onClick={handleFileClear}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
            {file && <p className="text-green-600 mt-1">File Uploaded Successfully</p>}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 font-semibold rounded text-gray-700 hover:text-gray-800 hover:border-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md font-semibold bg-gradient-to-r from-orange-400 to-red-500 hover:from-blue-500 hover:to-red-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpensesForm;
