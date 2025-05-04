import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import Header from '../../../layout/Header'
import { BsThreeDotsVertical } from 'react-icons/bs';
import Create_facility_model from '../../../Modals/Create_facility_model';
import Editcreate_facility_Modal from '../../../Modals/Editcreate_facility_Modal';
import DeleteModal from '../../../layout/DeleteLoding';
import { Facility_Management_Delete, Facility_Management_Get } from '../../../services/Api/api';
import Button from '../../../layout/Button_gradient'
import useSidbarTogal from '../../../layout/useSidbarTogal';

const Facility_Management = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})

  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  // get
  const [incomeData, setincomeData] = useState([])
  const [loadingFacility, setloadingFacility] = useState(true)
  // post
  const [create_facility, setcreate_facility] = useState(false);
  // delete
  const [DeleteBox, setDeleteBox] = useState(false);
  const [DeleteId, setDeleteId] = useState([])
  const [loading, setloading] = useState(false)
  // edit
  const [editcreate_facility, seteditcreate_facility] = useState(false);
  const [EditId, setEditId] = useState([])

  useEffect(() => {
    Fdata()
  }, [])

  const Fdata = () => {
    Facility_Management_Get(setincomeData, setloadingFacility)
  }

  const toggleDropdown = (index) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };

  // Create
  const sowcreate_facility = () => {
    setcreate_facility(true);
  };
  const Closecreate_facility = () => {
    setcreate_facility(false);
  };

  // Edit
  const editsowcreate_facility = (_id) => {
    seteditcreate_facility(true);
    setEditId(_id)
  };
  const editClosecreate_facility = () => {
    seteditcreate_facility(false);
  };

  // Delete
  const DeleteOpen = (_id) => {
    setDeleteBox(true);
    setDeleteId(_id)
  };

  const DeleteData = () => {
    Facility_Management_Delete(DeleteId, DeleteClose, setloading, incomeData, setincomeData)
  }

  const DeleteClose = () => {
    setDeleteBox(false);
  };

  return (
    <div>
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id='main' className={`ml-[${getdata}px] max-[425px]:ml-0`} >
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <div className="flex-1 bg-[#f0f5fb] h-dvh">
          <div className="p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className='font-semibold md:text-2xl text-lg'>Facility Management</h1>
                <Button onClick={sowcreate_facility} Btn_Name='Create Facility' />
                {create_facility && (<Create_facility_model Fdata={Fdata} setClosecreate_facility={Closecreate_facility} />)}
              </div>
              {loadingFacility ? (
                <div className='flex justify-center'>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
                  {incomeData.map((item, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md relative">
                      <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">{item.Facility_Name}</h2>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="text-blue-500  bg-white   rounded-md  pb-1 focus:outline-none"
                          >
                            <BsThreeDotsVertical className="h-5 w-5 mt-1" />
                          </button>
                          {dropdownOpenIndex === index && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                              <ul className="py-1 text-gray-700">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => editsowcreate_facility(item._id)}>
                                  Edit
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => DeleteOpen(item._id)}>
                                  Delete
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mb-4 p-2">
                        <div className="text-sm text-gray-500 flex justify-between">
                          Upcoming Schedule Service Date
                          <span className="ml-1 text-base font-semibold text-black">
                            {new Date(item.Schedule_Service_Date).toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="text-gray-500">
                          Description
                          <p className="text-black text-wrap">{item.Description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
        {editcreate_facility && (<Editcreate_facility_Modal lodData={Fdata} _id={EditId} seteditcreate_facility={editClosecreate_facility} />)}
        {DeleteBox && (<DeleteModal DeleteClick={DeleteData} close={DeleteClose} loading={loading} />)}
      </div>
    </div >
  )
}

export default Facility_Management
