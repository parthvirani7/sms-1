import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRupeeSign } from 'react-icons/fa';
import { PostIncome } from '../services/Api/api';

const AddMaintenanceDetail = ({ setShowAddDetail , Fdata }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleCancel = () => {
    setShowAddDetail(false);
  };


  function addData(data) {
    // console.log(data);
    PostIncome (data,Fdata,setShowAddDetail)
    reset();
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(addData)} method='post'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Maintenance Detail</h2>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Maintenance Amount</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaRupeeSign className="text-gray-500 mr-2" />
                <input
                  type="number"
                  placeholder="1,000"
                  className="w-full p-2 border-none focus:outline-none text-gray-700"
                  {...register("maintenanceAmount", { required: true })}
                />
              </div>
              {errors.maintenanceAmount && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Penalty Amount</label>
              <div className="flex items-center border rounded px-3 py-2">
                <FaRupeeSign className="text-gray-500 mr-2" />
                <input
                  type="number"
                  placeholder="250"
                  className="w-full p-2 border-none focus:outline-none text-gray-700"
                  {...register("penaltyAmount", { required: true })}
                />
              </div>
              {errors.penaltyAmount && <span className="text-red-500">This field is required</span>}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-semibold">Maintenance Due Date</label>
            <div className="flex items-center border rounded px-3 py-2">
              <input
                type="date"
                className="w-full p-2 border-none focus:outline-none text-gray-700"
                min={today} // Disable past dates
                {...register("maintenanceDueDate", { required: true })}
              />
            </div>
            {errors.dueDate && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-semibold">Penalty Applied After Day Selection</label>
            <select
              className="w-full p-2 border rounded focus:outline-none text-gray-700"
              {...register("penaltyAppliedAfterDaySelection", { required: true })}
            >
              <option value="" disabled>Select Penalty Applied After Day Selection</option>
              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
              <option value="4">4 Days</option>
              {/* Add more options as needed */}
            </select>
            {errors.penaltyDaySelection && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="flex justify-evenly">
            <button
              type="button"
              onClick={handleCancel}
              className="px-14 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none font-semibold transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-14 py-2 text-white rounded-md font-semibold bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-red-600 focus:outline-none transition duration-200"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaintenanceDetail;
