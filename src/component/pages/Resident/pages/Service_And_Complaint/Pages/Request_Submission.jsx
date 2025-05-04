import React, { useEffect, useState } from 'react'
import Button from '../../../../../layout/Button_gradient';
import { BsThreeDotsVertical } from 'react-icons/bs';
import RequestModal from '../Modal/RequestModal';
import DeleteLoding from '../../../../../layout/DeleteLoding';
import { DeleteRequest_Submission, GetRequest_Submission } from '../../../Api/api';

const Request_Submission = () => {

    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
    };

    const [Complaint, setComplaint] = useState(false)
    const [loadingData, setloadingData] = useState(true)

    const closeComplaint = () => {
        setComplaint(false)
    }

    useEffect(() => {
        Fdata()
    }, [])

    const [data, setdata] = useState('')

    const Fdata = () => {
        GetRequest_Submission(setdata, setloadingData)
    }

    // Delete

    const [Delete, setDelete] = useState(false)
    const [DId, setDId] = useState('')
    const [loadingDelete, setloadingDelete] = useState(false)

    const OpneDelete = (_id) => {
        setDelete(true);
        setDId(_id)
        console.log(_id);

    }

    const closeDelete = () => {
        setDelete(false);
    }

    const DeleteClick = () => {
        DeleteRequest_Submission(data, setdata, closeDelete, DId, setloadingDelete)
    };

    return (
        <div>
            <div className="p-6 bg-white rounded-lg">
                <div className="flex justify-between items-center mb-6  ">
                    <h1 className="text-xl lg:text-2xl font-semibold">Request</h1>
                    <Button onClick={() => setComplaint(true)} Btn_Name="Create Complaint" />
                    {Complaint && (<RequestModal Fdata={Fdata} close={closeComplaint} />)}
                </div>
                {loadingData ? (
                    <div className='flex justify-center h-full items-center'>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <div key={index} className="bg-white shadow-md rounded-md relative">
                                    <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-blue-600">
                                        <h2 className="text-lg font-semibold text-white">{item.Request_Name}</h2>
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="text-blue-500 bg-white rounded-md pb-1 focus:outline-none"
                                            >
                                                <BsThreeDotsVertical className="h-5 w-5 mt-1" />
                                            </button>
                                            {dropdownOpenIndex === index && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                                                    <ul className="py-1 text-gray-700">
                                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => OpneDelete(item._id)}>
                                                            Delete
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 mb-4 p-2">
                                        <div className="text-sm text-gray-500 flex justify-between">
                                            Request Date:
                                            <span className="ml-2 text-base font-semibold text-gray-700">{new Date(item.Request_Date).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex justify-between">
                                            Status:
                                            <span className={`px-3 py-1 rounded-full text-md font-medium flex justify-center ${item.Status === "Open" ? "bg-[#eef1fd] text-[#5678e9]" :
                                                item.Status === "Pending" ? "bg-[#fff9e7] text-[#ffc313]" :
                                                    item.Status === "Solve" ? "bg-[#ebf5ec] text-[#39973d]" : null
                                                }`}>{item.Status}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex justify-between">
                                        Priority:
                                        
                                        <span className={`px-3 py-1 rounded-full text-md font-medium flex justify-center ${item.Priority ==="High" ? "bg-[#d32727] text-[#ffffff]" :
                                                item.Priority === "Medium" ? "bg-[#daad29] text-[#ffffff]" :
                                                    item.Priority === "Low" ? "bg-[#1d9729] text-[#ffffff]" : null
                                                }`}>{item.Priority}</span> </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-4 text-gray-500">No data available.</div>
                        )}
                    </div>
                )}
                {Delete && (<DeleteLoding loading={loadingDelete} close={closeDelete} DeleteClick={DeleteClick} />)}
            </div>
        </div>
    )
}

export default Request_Submission
