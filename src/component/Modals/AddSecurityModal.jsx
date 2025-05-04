import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostGuard_Details } from '../services/Api/api';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import CloseButton from '../layout/CloseButton'
import LodingButton from '../layout/Loding_Button'

const AddSecurityModal = ({ CloseAddSecurity, Fdata }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [photoPreview, setPhotoPreview] = useState(null);
    const [Aadhar_Card, setAadharCard] = useState(null);
    const [Aadhar_Cardsize, setAadharCardsize] = useState([]);
    const [loading, setloading] = useState(false)

    const onSubmit = (data) => {
        PostGuard_Details(data, CloseAddSecurity, Fdata,setloading)
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoPreview(file);
            setValue('photo', file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAadharCard(file);
            setValue('Aadhar_Card', file);
            const fileSizeInBytes = file.size;
            const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
            setAadharCardsize(`${fileSizeInMB} MB`);
        }

    };

    const handleRemoveFile = () => {
        setAadharCard(null);
        setValue('Aadhar_Card', null);
    };

    return (
        // <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 '>
        //     <form onSubmit={handleSubmit(onSubmit)} method='post' className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 max-h-full overflow-auto">
        //         <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Add Security</h2>

        //         {/* Photo Upload Section */}
        //         <div className="flex items-center space-x-4">
        //             <div className="relative">
        //                 <input
        //                     type="file"
        //                     accept="image/*"
        //                     onChange={handlePhotoChange}
        //                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        //                 />
        //                 <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
        //                     {photoPreview ? (
        //                         <img src={URL.createObjectURL(photoPreview)} alt="Preview" className="object-cover w-full h-full" />
        //                     ) : (
        //                         <img src="../../../public/images/user.png" />
        //                     )}
        //                 </div>
        //             </div>
        //             <span className="text-blue-500">Add Photo</span>
        //         </div>

        //         {/* Full Name */}
        //         <div>
        //             <label className="block text-gray-700">Full Name</label>
        //             <input
        //                 type="text"
        //                 placeholder="Enter Full Name"
        //                 className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 {...register('Full_Name', { required: 'Full name is required' })}
        //             />
        //             {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        //         </div>

        //         {/* Email Name */}
        //         <div>
        //             <label className="block text-gray-700">Email</label>
        //             <input
        //                 type="email"
        //                 placeholder="Enter Email"
        //                 className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 {...register('email', { required: 'Full name is required' })}
        //             />
        //             {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        //         </div>

        //         {/* Phone Number */}
        //         <div>
        //             <label className="block text-gray-700">Phone Number</label>
        //             <input
        //                 type="tel"
        //                 placeholder="+91"
        //                 className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 {...register('phone_Number', {
        //                     required: 'Phone number is required',
        //                     pattern: {
        //                         value: /^[0-9]{10}$/,
        //                         message: 'Invalid phone number format',
        //                     },
        //                 })}
        //             />
        //             {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
        //         </div>

        //         {/* Gender & Shift */}
        //         <div className="flex space-x-4">
        //             <div className="w-1/2">
        //                 <label className="block text-gray-700">Gender</label>
        //                 <select
        //                     className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     {...register('Gender', { required: 'Gender is required' })}
        //                 >
        //                     <option value="">Select Gender</option>
        //                     <option value="Male">Male</option>
        //                     <option value="Female">Female</option>
        //                     <option value="Other">Other</option>
        //                 </select>
        //                 {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        //             </div>

        //             <div className="w-1/2">
        //                 <label className="block text-gray-700">Shift</label>
        //                 <select
        //                     className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     {...register('Shift', { required: 'Shift is required' })}
        //                 >
        //                     <option value="">Select Shift</option>
        //                     <option value="Day">Day</option>
        //                     <option value="Night">Night</option>
        //                 </select>
        //                 {errors.shift && <p className="text-red-500 text-sm">{errors.shift.message}</p>}
        //             </div>
        //         </div>

        //         {/* Shift Date & Time */}
        //         <div className="flex space-x-4">
        //             <div className="w-1/2">
        //                 <label className="block text-gray-700">Shift Date</label>
        //                 <input
        //                     type="date"
        //                     className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     {...register('Shift_Data', { required: 'Shift date is required' })}
        //                 />
        //                 {errors.shiftDate && <p className="text-red-500 text-sm">{errors.shiftDate.message}</p>}
        //             </div>

        //             <div className="w-1/2">
        //                 <label className="block text-gray-700">Shift Time</label>
        //                 <input
        //                     type="time"
        //                     className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     {...register('Shift_Time', { required: 'Shift time is required' })}
        //                 />
        //                 {errors.shiftTime && <p className="text-red-500 text-sm">{errors.shiftTime.message}</p>}
        //             </div>
        //         </div>

        //         {/* Aadhar Card Upload */}
        //         <div>
        //             <label className="block text-gray-700">Upload Aadhar Card</label>
        //             <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
        //                 {!Aadhar_Card ? (
        //                     <label className="cursor-pointer">
        //                         <div className='flex flex-col items-center'>
        //                             <MdOutlineAddPhotoAlternate className='text-2xl text-[#A7A7A7]' />
        //                             <p className="text-blue-500 font-semibold">Upload a file <span className='text-[#4F4F4F]'>or drag and drop</span></p>
        //                             <p className='text-[#A7A7A7] text-sm'>PNG, JPG, GIF up to 10MB</p>
        //                         </div>
        //                         <input
        //                             type="file"
        //                             accept=".png, .jpg, .jpeg,.pdf"
        //                             className="hidden"
        //                             onChange={handleFileChange}
        //                         />
        //                     </label>
        //                 ) : (
        //                     <div className="flex justify-between items-center">
        //                         <div className="flex items-center">
        //                             <img src={URL.createObjectURL(Aadhar_Card)} alt="Aadhar Preview" className="w-12 h-12 mr-3 " />
        //                             <div>
        //                                 <p className="text-gray-600 text-sm text-left">{Aadhar_Card.name}</p>
        //                                 <p className="text-gray-600 text-sm">{Aadhar_Cardsize}</p>
        //                             </div>
        //                         </div>
        //                         <button onClick={handleRemoveFile} className="text-red-500 text-sm">Delete</button>
        //                     </div>
        //                 )}
        //             </div>
        //         </div>

        //         {/* Buttons */}
        //         <div className="flex justify-between mt-4">
        //             <CloseButton CloseName="Cancel" Addclass="w-1/2" type="button" onClick={CloseAddSecurity} />
        //             <LodingButton loading={loading} Addclass="w-1/2" Btn_Name="Create" type="submit" />
        //         </div>
        //     </form>
        // </div>
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4'>
  <form 
    onSubmit={handleSubmit(onSubmit)} 
    method='post' 
    className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
  >
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Add Security</h2>

      {/* Photo Upload Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {photoPreview ? (
              <img src={URL.createObjectURL(photoPreview)} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <img src="../../../public/images/user.png" className="w-full h-full object-contain" />
            )}
          </div>
        </div>
        <span className="text-blue-500 cursor-pointer">Add Photo</span>
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Enter Full Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('Full_Name', { required: 'Full name is required' })}
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Phone Number</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-500">
            +91
          </span>
          <input
            type="tel"
            placeholder="9876543210"
            className="flex-1 px-4 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('phone_Number', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid phone number format',
              },
            })}
          />
        </div>
        {errors.phone_Number && <p className="text-red-500 text-sm mt-1">{errors.phone_Number.message}</p>}
      </div>

      {/* Gender & Shift */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Gender</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('Gender', { required: 'Gender is required' })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.Gender && <p className="text-red-500 text-sm mt-1">{errors.Gender.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Shift</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('Shift', { required: 'Shift is required' })}
          >
            <option value="">Select Shift</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>
          {errors.Shift && <p className="text-red-500 text-sm mt-1">{errors.Shift.message}</p>}
        </div>
      </div>

      {/* Shift Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Shift Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('Shift_Data', { required: 'Shift date is required' })}
          />
          {errors.Shift_Data && <p className="text-red-500 text-sm mt-1">{errors.Shift_Data.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Shift Time</label>
          <input
            type="time"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('Shift_Time', { required: 'Shift time is required' })}
          />
          {errors.Shift_Time && <p className="text-red-500 text-sm mt-1">{errors.Shift_Time.message}</p>}
        </div>
      </div>

      {/* Aadhar Card Upload */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Upload Aadhar Card</label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          {!Aadhar_Card ? (
            <label className="cursor-pointer">
              <div className='flex flex-col items-center'>
                <MdOutlineAddPhotoAlternate className='text-2xl text-[#A7A7A7]' />
                <p className="text-blue-500 font-semibold">Upload a file <span className='text-[#4F4F4F]'>or drag and drop</span></p>
                <p className='text-[#A7A7A7] text-sm'>PNG, JPG, GIF up to 10MB</p>
              </div>
              <input
                type="file"
                accept=".png, .jpg, .jpeg,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <img src={URL.createObjectURL(Aadhar_Card)} alt="Aadhar Preview" className="w-12 h-12 object-contain" />
                <div>
                  <p className="text-gray-600 text-sm text-left truncate max-w-[180px]">{Aadhar_Card.name}</p>
                  <p className="text-gray-600 text-sm">{Aadhar_Cardsize}</p>
                </div>
              </div>
              <button 
                onClick={handleRemoveFile} 
                className="text-red-500 text-sm whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <CloseButton 
          CloseName="Cancel" 
          Addclass="w-full sm:w-1/2" 
          type="button" 
          onClick={CloseAddSecurity} 
        />
        <LodingButton 
          loading={loading} 
          Addclass="w-full sm:w-1/2" 
          Btn_Name="Create" 
          type="submit" 
        />
      </div>
    </div>
  </form>
</div>
    );
};

export default AddSecurityModal;