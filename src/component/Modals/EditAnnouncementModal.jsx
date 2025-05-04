import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import CloseButton from '../layout/CloseButton'
import LodingButton from '../layout/Loding_Button'
import { EditAnnouncement } from '../services/Api/api';

const EditAnnouncementModal = ({ ClaseEditAnnouncement, _id, LodaData }) => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setloading] = useState(false)

  useEffect(() => {
    Fdata()
  }, [])

  const Fdata = () => {
    axios.get(`https://society-management-app-server.onrender.com/announcement/getAnnouncement/${_id}`).then((res) => {
      setValue('title', res.data.title);
      setValue('description', res.data.description);
      setValue('date', format(new Date(res.data.date), 'yyyy-MM-dd'));
      setValue('time', res.data.time);
    })
    
  }

  const onSubmit = (formData) => {
    EditAnnouncement(_id,formData,ClaseEditAnnouncement,setloading,LodaData)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
      <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 overflow-auto max-h-svh">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-lg font-semibold">Add Announcement</h1>
          <button type="button" className="text-gray-600 hover:text-gray-800 text-2xl" onClick={ClaseEditAnnouncement}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Announcement Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('title', { required: "Title is required" })}
              onChange={handleChange} 
            />
            {errors.Announcement_Title && <p className="text-red-500 text-sm">{errors.Announcement_Title.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Description"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('description', { required: "Description is required" })}
              onChange={handleChange} // Handle change event
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="flex justify-between">
            <div className="mr-2 w-1/2">
              <label className="text-gray-800 text-sm font-medium">
                Announcement Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('date', { required: "Date is required" })}
                onChange={handleChange} // Handle change event
              />
              {errors.announcementDate && <p className="text-red-500 text-sm">{errors.announcementDate.message}</p>}
            </div>

            <div className="ml-2 w-1/2">
              <label className="text-gray-800 text-sm font-medium">
                Announcement Time<span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                {...register('time', { required: "Time is required" })}
                onChange={handleChange} 
              />
              {errors.announcementTime && <p className="text-red-500 text-sm">{errors.announcementTime.message}</p>}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <CloseButton Addclass="w-1/2" type="button" CloseName="Cancel" onClick={() => ClaseEditAnnouncement(false)}/>
            <LodingButton loading={loading} type="submit" Btn_Name="Save" Addclass="w-1/2"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAnnouncementModal
