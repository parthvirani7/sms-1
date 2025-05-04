import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostRequest } from '../services/Api/api';
import CloseButton from '../layout/CloseButton';
import Loding_Button from '../layout/Loding_Button';

const Create_Request = ({ setClosecreateComplint, getComplaintdata }) => {
    const getCurrentDate = () => {
        const today = new Date();
        return `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    };
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            requestername: '',
            requestname: '',
            requestdate: getCurrentDate(),
            wing: '',
            unit: '',
            priority: '',
            status: '',
        },
    });
    
    const [loading, setloading] = useState(false)

    const onSubmit = (data) => {
        PostRequest(data, setClosecreateComplint, getComplaintdata, setloading)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Create Request</h1>
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
                        <label className="block text-sm font-medium pb-2">Requester Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                            {...register("requestername", { required: "Requester Name is required" })}
                            placeholder="EnterRequester Name"
                        />
                        {errors.requestername && <p className="text-red-500 text-xs mt-1">{errors.requestername.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Request  Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                            {...register("requestname", { required: "Request  Name is required" })}
                            placeholder="Enter Request  Name"
                        />
                        {errors.requestname && <p className="text-red-500 text-xs mt-1">{errors.requestname.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Request Date<span className="text-red-500">*</span></label>
                        <input type="date" name="requestdate" id="date" className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                            {...register("requestdate", { required: "Date is required" })} />
                        {errors.requestdate && <p className="text-red-500 text-xs mt-1">{errors.requestdate.message}</p>}
                    </div>
                    <div className="flex gap-2 mb-3">
                        <div className="flex-1">
                            <label className="block text-sm font-medium pb-2 ">wing<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                                {...register("wing", { required: "wing is required" })}
                                placeholder="Enter wing"
                            />
                            {errors.Wing && <p className="text-red-500 text-xs mt-1">{errors.Wing.message}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium pb-2">Unit<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                                {...register("unit", { required: "Unit is required" })}
                                placeholder="Enter Unit"
                            />
                            {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>}
                        </div>
                    </div>
                    <label className="block text-sm font-medium pb-2 p-2">priority<span className="text-red-500">*</span></label>
                    <div className="mb-3 justify-items-center">
                        <div className="flex gap-4">
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${errors.priority ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="High"
                                    {...register("priority", { required: "priority is required" })}
                                />
                                High
                            </label>
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${errors.priority ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Medium"
                                    {...register("priority")}
                                />
                                Medium
                            </label>
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${errors.priority ? 'border-red-500' : ''}`}>
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
                    <label className="block text-sm font-medium pb-2 p-2">Status<span className="text-red-500">*</span></label>
                    <div className="mb-3  justify-items-center">
                        <div className="flex gap-2">
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${errors.status ? 'border-red-500 ' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Open"
                                    {...register("status", { required: "Status is required" })}
                                />
                                Open
                            </label>
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${errors.status ? 'border-red-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    value="Pending"
                                    {...register("status")}
                                />
                                Pending
                            </label>
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${errors.status ? 'border-red-500' : ''}`}>
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
                        <CloseButton Addclass="w-1/2" type="button" onClick={() => setClosecreateComplint(false)} CloseName="Cancel" />
                        <Loding_Button type="submit" Addclass="w-1/2" Btn_Name="Save" loading={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create_Request;
