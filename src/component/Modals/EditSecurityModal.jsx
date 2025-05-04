import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { EditGuard_Details } from '../services/Api/api';
import CloseButton from '../layout/CloseButton'
import LodindButton from '../layout/Loding_Button'

const EditSecurityModal = ({ _id, CloseEdit,Fdata }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [AadharCard, setAadharCard] = useState(null);
  const [AadharCardsize, setAadharCardsize] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (_id) {
      fetchSecurityData();
    }
  }, [_id]);

  const fetchSecurityData = async () => {
    try {
      const res = await axios.get(`https://society-management-app-server.onrender.com/security/security/${_id}`);
      const data = res.data;

      if (data) {
        setValue('photo', data.photo || '');
        setValue('Full_Name', data.Full_Name || '');
        setValue('Email', data.Email || '');
        setValue('phone_Number', data.phone_Number || '');
        setValue('Gender', data.Gender || '');
        setValue('Shift', data.Shift || '');
        const formattedDate = data.Shift_Data && !isNaN(new Date(data.Shift_Data).getTime())
          ? new Date(data.Shift_Data).toISOString().split('T')[0]
          : '';
        setValue('Shift_Data', formattedDate);

        setValue('Shift_Time', data.Shift_Time || '');
        setValue('Aadhar_Card', data.Aadhar_Card || '');
        if (data.photo) setPhotoPreview(data.photo);
        if (data.Aadhar_Card) setAadharCard(data.Aadhar_Card);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (photoPreview) formData.append('photo', photoPreview);
    if (AadharCard) formData.append('Aadhar_Card', AadharCard);
    EditGuard_Details(_id, formData, CloseEdit,Fdata,setloading);
  };


  const handleFileChange = (e, setFileState, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFileState(file);
      setValue(fieldName, file);
      console.log(`Selected file for ${fieldName}:`, file);
      if (fieldName === 'photo') {
        setPhotoPreview(file);
      } else if (fieldName === 'AadharCard') {
        setAadharCard(file);
        const fileSizeInBytes = file.size;
        const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
        setAadharCardsize(`${fileSizeInMB} MB`);
      }
    }
  };

  const handleRemoveFile = () => {
    setAadharCard(null);
    setValue('AadharCard', null);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
      onKeyDown={(e) => e.key === 'Escape' && CloseEdit()}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 overflow-auto max-h-svh"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Security</h2>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, setPhotoPreview, 'photo')}
            />
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img
                  src={typeof photoPreview === 'string' ? photoPreview : URL.createObjectURL(photoPreview)}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500">Add Photo</span>
              )}
            </div>
          </div>
          <span className="text-blue-500">Edit Photo</span>
        </div>
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('Full_Name', { required: 'Full name is required' })}
          />
          {errors.Full_Name && <p className="text-red-500 text-sm">{errors.Full_Name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('Email', { required: 'Full name is required' })}
          />
          {errors.Email && <p className="text-red-500 text-sm">{errors.Email.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            placeholder="+91"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('phone_Number', {
              required: 'Phone number is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number format' },
            })}
          />
          {errors.phone_Number && <p className="text-red-500 text-sm">{errors.phone_Number.message}</p>}
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Gender</label>
            <select
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('Gender', { required: 'Gender is required' })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.Gender && <p className="text-red-500 text-sm">{errors.Gender.message}</p>}
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700">Shift</label>
            <select
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('Shift', { required: 'Shift is required' })}
            >
              <option value="">Select Shift</option>
              <option value="Day">Day</option>
              <option value="Night">Night</option>
            </select>
            {errors.Shift && <p className="text-red-500 text-sm">{errors.Shift.message}</p>}
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Shift Date</label>
            <input
              type="date"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('Shift_Data', { required: 'Shift date is required' })}
            />
            {errors.Shift_Data && <p className="text-red-500 text-sm">{errors.Shift_Data.message}</p>}
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700">Shift Time</label>
            <input
              type="time"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('Shift_Time', { required: 'Shift time is required' })}
            />
            {errors.Shift_Time && <p className="text-red-500 text-sm">{errors.Shift_Time.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Upload Aadhar Card</label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            {!AadharCard ? (
              <label className="cursor-pointer">
                <p className="text-blue-500 underline">Upload a file</p>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setAadharCard, 'AadharCard')}
                />
              </label>
            ) : (

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={typeof AadharCard === 'string' ? AadharCard : URL.createObjectURL(AadharCard)}
                    alt="Aadhar Preview"
                    className="w-12 h-12 mb-2"
                  />
                  <div>
                    <p className="text-gray-600 text-sm text-left">{AadharCard.name}</p>
                    <p className="text-gray-600 text-sm">{AadharCardsize}</p>
                  </div>
                </div>
                <button onClick={handleRemoveFile} className="text-red-500 text-sm">Delete</button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <CloseButton CloseName="Cancel" type="button" onClick={CloseEdit} Addclass="w-1/2"/>
          <LodindButton loading={loading} Addclass="w-1/2" type="submit" Btn_Name="Save"/>
        </div>
      </form>
    </div>
  );
};

export default EditSecurityModal;
