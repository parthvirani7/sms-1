


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloseButton from '../layout/CloseButton';
import LodingButton from '../layout/Loding_Button'
import { EditRequest } from '../services/Api/api';

const OpenEditReq = ({ _id, closeEditComplint, Lodata }) => {

    const [editComplaint, seteditComplaint] = useState({
        Requester_Name: '',
        Request_Name: '',
        Request_Date: '',
        Wing: '',
        Unit: '',
        Priority: '',
        Status: ''
    });

    useEffect(() => {
        editdata(_id);
    }, []);

    const editdata = async (_id) => {
        try {
            const res = await axios.get(`https://society-management-app-server.onrender.com/request/getRequest/${_id}`);
            if (res.data) {
                const formattedDate = res.data.Request_Date ? new Date(res.data.Request_Date).toISOString().split('T')[0] : '';
                seteditComplaint({
                    Requester_Name: res.data.Requester_Name || '',
                    Request_Name: res.data.Request_Name || '',
                    Request_Date: formattedDate,
                    Wing: res.data.Wing || '',
                    Unit: res.data.Unit || '',
                    Priority: res.data.Priority || '',
                    Status: res.data.Status || ''
                });
            }
        } catch (error) {
            console.error('Error fetching complaint data:', error);
        }
    };

    const [loading, setloading] = useState(false)

    const handleInputChange = (e) => {
        seteditComplaint({ ...editComplaint, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        EditRequest(_id,editComplaint,closeEditComplint,setloading,Lodata)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Edit Request</h1>
                    <button
                        type="button"
                        className="text-gray-600 hover:text-gray-800 text-2xl"
                        onClick={closeEditComplint}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">  Requester Name<span className='text-red'>*</span></label>
                        <input
                            type="text"
                            className="w-full p-2 text-sm border border-gray-300 rounded"
                            name="Requester_Name"
                            value={editComplaint.Requester_Name}
                            onChange={handleInputChange}
                            placeholder="Enter   Request Name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Request Name<span className='text-red'>*</span></label>
                        <input
                            type="text"
                            className="w-full p-2 text-sm border border-gray-300 rounded"
                            name="Request_Name"
                            value={editComplaint.Request_Name}
                            onChange={handleInputChange}
                            placeholder="Enter Complaint Name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Request Date<span className="text-red-500">*</span></label>
                        <input type="date" name="Request_Date" id="Request_Date" onChange={handleInputChange} value={editComplaint.Request_Date} className="w-full p-2 text-sm border border-gray-300 rounded-lg" />

                    </div>
                    <div className="flex gap-2 mb-3">
                        <div className="flex-1">
                            <label className="block text-sm font-medium pb-2">Wing<span className='text-red'>*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 text-sm border border-gray-300 rounded"
                                name="Wing"
                                value={editComplaint.Wing}
                                onChange={handleInputChange}
                                placeholder="Enter Wing"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium pb-2">Unit<span className='text-red'>*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 text-sm border border-gray-300 rounded"
                                name="Unit"
                                value={editComplaint.Unit}
                                onChange={handleInputChange}
                                placeholder="Enter Unit"
                            />
                        </div>
                    </div>
                    <label className="block text-sm font-medium pb-2">Priority<span className='text-red'>*</span></label>
                    <div className="mb-3 justify-items-center">
                        <div className="flex gap-2">
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${editComplaint.Priority === "High" ? 'border-yellow-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="Priority"
                                    value="High"
                                    checked={editComplaint.Priority === "High"}
                                    onChange={handleInputChange}
                                />
                                High
                            </label>
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${editComplaint.Priority === "Medium" ? 'border-yellow-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="Priority"
                                    value="Medium"
                                    checked={editComplaint.Priority === "Medium"}
                                    onChange={handleInputChange}
                                />
                                Medium
                            </label>
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${editComplaint.Priority === "Low" ? 'border-yellow-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="Priority"
                                    value="Low"
                                    checked={editComplaint.Priority === "Low"}
                                    onChange={handleInputChange}
                                />
                                Low
                            </label>
                        </div>
                    </div>
                    <label className="block text-sm font-medium pb-2">Status<span className='text-red'>*</span></label>
                    <div className="mb-3 justify-items-center">
                        <div className="flex gap-2">
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${editComplaint.Status === "Open" ? 'border-yellow-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="Status"
                                    value="Open"
                                    checked={editComplaint.Status === "Open"}
                                    onChange={handleInputChange}
                                />
                                Open
                            </label>
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${editComplaint.Status === "Pending" ? 'border-yellow-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="Status"
                                    value="Pending"
                                    checked={editComplaint.Status === "Pending"}
                                    onChange={handleInputChange}
                                />
                                Pending
                            </label>
                            <label className={`flex items-center px-5 py-2 border rounded-lg ${editComplaint.Status === "Solve" ? 'border-yellow-500' : ''}`}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="Status"
                                    value="Solve"
                                    checked={editComplaint.Status === "Solve"}
                                    onChange={handleInputChange}
                                />
                                Solve
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <CloseButton Addclass="w-1/2" type="button" onClick={closeEditComplint} CloseName="Cancel" />
                        <LodingButton Addclass="w-1/2" type="button" Btn_Name="Save" loading={loading} onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenEditReq;
