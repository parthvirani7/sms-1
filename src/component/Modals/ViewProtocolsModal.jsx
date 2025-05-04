import React, { useEffect, useState } from 'react'
import { Get_Security_Protocols } from '../services/Api/api';
import axios from 'axios';

const ViewProtocolsModal = ({ _id, CloseViewProtocols }) => {

    useEffect(() => {
        Fdata()
    }, [])

    const [Security, setSecurity] = useState([])
    const [loding, setloding] = useState(true)

    useEffect(() => {
        Fdata()
    }, [])

    const Fdata = () => {
        axios.get(`https://society-management-app-server.onrender.com/security/getprotocol/${_id}`).then((res) => {
            setSecurity(Array.isArray(res.data) ? res.data : [res.data]);
            setloding(false)
        })
    }

    return (
        <div
            className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
            onClick={(e) => { if (e.target === e.currentTarget) CloseViewProtocols() }}>
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">View Security Protocol</h1>
                    <button
                        type="button"
                        className="text-gray-600 hover:text-gray-800 text-2xl"
                        onClick={CloseViewProtocols}
                    >
                        &times;
                    </button>
                </div>
                {loding ? (
                    <div className='flex justify-center py-6'>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                    </div>
                ) : (
                    <div>
                        {Security.map((e, index) => {
                            return (
                                <div key={index}>
                                    <div className='p-5'>
                                        <div className='mb-2'>
                                            <p className='text-md text-[#a7a7a7]'>Title</p>
                                            <p className="text-md">{e.Title}</p>
                                        </div>
                                        <div>
                                            <p className='text-md text-[#a7a7a7]'>Description</p>
                                            <p className="text-md">{e.Description}</p>
                                        </div>
                                        <div className='flex'>
                                            <div className='mr-10'>
                                                <p className='text-md text-[#a7a7a7]'>Date</p>
                                                <p className="text-md">{e.Date}</p>
                                            </div>
                                            <div>
                                                <p className='text-md text-[#a7a7a7]'>Time</p>
                                                <p className="text-md">{e.Time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

            </div>
        </div>
    )
}

export default ViewProtocolsModal
