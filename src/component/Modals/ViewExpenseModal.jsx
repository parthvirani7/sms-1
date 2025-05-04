import React, { useEffect, useState } from 'react';
import { GetExpanse } from '../services/Api/api';
import { FaRupeeSign } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineFileImage } from 'react-icons/ai';

const ViewExpenseModal = ({ Close, _id }) => {
    const [AddExpense, setAddExpense] = useState([]);
    const [imageSize, setImageSize] = useState(null);

    useEffect(() => {
        Fdata();
    }, []);

    const Fdata = async () => {
        try {
            const data = await GetExpanse(setAddExpense);
            setAddExpense(data || []);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const fetchImageSize = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const size = response.headers.get('Content-Length');
            if (size) {
                const sizeInMB = (size / (1024 * 1024)).toFixed(2); // Convert bytes to MB
                setImageSize(`${sizeInMB} MB`);
            } else {
                setImageSize('Unknown size');
            }
        } catch (error) {
            console.error('Error fetching image size:', error);
            setImageSize('Unknown size');
        }
    };

    const ViewData = Array.isArray(AddExpense) ? AddExpense.filter((e) => e._id === _id) : [];

    useEffect(() => {
        if (ViewData.length > 0 && ViewData[0].Bill) {
            fetchImageSize(ViewData[0].Bill);
        }
    }, [ViewData]);

    const extractFileName = (url) => {
        return url.split('/').pop();
    };

    const openImage = (url) => {
        window.open(url, '_blank'); 
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
            onClick={(e) => {
                if (e.target === e.currentTarget) Close();
            }}>
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 overflow-auto max-h-svh">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">View Expense</h1>
                    <button type="button" className="text-gray-600 hover:text-gray-800 text-2xl" onClick={Close}> &times; </button>
                </div>
                {/* Display data */}
                <div className="p-4">
                    {ViewData.length > 0 ? (
                        ViewData.map((e, index) => (
                            <div key={index}>
                                <div className="mb-4">
                                    <label className="block text-[#a7a7a7] text-sm font-medium">Title</label>
                                    <p className="text-black">{e.Title}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-[#a7a7a7] text-sm font-medium">Description</label>
                                    <p className="text-black">{e.Description}</p>
                                </div>
                                <div className="flex gap-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-500 text-sm font-medium mb-1">Date</label>
                                        <p className="text-black">{new Date(e.Date).toLocaleDateString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}</p>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-500 text-sm font-medium mb-1">Amount</label>
                                        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                                            <FaRupeeSign className="text-gray-600 mr-1" />
                                            <span className="text-black">{e.Amount}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm font-medium mb-1">Bill</label>
                                    <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                                        <AiOutlineFileImage className="text-blue-500 text-2xl mr-3" />
                                        <div className="flex-1">
                                            <p className="text-black">{extractFileName(e.Bill)}</p>
                                            <p className="text-gray-500 text-sm">{imageSize || "Fetching size..."}</p>
                                        </div>
                                        <button
                                            onClick={() => openImage(e.Bill)}
                                            className="text-gray-500 hover:text-gray-700 ml-2"
                                            aria-label="View Image"
                                        >
                                            <AiOutlineEye size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No expense found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewExpenseModal;
