import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { EditNotes } from '../services/Api/api';
import CloseButton from '../layout/CloseButton'
import LodingButton from '../layout/Loding_Button'

const EditNote = ({ _id, seteditcreate }) => {
    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        formState: { errors } 
    } = useForm();

    const [loading, setloading] = useState(false)

    useEffect(() => {
        Getdata();
    }, []);

    const Getdata = async () => {
        try {
            const res = await axios.get(`https://society-management-app-server.onrender.com/note/getNote/${_id}`);
            const { Title, Description, Date } = res.data;
            setValue('Title', Title);
            setValue('Description', Description);
            setValue('Date', Date?.split('T')[0]);
        } catch (error) {
            console.error("Failed to fetch note data:", error);
        }
    };

    const onSubmit = (formData) => {
        EditNotes(_id,formData,setloading,seteditcreate)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 p-6 overflow-auto max-h-svh"
            >
                <h2 className="text-xl font-semibold mb-4">Edit Note</h2>

                {/* Title Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        {...register('Title', { required: 'Title is required' })}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.Title && 'border-red-500'}`}
                        value={watch('Title', '')}
                    />
                    {errors.Title && <p className="text-red-500 text-sm">{errors.Title.message}</p>}
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        placeholder="Enter Description"
                        {...register('Description', { required: 'Description is required' })}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description && 'border-red-500'}`}
                        value={watch('Description', '')}
                    />
                    {errors.Description && <p className="text-red-500 text-sm">{errors.Description.message}</p>}
                </div>

                {/* Date Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
                    <input
                        type="date"
                        {...register('Date', { required: 'Date is required' })}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.Date && 'border-red-500'}`}
                        value={watch('Date', '')}
                    />
                    {errors.Date && <p className="text-red-500 text-sm">{errors.Date.message}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                    <CloseButton type="button" Addclass="w-1/2" onClick={() => seteditcreate(false)} CloseName="Cancel"/>
                    <LodingButton Addclass="w-1/2" loading={loading}  type="submit" Btn_Name="Save"/>
                </div>
            </form>
        </div>
    );
};

export default EditNote;
