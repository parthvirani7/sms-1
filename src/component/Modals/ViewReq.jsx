import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewReq = ({ _id, closeViewComplint }) => {


    const [editNumber, setEditNumber] = useState([]);

    useEffect(() => {
        editdata();
    }, []);

    const editdata = async () => {
        axios.get("https://civicnest-backend.onrender.com/user").then((res) => {
            setEditNumber(res.data);
        })
    };

    const editNumberFdata = editNumber.filter((e) => e._id === _id);

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
            onClick={(e) => {
                if (e.target === e.currentTarget) closeViewComplint();
            }}>
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">View Request</h1>
                    <button type="button" className="text-gray-600 hover:text-gray-800 text-2xl" onClick={closeViewComplint}> &times; </button>
                </div>

                {editNumberFdata.length > 0 ? (
                    editNumberFdata.map((e, index) => (
                        <div key={index} className="p-4">
                            <div className="flex items-center mb-4">
                                <img src="profile-image-url.jpg" alt="Profile" className="w-18 h-18 mr-5 rounded-full" />
                                <div>
                                    <p className='font-semibold'>{e.Complainer_Name}</p>
                                    <p className="text-sm font-semibold text-[#a7a7a7]">{e.Date}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <p className="text-[#a7a7a7] ">Request Name</p>
                                <p>{e.Complainer_Name}</p>
                            </div>
                            <div className="mb-3">
                                <p className="text-[#a7a7a7]">Description</p>
                                <p>{e.Description}</p>
                            </div>
                            <div className="mb-3 grid grid-cols-4 gap-2">
                                <div className="text-center">
                                    <label className="block text-sm font-medium pb-2 text-[#a7a7a7]">Wing</label>
                                    <samp className=' px-2 py-1 text-[#5678e9] bg-[#f6f8fb] mr-2 rounded-full'>{e.Wing}</samp>
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-medium pb-2 text-[#a7a7a7]">Unit</label>
                                    <span>{e.Unit_Number}</span>
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-medium pb-2 text-[#a7a7a7]">Priority</label>
                                    <span className={`px-3 py-1 rounded-full text-md font-medium ${e.Priority === "High" ? "bg-[#e74c3c] text-white" :
                                        e.Priority === "Medium" ? "bg-[#5678e9] text-white" :
                                            e.Priority === "Low" ? "bg-[#39973d] text-white" : null
                                        }`}>{e.Priority}</span>
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-medium pb-2 text-[#a7a7a7]">Status</label>
                                    <span className={`px-3 py-1 rounded-full text-md font-medium ${e.Complain_Status === "Open" ? "bg-[#eef1fd] text-[#5678e9]" :
                                        e.Complain_Status === "Pending" ? "bg-[#fff9e7] text-[#ffc313]" :
                                            e.Complain_Status === "Solve" ? "bg-[#ebf5ec] text-[#39973d]" : null
                                        }`}>{e.Complain_Status}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-4">No data found</p>
                )}
            </div>
        </div>
    );
};

export default ViewReq;
