import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../layout/Sidebar';
import Header from '../../../../layout/Header';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { GrFormView } from 'react-icons/gr';
import { DeleteRequest, GetRequest } from '../../../../services/Api/api';
import Create_Request from '../../../../Modals/Create_Request';
import OpenEditReq from '../../../../Modals/OpenEditReq';
import ViewReq from '../../../../Modals/ViewReq';
import Button from '../../../../layout/Button_gradient';
import DeleteLoding from '../../../../layout/DeleteLoding'
import useSidbarTogal from '../../../../layout/useSidbarTogal';

const Request_Tracking = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})

  useEffect(() => {
    getComplaintdata()
  }, [])

  const [getComplaint, setgetComplaint] = useState([]);
  const [loadingRequest, setloadingRequest] = useState(true)
  const getComplaintdata = () => {
    GetRequest(setgetComplaint, setloadingRequest)
  }

  const [createComplint, setcreateComplint] = useState(false);
  const [EditComplint, setEditComplint] = useState(false);
  const [DeleteComplint, setDeleteComplint] = useState(false);
  const [loadingDelete, setloadingDelete] = useState(false)
  const [ViewComplint, setViewComplint] = useState(false);
  const [a_id, seta_id] = useState([]);
  const [b_id, setb_id] = useState([]);
  const [c_id, setc_id] = useState([]);

  const closecreateComplint = () => {
    setcreateComplint(false);
  }

  const OpneEditComplint = (_id) => {
    setEditComplint(true);
    seta_id(_id)
  }
  const closeEditComplint = () => {
    setEditComplint(false);
  }

  const OpneViewComplint = (_id) => {
    setViewComplint(true)
    setb_id(_id)
  }
  const closeViewComplint = () => {
    setViewComplint(false);
  }

  const OpneDeleteComplint = (_id) => {
    setDeleteComplint(true)
    setc_id(_id)
  }
  const CloseDeleteComplint = () => {
    setDeleteComplint(false);
  }
  const DeleteData = () => {
    const _id = c_id
    DeleteRequest(_id, setloadingDelete, CloseDeleteComplint, getComplaint, setgetComplaint)
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
            <div className="bg-white shadow-md rounded-lg p-6 h-svh">
              <div className="flex justify-between items-center mb-6">
                <h1 className='font-semibold md:text-2xl text-lg'>Create Request</h1>
                <Button type="button" onClick={() => setcreateComplint(true)} Btn_Name="Create Request" />
                {createComplint && (<Create_Request setClosecreateComplint={closecreateComplint} getComplaintdata={getComplaintdata} />)}
              </div>
              <div className="overflow-auto">
                {loadingRequest ? (
                  <div className='flex justify-center'>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                  </div>
                ) : (
                  <table className="min-w-full bg-[#eef1fd] rounded-lg">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Requester Name
                        </th>
                        <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Request Name
                        </th>
                        <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Request Date
                        </th>
                        <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Unit Number
                        </th>
                        <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Priority
                        </th>
                        <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Status
                        </th>
                        <th className="px-3 py-3 border-b font-medium text-sm lg:text-md md:text-md">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getComplaint.map((e, index) => {
                        return (
                          <tr key={index} className="border-b bg-white hover:bg-gray-50 font-medium text-center md:font-semibold overflow-x-scroll">
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex items-center">
                              <img className="w-8 h-8 rounded-full mr-1" src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770799/bl9awma4kwu1d9tdrakp.png
" alt="profile" />
                              <span>{e.Requester_Name}</span>
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.Request_Name}</td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">
                              {new Date(e.Request_Date).toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">
                              <samp className=' px-2 py-1 text-[#5678e9] bg-[#f6f8fb] mr-2 rounded-full'>{e.Wing}</samp>
                              {e.Unit}
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 ">
                              <span className={`px-3 py-1 rounded-full text-md font-medium flex justify-center ${e.Priority === "High" ? "bg-[#e74c3c] text-white" :
                                e.Priority === "Medium" ? "bg-[#5678e9] text-white" :
                                  e.Priority === "Low" ? "bg-[#39973d] text-white" : null
                                }`}>{e.Priority}</span>
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">
                              <span className={`px-3 py-1 rounded-full text-md font-medium flex justify-center ${e.Status === "Open" ? "bg-[#eef1fd] text-[#5678e9]" :
                                e.Status === "Pending" ? "bg-[#fff9e7] text-[#ffc313]" :
                                  e.Status === "Solve" ? "bg-[#ebf5ec] text-[#39973d]" : null
                                }`}>{e.Status}
                              </span>
                            </td>
                            <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex space-x-2 md:space-x-2">
                              <button className="text-green-500 p-1" onClick={() => OpneEditComplint(e._id)}>
                                <FaEdit />
                              </button>

                              <button className="text-blue-500 text-2xl rounded" onClick={() => OpneViewComplint(e._id)}>
                                <GrFormView />
                              </button>

                              <button onClick={() => OpneDeleteComplint(e._id)} className="text-red-500 p-1">
                                <FaTrashAlt />
                              </button>
                            </td>
                          </tr>
                        )
                      })}

                    </tbody>
                  </table>
                )}

                {EditComplint && <OpenEditReq _id={a_id} closeEditComplint={closeEditComplint} Lodata={getComplaintdata} />}
                {ViewComplint && <ViewReq _id={b_id} closeViewComplint={closeViewComplint} />}
                {DeleteComplint && <DeleteLoding close={CloseDeleteComplint} loading={loadingDelete} DeleteClick={DeleteData} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Request_Tracking;

