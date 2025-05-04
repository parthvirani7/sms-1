import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateComplaint } from '../services/Api/api';
import CloseButton from '../layout/CloseButton';
import Lodingbutton from '../layout/Loding_Button';

const Create_Complint_model = ({ setClosecreateComplint, getComplaintdata }) => {
    const getCurrentDate = () => {
        const today = new Date();
        return `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    };

    const [loading, setloading] = useState(false)
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

    const onSubmit = (data) => {
        CreateComplaint(data, setClosecreateComplint, getComplaintdata, setloading)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 ">
                <div className="overflow-auto max-h-svh">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h1 className="text-lg font-semibold">Create Complaint</h1>
                        <button
                            type="button"
                            className="text-gray-600 hover:text-gray-800 text-2xl"
                            onClick={() => setClosecreateComplint(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
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
                                <label className="block text-sm font-medium pb-2">wing<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full p-1 text-sm border border-gray-300 rounded"
                                    {...register("wing", { required: "wing is required" })}
                                    placeholder="Enter wing"
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
                            <label className="block text-sm font-medium pb-2">priority<span className="text-red-500">*</span></label>
                            <div className="flex gap-2">
                                <label className={`flex items-center px-3 py-1 border rounded-lg ${errors.priority ? 'border-red-500' : ''}`}>
                                    <input
                                        className="mr-2"
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
                                        {...register("status", { required: "Status is required" })}
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
                            <CloseButton onClick={() => setClosecreateComplint(false)} Addclass="w-1/2" type="button" CloseName="Cancel" />
                            <Lodingbutton type="submit" Addclass="w-1/2" Btn_Name="Save" loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create_Complint_model;
