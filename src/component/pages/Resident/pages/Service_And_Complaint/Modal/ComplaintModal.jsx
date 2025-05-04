import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CloseBtn from '../../../../../layout/CloseButton'
import Loding_Button from '../../../../../layout/Loding_Button'
import { PostComplaint } from '../../../Api/api';

const ComplaintModal = ({ close ,Fdata}) => {
    const getCurrentDate = () => {
        const today = new Date();
        return `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            complainername: '',
            complaintname: '',
            description: '',
            wing: '',
            unit: '',
            priority: '',
            status: '',
            Date: getCurrentDate(),
        },
    });
    const [loading, setloading] = useState(false)

    const onSubmit = (data) => {
        console.log(data);
        PostComplaint(data, Fdata, close,setloading)
    };
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
            <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mx-auto relative z-60">
                <div className="flex mb-2 pb-2 justify-between items-center border-b">
                    <h2 className="text-xl font-semibold">Create Complain</h2>
                    <button type="button" className="text-gray-600 hover:text-gray-800 text-2xl" onClick={close}>
                        &times;
                    </button>
                </div>
                <form action='/profile' method='post' encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Complainer Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            {...register("complainername", { required: "Complainer name is required" })}
                            placeholder="Enter Complainer Name"
                        />
                        {errors.complainername && <p className="text-red-500 text-xs mt-1">{errors.complainername.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Complaint Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            {...register("complaintname", { required: "Complaint name is required" })}
                            placeholder="Enter Complaint Name"
                        />
                        {errors.complaintname && <p className="text-red-500 text-xs mt-1">{errors.complaintname.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">description<span className="text-red-500">*</span></label>
                        <textarea
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            {...register("description", { required: "description is required" })}
                            placeholder="Enter description"
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>
                    <div className="flex gap-2 mb-3">
                        <div className="flex-1">
                            <label className="block text-sm font-medium pb-2">Wing<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-1 text-sm border border-gray-300 rounded"
                                {...register("wing", { required: "Wing is required" })}
                                placeholder="Enter Wing"
                            />
                            {errors.wing && <p className="text-red-500 text-xs mt-1">{errors.wing.message}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium pb-2">Unit<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-1 text-sm border border-gray-300 rounded"
                                {...register("unit", { required: "Unit is required" })}
                                placeholder="Enter Unit"
                            />
                            {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Priority<span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <label className={`flex items-center px-3 py-1 border rounded-lg ${errors.priority ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2 "
                                    type="radio"
                                    value="High"
                                    {...register("priority", { required: "priority is required" })}
                                />
                                High
                            </label>
                            <label className={`flex items-center px-3 py-1 border rounded-lg ${errors.priority ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Medium"
                                    {...register("priority")}
                                />
                                Medium
                            </label>
                            <label className={`flex items-center px-3 py-1 border rounded-lg ${errors.priority ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Low"
                                    {...register("priority")}
                                />
                                Low
                            </label>
                        </div>
                        {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Status<span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <label className={`flex items-center px-3 py-1 border rounded-lg ${errors.status ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Open"
                                    {...register("status", { required: "status is required" })}
                                />
                                Open
                            </label>
                            <label className={`flex items-center px-3 py-1 border rounded-lg ${errors.status ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Pending"
                                    {...register("status")}
                                />
                                Pending
                            </label>
                            <label className={`flex items-center px-3 py-1 border rounded-lg ${errors.status ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Solve"
                                    {...register("status")}
                                />
                                Solve
                            </label>
                        </div>
                        {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                    </div>
                    <div className="flex justify-end mt-4">
                        <CloseBtn type="button" Addclass='w-1/2' onClick={close} CloseName='Cancel' />
                        <Loding_Button loading={loading} type="submit" Btn_Name='Create' Addclass='w-1/2'/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ComplaintModal
