import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { PostAnnouncement } from '../services/Api/api';
import CloseButton from '../layout/CloseButton'
import LodingButton from '../layout/Loding_Button'

const AddAnnouncementModal = ({ ClaseAddAnnouncement, Fdata }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [loading, setloading] = useState(false)

    // Submit handler
    const onSubmit = (data) => {
        PostAnnouncement(data,Fdata,ClaseAddAnnouncement,setloading)
        reset()
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 overflow-auto max-h-svh">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Create New Announcement</h1>
                    <button type="button" className="text-gray-600 hover:text-gray-800 text-2xl" onClick={ClaseAddAnnouncement}>
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
                            {...register('title', { required: 'Title is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:black"
                        />
                        {errors.Announcement_Title && (
                            <p className="text-red-500 text-xs mt-1">{errors.Announcement_Title.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            placeholder="Enter Description"
                            {...register('description', { required: 'Description is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:black"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-between">
                        <div className="mr-2 w-1/2">
                            <label className="text-gray-800 text-sm font-medium">
                                Announcement Date<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                {...register('date', { required: 'Date is required' })}
                                className="w-full px-4 py-2 border rounded-md focus:black"
                            />
                            {errors.AnnouncementDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.AnnouncementDate.message}</p>
                            )}
                        </div>

                        <div className="ml-2 w-1/2">
                            <label className="text-gray-800 text-sm font-semibold">
                                Announcement Time<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                {...register('time', { required: 'Time is required' })}
                                className="w-full px-4 py-2 border rounded-md focus:black"
                            />
                            {errors.Announcement_Time && (
                                <p className="text-red-500 text-xs mt-1">{errors.Announcement_Time.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <CloseButton type="button" Addclass="w-1/2" CloseName="Cancel" onClick={ClaseAddAnnouncement} />
                        <LodingButton loading={loading} Addclass="w-1/2" type="submit" Btn_Name="Save"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAnnouncementModal
