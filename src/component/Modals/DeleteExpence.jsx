import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const DeleteExpence = ({ setRemove }) => {

  const handleCancel = () => {
    setRemove(false); 
  };

  // Handle delete action
  const handleDelete = () => {
    setRemove(false); 
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Delete</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={handleCancel}>
            <AiOutlineClose size={20} />
          </button>
        </div>
        <p className="mt-4 text-gray-600">Are you sure you want to delete this?</p>
        <div className="mt-6 flex justify-between space-x-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpence;
