import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../layout/Sidebar';
import Header from '../../../../layout/Header';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { GrFormView } from 'react-icons/gr';
import ViewProtocolsModal from '../../../../Modals/ViewProtocolsModal';
import { Delete_Security_Protocols, Get_Security_Protocols } from '../../../../services/Api/api';
import AddProtocolsModal from '../../../../Modals/AddProtocolsModal';
import EditProtocolsModal from '../../../../Modals/EditProtocolsModal';
import DeleteLoding from '../../../../layout/DeleteLoding'
import useSidbarTogal from '../../../../layout/useSidbarTogal';

const Security_Protocols = () => {

    const [isOpen, setIsOpen] = useState(true);
    let [data, setdata] = useState(280);
    let [getdata, setget] = useState(280);
    const toggleNav = () => {
        setIsOpen((prevState) => !prevState);
    };

    useSidbarTogal({setdata, setget, isOpen})

    const [Security, setSecurity] = useState([])
    const [loding, setloding] = useState(true)

    useEffect(() => {
        Fdata()
    }, [])

    const Fdata = () => {
        Get_Security_Protocols(setSecurity, setloding)
    }

    const [AddProtocols, setAddProtocols] = useState(false)
    const [ViewProtocols, setViewProtocols] = useState(false)
    const [ViewId, setViewId] = useState(null)
    const [EditProtocols, setEditProtocols] = useState(false)
    const [EditId, setEditId] = useState(null)
    const [DeleteProtocols, setDeleteProtocols] = useState(false)
    const [DeleteId, setDeleteId] = useState(null)
    const [deleteloding, setdeleteloding] = useState(false)

    const OpneAddProtocols = () => {
        setAddProtocols(true)
    }
    const CloseAddProtocols = () => {
        setAddProtocols(false)
    }

    const OpneViewProtocols = (_id) => {
        setViewProtocols(true)
        setViewId(_id)
    }
    const CloseViewProtocols = () => {
        setViewProtocols(false)
    }

    const OpneEditProtocols = (_id) => {
        setEditProtocols(true)
        setEditId(_id)
    }
    const CloseEditProtocols = () => {
        setEditProtocols(false)
    }
    const OpneDeleteProtocols = (_id) => {
        setDeleteProtocols(true)
        setDeleteId(_id)
    }
    const CloseDeleteProtocols = () => {
        setDeleteProtocols(false)
    }
    const DeleteData = () => {
        const _id = DeleteId;
        Delete_Security_Protocols(_id, setdeleteloding, CloseDeleteProtocols, Security, setSecurity);
    }

    return (
        <div>
            <Sidebar toggleNav={toggleNav} data={data} />
            <div id='main' className={`ml-[${getdata}px] max-[425px]:ml-0`}>
                <div className="open_he">
                    <Header toggleNav={toggleNav} />
                </div>
                <div className="flex-1 bg-[#f0f5fb]">
                    <div className="p-6">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className='font-semibold md:text-2xl text-lg'>Security Protocols</h1>
                                <button onClick={OpneAddProtocols} className="px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-orange-600 hover:to-yellow-600 transition duration-200">
                                    Create Protocol
                                </button>
                                {AddProtocols && (<AddProtocolsModal CloseAddProtocols={CloseAddProtocols} Fdata={Fdata} />)}
                            </div>
                            <div className="overflow-auto h-svh">
                                {loding ? (
                                    <div className='flex justify-center'>
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                                    </div>
                                ) : (
                                    <table className="min-w-full bg-[#eef1fd] rounded-lg">
                                        <thead>
                                            <tr>
                                                <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md text-left">
                                                    Title
                                                </th>
                                                <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md text-left">
                                                    Description
                                                </th>
                                                <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                                                    Date
                                                </th>
                                                <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                                                    Time
                                                </th>
                                                <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Security.map((e, index) => {
                                                return (
                                                    <tr key={index} className="border-b bg-white hover:bg-gray-50 font-medium md:font-semibold overflow-x-scroll">
                                                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.Title}</td>
                                                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.Description}</td>
                                                        <td className="px-1 md:px-2 py-1 md:py-3 text-xs md:text-sm text-gray-700 text-center truncate">
                                                            <samp className='rounded-full px-2 py-1 bg-[#f6f8fb]'>
                                                                {new Date(e.Date).toLocaleDateString("en-US", {
                                                                    month: "2-digit",
                                                                    day: "2-digit",
                                                                    year: "numeric",
                                                                })}
                                                            </samp>
                                                        </td>
                                                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 text-center truncate">
                                                            {(() => {
                                                                const time24 = e.Time;
                                                                const [hours, minutes] = time24.split(":");
                                                                let hour = parseInt(hours, 10);
                                                                const ampm = hour >= 12 ? "PM" : "AM";
                                                                hour = hour % 12;
                                                                hour = hour ? hour : 12;
                                                                return `${hour}:${minutes} ${ampm}`;
                                                            })()}
                                                        </td>
                                                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex justify-center space-x-2 md:space-x-2">
                                                            <button onClick={() => OpneEditProtocols(e._id)} className="text-green-500 p-1">
                                                                <FaEdit />
                                                            </button>

                                                            <button onClick={() => OpneViewProtocols(e._id)} className="text-blue-500 text-2xl rounded">
                                                                <GrFormView />
                                                            </button>

                                                            <button onClick={() => OpneDeleteProtocols(e._id)} className="text-red-500 p-1">
                                                                <FaTrashAlt />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                )}

                                {EditProtocols && (<EditProtocolsModal _id={EditId} CloseEditProtocols={CloseEditProtocols} />)}
                                {ViewProtocols && (<ViewProtocolsModal _id={ViewId} CloseViewProtocols={CloseViewProtocols} />)}
                                {DeleteProtocols && (<DeleteLoding loading={deleteloding} DeleteClick={DeleteData} close={CloseDeleteProtocols} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Security_Protocols