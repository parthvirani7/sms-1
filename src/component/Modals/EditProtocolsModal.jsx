import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Edit_Delete_Security_Protocols } from '../services/Api/api';
import axios from 'axios';
import CloseButton from '../layout/CloseButton'
import Loding_Button from '../layout/Loding_Button';

const EditProtocolsModal = ({ _id, CloseEditProtocols }) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [loding, setloding] = useState(false)

    useEffect(() => {
        // Fetch data and set form values
        const Fdata = async () => {
            try {
                const res = await axios.get(`https://society-management-app-server.onrender.com/security/getprotocol/${_id}`);
                const { Title, Description, Date: apiDate, Time: apiTime } = res.data;
    
                // Format the Date to yyyy-MM-dd
                const formattedDate = apiDate ? new Date(apiDate).toISOString().split('T')[0] : '';
    
                // Format the Time to HH:mm
                const formattedTime = apiTime
                    ? new Date(`1970-01-01T${apiTime}`).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                      })
                    : '';
    
                // Set values in react-hook-form
                setValue("Title", Title || '');
                setValue("Description", Description || '');
                setValue("Date", formattedDate);
                setValue("Time", formattedTime);
            } catch (error) {
                console.error("Error fetching protocol data:", error);
            }
        };
    
        Fdata();
    }, [_id, setValue]);

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
        Edit_Delete_Security_Protocols(_id,data,setloding,CloseEditProtocols)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Protocol</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            {...register('Title', { required: 'Title is required', minLength: { message: 'Title is required' } })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.Title && <p className="text-red-500 text-sm">{errors.Title.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            placeholder="Enter Description"
                            {...register('Description', { required: 'Description is required', minLength: { message: 'Description is required' } })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.Description && <p className="text-red-500 text-sm">{errors.Description.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Date<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            {...register('Date', { required: 'Date is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.Date && <p className="text-red-500 text-sm">{errors.Date.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Time<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            {...register('Time', { required: 'Time is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.Time && <p className="text-red-500 text-sm">{errors.Time.message}</p>}
                    </div>
                    <div className="flex justify-between mt-4">
                        <CloseButton CloseName="Cancel" type="button" onClick={CloseEditProtocols} Addclass="w-1/2" />
                        <Loding_Button loading={loding} type="submit" Addclass="w-1/2" Btn_Name="Save"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProtocolsModal;
