import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import Header from '../../../layout/Header'
import { BsThreeDotsVertical } from 'react-icons/bs';
import EditAnnouncementModal from "../../../Modals/EditAnnouncementModal.jsx"
import AddAnnouncementModal from '../../../Modals/AddAnnouncementModal.jsx';
import { GetAnnouncement } from '../../../services/Api/api.jsx';
import DeleteLoding from '../../../layout/DeleteLoding.jsx'
import Button from '../../../layout/Button_gradient.jsx'
import { DeleteAnnouncementDele } from '../../../services/Api/api.jsx';
import useSidbarTogal from '../../../layout/useSidbarTogal.jsx';

const Announcement = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})

  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };

  const [getAnnouncement, setgetAnnouncement] = useState([]);
  const [Loding, setLoding] = useState(true)

  useEffect(() => {
    Fdata()
  }, [])

  const Fdata = () => {
    GetAnnouncement(setgetAnnouncement,setLoding)
  }

  const [AddAnnouncement, setAddAnnouncement] = useState(false)

  const ClaseAddAnnouncement = () => {
    setAddAnnouncement(false)
  }

  const [EditAnnouncement, setEditAnnouncement] = useState(false)
  const [EditAnnouncementId, setEditAnnouncementId] = useState([])
  const [DeleteAnnouncement, setDeleteAnnouncement] = useState(false)
  const [DeleteAnnouncementId, setDeleteAnnouncementId] = useState([])
  const [loadingDelete, setloadingDelete] = useState(false)

  const OpneEditAnnouncement = (_id) => {
    setEditAnnouncement(true)
    setEditAnnouncementId(_id)
  }

  const ClaseEditAnnouncement = () => {
    setEditAnnouncement(false)
  }

  const OpneDeleteAnnouncement = (_id) => {
    setDeleteAnnouncement(true)
    setDeleteAnnouncementId(_id)
  }

  const ClaseDeleteAnnouncement = () => {
    setDeleteAnnouncement(false)
  }

  const DeleteClick = () => {
    const _id = DeleteAnnouncementId
    DeleteAnnouncementDele(_id, ClaseDeleteAnnouncement, Fdata, setloadingDelete)
  }

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
                <h1 className='font-semibold md:text-2xl text-md'>Announcement</h1>
                <Button type="button" Btn_Name="Create Announcement" onClick={() => setAddAnnouncement(true)} />
                {AddAnnouncement && (
                  <AddAnnouncementModal Fdata={Fdata} ClaseAddAnnouncement={ClaseAddAnnouncement} />
                )}
              </div>
              <div>
                {Loding ? (
                  <div className='flex justify-center'>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                </div>
                ) : (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
                  {getAnnouncement.map((e, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md relative">
                      <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">{e.title}</h2>
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
                                <li onClick={() => OpneEditAnnouncement(e._id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                  Edit
                                </li>
                                <li onClick={() => OpneDeleteAnnouncement(e._id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                  Delete
                                </li>
                              </ul>
                            </div>
                          )}

                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mb-4 p-2">
                        <div className="text-sm text-gray-500 flex items-center justify-between">
                          Upcoming Schedule Service Date
                          <span className="ml-1 text-base font-semibold text-gray-700">
                            {new Date(e.date).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Description
                          <p className="text-black text-sm">{e.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                ) }
                
              </div>
              {EditAnnouncement && (
                <EditAnnouncementModal _id={EditAnnouncementId} ClaseEditAnnouncement={ClaseEditAnnouncement} LodaData={Fdata} />
              )}
              {DeleteAnnouncement && (
                <DeleteLoding loading={loadingDelete} DeleteClick={DeleteClick} close={ClaseDeleteAnnouncement} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Announcement
