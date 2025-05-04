import React from 'react';
import { useForm } from 'react-hook-form';
import CloseButton from '../layout/CloseButton';
import Loding_Button from '../layout/Loding_Button';
import { Facility_Management_Post } from '../services/Api/api';

const Create_facility_model = ({ setClosecreate_facility, Fdata }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setloading] = React.useState(false);

    const onSubmit = (data) => {
        Facility_Management_Post(data, Fdata, setClosecreate_facility, setloading);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 p-6 overflow-auto max-h-svh">
                <h2 className="text-xl font-semibold mb-4">Create Facility</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Facility Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            {...register('facilityname', { required: 'Facility name is required' })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.facilityname ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.facilityname && <p className="text-red-500 text-sm">{errors.facilityname.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            placeholder="Enter Description"
                            {...register('description', { required: 'Description is required' })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.description ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Schedule Service Date</label>
                        <input
                            type="date"
                            {...register('scheduleservicedate')}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Remind Before</label>
                        <select
                            {...register('remindbefore')}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Day</option>
                            <option value={1}>1 Day Before</option>
                            <option value={2}>2 Days Before</option>
                            <option value={3}>3 Days Before</option>
                        </select>
                    </div>

                    <div className="flex justify-between mt-4">
                        <CloseButton type="button" onClick={() => setClosecreate_facility(false)} Addclass="w-1/2" CloseName="Cancel" />
                        <Loding_Button
                            loading={loading}
                            Addclass="w-1/2"
                            Btn_Name="Save"
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create_facility_model;
