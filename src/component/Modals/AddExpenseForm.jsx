import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { PostExpanse } from '../services/Api/api';
import Loding_Button from '../layout/Loding_Button';
import Close_Button from '../layout/CloseButton';

const AddExpenseForm = ({ setAddExpense, Fdata }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue('Bill', [file]);
      const fileURL = URL.createObjectURL(file);
      setPreviewImage(fileURL);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };



  const onSubmit = (data) => {
    setLoading(true)
    PostExpanse(data, Fdata, setAddExpense, setPreviewImage, reset, setLoading, handleCancel);
  };

  const handleCancel = () => {
    setAddExpense(false);
    setPreviewImage(null);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mx-auto relative z-60 overflow-auto max-h-svh">
        <h2 className="text-xl font-semibold mb-4">Add Expenses Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full border rounded p-2 text-gray-700"
              placeholder="Enter Title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="w-full border rounded p-2 text-gray-700"
              placeholder="Enter Description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  className="w-full border rounded p-2 text-gray-700"
                />
                <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
              </div>
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('amount', { required: 'Amount is required' })}
                className="w-full border rounded p-2 text-gray-700"
                placeholder="₹ 0000"
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Bill <span className="text-red-500">*</span>
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 focus-within:border-blue-500 cursor-pointer"
              onClick={handleFileClick}
            >
              <input
                type="file"
                {...register('Bill')}
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <div>
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-md mb-2" />
                ) : (
                  <div className="flex justify-center mb-2">
                    <BiImageAdd className="text-gray-400 text-4xl" />
                  </div>
                )}
                <p className="text-blue-500 font-semibold">Upload a file</p>
                <p className="text-gray-500">or drag and drop</p>
                <p className="text-gray-400 text-xs">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Close_Button type="button" Addclass='w-1/2' onClick={handleCancel} CloseName='Cancel' />
            <Loding_Button type="submit" loading={loading} Btn_Name='Save' Addclass='w-1/2' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
