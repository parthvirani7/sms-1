import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewComplintModel = ({ _id, closeViewComplint }) => {
    const [editNumber, setEditNumber] = useState([]);
    const [loding, setloding] = useState(true)

    useEffect(() => {
        const fetchComplaintData = async () => {
            try {
                const res = await axios.get(`https://society-management-app-server.onrender.com/complaint/getComplaint/${_id}`);
                setEditNumber(Array.isArray(res.data) ? res.data : [res.data]);
                setloding(false)
            } catch (error) {
                console.error("Error fetching complaint data:", error);
                setEditNumber([]);
                setloding(false)
            }
        };
        if (_id) fetchComplaintData();
    }, [_id]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) closeViewComplint();
            }}
        >
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">View Complaint</h1>
                    <button
                        type="button"
                        className="text-gray-600 hover:text-gray-800 text-2xl"
                        onClick={closeViewComplint}
                    >
                        &times;
                    </button>
                </div>

                {/* Complaint Details */}
                {loding ? (
                    <div className='flex justify-center h-full items-center py-5'>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                    </div>
                ) : (
                    <div>
                        {
                            editNumber.length > 0 ? (
                                editNumber.map((e, index) => (
                                    <div key={index} className="p-4">
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={e.createdBy.Image}
                                                alt="Profile"
                                                className="w-10 h-10 mr-5 rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {e.Complainer_Name || "Unknown"}
                                                </p>
                                                <p className="text-sm font-semibold text-[#a7a7a7]">
                                                    {e.createdAt
                                                        ? new Date(e.createdAt).toLocaleDateString("en-US", {
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                        })
                                                        : "Unknown Date"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-[#a7a7a7]">Request Name</p>
                                            <p>{e.Complaint_Name || "No name provided"}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-[#a7a7a7]">Description</p>
                                            <p>{e.Description || "No description provided"}</p>
                                        </div>

                                        <div className="mb-3 grid grid-cols-4 gap-2">
                                            <div className="text-left">
                                                <label className="block text-sm font-medium pb-2 text-[#a7a7a7]">
                                                    Wing
                                                </label>
                                                <span className="px-2 py-1 text-[#5678e9] bg-[#f6f8fb] mr-2 rounded-full">
                                                    {e.Wing || "N/A"}
                                                </span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium pb-2 text-[#a7a7a7]">
                                                    Unit
                                                </label>
                                                <span>{e.Unit || "N/A"}</span>
                                            </div>
                                            <div className="text-center">
                                                <label className="block text-sm font-medium pb-2 text-[#a7a7a7]">
                                                    Priority
                                                </label>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-md font-medium ${e.Priority === "High"
                                                        ? "bg-[#e74c3c] text-white"
                                                        : e.Priority === "Medium"
                                                            ? "bg-[#5678e9] text-white"
                                                            : e.Priority === "Low"
                                                                ? "bg-[#39973d] text-white"
                                                                : "bg-gray-200 text-black"
                                                        }`}
                                                >
                                                    {e.Priority || "None"}
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <label className="block text-sm font-medium pb-2 text-[#a7a7a7]">
                                                    Status
                                                </label>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-md font-medium ${e.Status === "Open"
                                                        ? "bg-[#eef1fd] text-[#5678e9]"
                                                        : e.Status === "Pending"
                                                            ? "bg-[#fff9e7] text-[#ffc313]"
                                                            : e.Status === "Solve"
                                                                ? "bg-[#ebf5ec] text-[#39973d]"
                                                                : "bg-gray-200 text-black"
                                                        }`}
                                                >
                                                    {e.Status || "Unknown"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="p-4">No data found</p>
                            )
                        }
                    </div>
                )}

            </div>
        </div>
    );
};

export default ViewComplintModel;