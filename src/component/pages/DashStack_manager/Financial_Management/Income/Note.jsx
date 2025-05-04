import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../layout/Sidebar';
import Header from '../../../../layout/Header';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CreateNote from '../../../../Modals/CreateNote';
import EditNote from '../../../../Modals/EditNote';
import DeleteLoding from '../../../../layout/DeleteLoding';
import { DeleteNotes, GetNotes } from '../../../../services/Api/api';
import Button from '../../../../layout/Button_gradient'
import useSidbarTogal from '../../../../layout/useSidbarTogal';

const Note = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})

  // get
  const [Notes, setNotes] = useState([])
  const [lodingData, setlodingData] = useState(true)
  // post
  const [create, setcreate] = useState(false);
  // delete
  const [DeleteBox, setDeleteBox] = useState(false);
  const [loading, setloading] = useState(false)
  const [DeleteId, setDeleteId] = useState([])
  // edit
  const [editcreate, seteditcreate] = useState(false);
  const [EditId, setEditId] = useState([])
  // Get

  useEffect(() => {
    Fdata()
  }, [0])

  const Fdata = () => {
    GetNotes(setNotes, setlodingData)
  }

  //Add ..

  const sowcreate = () => {
    setcreate(true);
  };

  const Closecreate = () => {
    setcreate(false);
  };

  // Edit ...
  const editsowcreate = (_id) => {
    seteditcreate(true);
    setEditId(_id);

  };
  const editClosecreate = () => {
    seteditcreate(false);
  };

  //Delete...
  const DeleteOpen = (_id) => {
    setDeleteBox(true);
    setDeleteId(_id)
  };
  const DeleteClose = () => {
    setDeleteBox(false);
  };
  const DeleteClick = () => {
    DeleteNotes(DeleteId, setloading, DeleteClose, Fdata)
  }

  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };

  return (
    <div>
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id='main' className={`ml-[${getdata}px] max-[425px]:ml-0`}>
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <div className="flex-1 bg-[#f0f5fb] h-dvh">
          <div className="p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className='font-semibold md:text-2xl text-xl'>Note</h1>
                <Button onClick={sowcreate} Btn_Name="Create Note" />
                {create && (<CreateNote Fdata={Fdata} setcreate={Closecreate} />)}
              </div>
              {lodingData ? (
                <div className='flex justify-center'>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
                  {Notes.map((item, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md relative">
                      <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">{item.Title}</h2>
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
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => editsowcreate(item._id)}>
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
                        <div className="text-sm text-gray-500">
                          Description
                          <p className="text-black text-sm">{item.Description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {editcreate && (<EditNote _id={EditId} seteditcreate={editClosecreate} />)}
                  {DeleteBox && (< DeleteLoding DeleteClick={DeleteClick} loading={loading} close={DeleteClose} />)}
                </div>

              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note