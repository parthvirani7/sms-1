import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Post_Security_Protocols } from '../services/Api/api';
import CloseButton from '../layout/CloseButton'
import LodingButton from '../layout/Loding_Button'

const AddProtocolsModal = ({ CloseAddProtocols, Fdata }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            Title: '',
            Description: '',
            Date: '',
            Time: ''
        }
    });
    const [loding, setloding] = useState(false)

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0]; 
            const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
            setValue('Date', currentDate); 
            setValue('Time', currentTime); 
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, [setValue]);

    const onSubmit = (data) => {
        Post_Security_Protocols(data, CloseAddProtocols, Fdata,setloding);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-4">Create Note</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            {...register('Title', { required: 'Title is required' })}
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
                            {...register('Description', { required: 'Description is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.Description && <p className="text-red-500 text-sm">{errors.Description.message}</p>}
                    </div>
                    <div className="flex justify-between mt-4">
                        <CloseButton CloseName="Cancel" type="button" onClick={CloseAddProtocols} Addclass="w-1/2"/>
                        <LodingButton loading={loding} type="submit" Btn_Name="Save" Addclass="w-1/2" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProtocolsModal;
