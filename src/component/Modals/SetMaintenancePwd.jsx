import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AddMaintenanceDetail from './AddMaintenanceDetail';

const SetMaintenancePwd = ({ setShowMaintenance,Fdata }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [showAddDetail, setShowAddDetail] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsIncorrect(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setShowMaintenance(false);
  };

  const handleContinue = () => {
    if (password.trim() === '1111') {
      setIsIncorrect(false);
      setShowAddDetail(true);
    } else {
      setIsIncorrect(true);
      setShowAddDetail(false);
    }
  };

  const closeAddDetail = () => {
    setShowAddDetail(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="w-96 p-6 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Set Maintenance</h2>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="****"
            onChange={handlePasswordChange}
            className={`w-full border rounded-md p-2 pr-10 text-gray-700 focus:outline-none ${
              isIncorrect ? 'border-red-500' : 'focus:border-blue-500'
            }`}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <FaEyeSlash className="mt-5" /> : <FaEye className="mt-5" />}
          </button>
          {isIncorrect && <p className="text-red-500 text-sm mt-1">Incorrect Password.</p>}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-md hover:from-orange-600 hover:to-yellow-600"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Render the AddMaintenanceDetail modal conditionally */}
      {showAddDetail && (
        <AddMaintenanceDetail setShowAddDetail={closeAddDetail} Fdata={Fdata} />
      )}
    </div>
  );
};

export default SetMaintenancePwd;
