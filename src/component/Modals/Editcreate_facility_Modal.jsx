import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloseButton from '../layout/CloseButton'
import LodingButton from '../layout/Loding_Button'
import { Facility_Management_Edit } from '../services/Api/api';

const EditcreateFacilityModal = ({ seteditcreate_facility, _id, lodData }) => {
    const [data, setdata] = useState({
        Facility_Name: '',
        Description: '',
        Schedule_Service_Date: '',
        Remind_Before: '',
    });
    const [loading, setloading] = useState(false)

    useEffect(() => {
        Fdata();
    }, []);

    const Fdata = () => {
        axios.put(`https://society-management-app-server.onrender.com/facility/updateFacility/${_id}`).then((res) => {
            const fetchedData = res.data || {};
            setdata({
                Facility_Name: fetchedData.Facility_Name || '',
                Description: fetchedData.Description || '',
                Schedule_Service_Date: fetchedData.Schedule_Service_Date ? new Date(fetchedData.Schedule_Service_Date).toISOString().split('T')[0] : '',
                Remind_Before: fetchedData.Remind_Before || '',
            });
        })
            .catch((error) => {
                console.error("Error fetching facility data:", error);
            });
    };


    const chang = (e) => {
        const { name, value } = e.target;
        setdata((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log(data);
        Facility_Management_Edit(_id,data,seteditcreate_facility,lodData,setloading);
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 p-6 overflow-auto max-h-svh">
                    <h2 className="text-xl font-semibold mb-4">Edit Facility</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Facility Name</label>
                        <input
                            type="text"
                            name="Facility_Name"
                            value={data.Facility_Name || ''} 
                            onChange={chang}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
                        <textarea
                            name="Description"
                            value={data.Description || ''} 
                            onChange={chang}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Service Date</label>
                        <input
                            type="date"
                            name="Schedule_Service_Date"
                            value={data.Schedule_Service_Date || ''} 
                            onChange={chang}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Remind Before</label>
                        <select
                            name="Remind_Before"
                            value={data.Remind_Before || ''} 
                            onChange={chang}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Day</option>
                            <option value={1}>1 Day Before</option>
                            <option value={2}>2 Days Before</option>
                            <option value={3}>3 Days Before</option>
                        </select>
                    </div>
                    <div className="flex justify-between mt-4">
                        <CloseButton Addclass="w-1/2" onClick={() => seteditcreate_facility(false)} CloseName="Cancel"/>
                        <LodingButton Addclass="w-1/2" type="button" onClick={handleSave} Btn_Name="Save" loading={loading}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditcreateFacilityModal;
