import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import Header from '../../../layout/Header'
import { DeleteGuard_Details, GetGuard_Details } from '../../../services/Api/api';
import { FaEdit, FaFemale, FaMale, FaTrashAlt } from 'react-icons/fa';
import { GrFormView } from 'react-icons/gr';
import { PiMoonFill } from "react-icons/pi";
import { IoSunnySharp } from "react-icons/io5";
import AddSecurityModal from '../../../Modals/AddSecurityModal';
import ViewSecurityModal from '../../../Modals/ViewSecurityModal';
import EditSecurityModal from '../../../Modals/EditSecurityModal';
import DeleteLoding from '../../../layout/DeleteLoding'
import useSidbarTogal from '../../../layout/useSidbarTogal';

const Security_Guard = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})

  const [Guard_Details, setGuard_Details] = useState([]);
  const [lodingData, setlodingData] = useState(true)

  useEffect(() => {
    Fdata()
  }, [])

  const Fdata = () => {
    GetGuard_Details(setGuard_Details,setlodingData)
  }

  const [AddSecurity, setAddSecurity] = useState(false)
  const [ViewSecurity, setViewSecurity] = useState(false)
  const [ViewId, setViewId] = useState(null)
  const [EditSecurity, setEditSecurity] = useState(false)
  const [EditId, setEditId] = useState(null)
  const [DeleteSecurity, setDeleteSecurity] = useState(false)
  const [DeleteId, setDeleteId] = useState(null)
  const [loadingDelete, setloadingDelete] = useState(false)

  const OpneAddSecurity = () => {
    setAddSecurity(true)
  }
  const CloseAddSecurity = () => {
    setAddSecurity(false)
  }

  const OpneEditSecurity = (_id) => {
    setEditSecurity(true)
    setEditId(_id)
  }
  const CloseEditSecurity = () => {
    setEditSecurity(false)
  }

  const OpneViewSecurity = (_id) => {
    setViewSecurity(true)
    setViewId(_id)
  }
  const CloseViewSecurity = () => {
    setViewSecurity(false)
  }

  const OpneDeleteSecurity = (_id) => {
    setDeleteSecurity(true)
    setDeleteId(_id)
  }
  const CloseDeleteSecurity = () => {
    setDeleteSecurity(false)
  }
  const DeleteCliced = () => {
    const _id = DeleteId;
    DeleteGuard_Details(_id, setloadingDelete, Guard_Details, setGuard_Details, CloseDeleteSecurity)
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
                <h1 className='font-semibold md:text-2xl text-md'>Security Guard Details</h1>
                <button onClick={OpneAddSecurity} className="px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-400 transition duration-200">
                  Add Security
                </button>
                {AddSecurity && (<AddSecurityModal CloseAddSecurity={CloseAddSecurity} Fdata={Fdata} />)}
              </div>
              <div className="overflow-auto h-svh">
                {lodingData ? (
                  <div className='flex justify-center'>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                  </div>
                ) : (
                  <table className="min-w-full bg-[#eef1fd] rounded-lg">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b font-medium text-sm lg:text-md md:text-md text-left">
                          Security Guard Name
                        </th>
                        <th className="px-5 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Phone Number
                        </th>
                        <th className="px-5 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Select Shift
                        </th>
                        <th className="px-5 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Shift Date
                        </th>
                        <th className="px-5 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Shift Time
                        </th>
                        <th className="px-5 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Gender
                        </th>
                        <th className="px-5 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Guard_Details.map((e, index) => {
                        return (
                          <tr key={index} className="border-b bg-white hover:bg-gray-50 font-medium text-center md:font-semibold overflow-x-scroll">
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex items-center">
                              <img className="w-8 h-8 rounded-full mr-1" src={e.photo} alt="profile" />
                              <span>{e.Full_Name}</span>
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.phone_Number}</td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">
                              <span className={`px-3 py-1 rounded-full text-md font-medium flex justify-center items-center ${e.Shift === "High" ? "bg-[#e74c3c] text-white" :
                                e.Shift === "Day" ? "bg-[#f4f4f4] text-[#ff9300]" :
                                  e.Shift === "Night" ? "bg-[#4f4f4f] text-white" : ""
                                }`}>
                                {e.Shift === "Day" && <IoSunnySharp className='mr-1' />}
                                {e.Shift === "Night" && <PiMoonFill className='mr-1' />}
                                {` ${e.Shift}`}
                              </span>
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">
                              {new Date(e.Shift_Data).toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">
                              {(() => {
                                const time24 = e.Shift_Time;
                                const [hours, minutes] = time24.split(":");
                                let hour = parseInt(hours, 10);
                                const ampm = hour >= 12 ? "PM" : "AM";
                                hour = hour % 12;
                                hour = hour ? hour : 12;
                                return `${hour}:${minutes} ${ampm}`;
                              })()}
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">
                              <span className={`px-3 py-1 rounded-full text-md font-medium flex justify-center items-center ${e.Gender === "High" ? "bg-[#e74c3c] text-white" :
                                e.Gender === "Male" ? "bg-[#e9f6fc] text-[#5678e9]" :
                                  e.Gender === "Female" ? "bg-[#fff1f6] text-[#fe76a8]" : ""
                                }`}>
                                {e.Gender === "Male" && <FaMale className='mr-1' />}
                                {e.Gender === "Female" && <FaFemale className='mr-1' />}
                                {` ${e.Gender}`}
                              </span>
                            </td>


                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex space-x-2 md:space-x-2">
                              <button onClick={() => OpneEditSecurity(e._id)} className="text-green-500 p-1">
                                <FaEdit />
                              </button>

                              <button onClick={() => OpneViewSecurity(e._id)} className="text-blue-500 text-2xl rounded">
                                <GrFormView />
                              </button>

                              <button onClick={() => OpneDeleteSecurity(e._id)} className="text-red-500 p-1">
                                <FaTrashAlt />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}

                {EditSecurity && (<EditSecurityModal _id={EditId} CloseEdit={CloseEditSecurity} Fdata={Fdata}/>)}
                {ViewSecurity && (<ViewSecurityModal _id={ViewId} CloseView={CloseViewSecurity} />)}
                {DeleteSecurity && (<DeleteLoding loading={loadingDelete} DeleteClick={DeleteCliced} close={CloseDeleteSecurity} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security_Guard
