import React, { useEffect, useState } from "react";
import Sidebar from "../../../layout/Sidebar";
import Header from "../../../layout/Header";
import OpenResidenceStatusModal from "../../../Modals/OpenResidenceStatusModal";
import { FaEdit, FaUser } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import View_Owner_Details_Modal from "../../../Modals/View_Owner_Details_Modal";
import useSidbarTogal from "../../../layout/useSidbarTogal";
import { GetResident } from "../../../services/Api/api";
import { RiShieldUserFill } from "react-icons/ri";

const Resident_Management = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);

  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen })

  const [Sumdata, setSumdata] = useState([])

  useEffect(() => {
    Fdata()
  }, [])

  const Fdata = () => {
    GetResident(setSumdata)
  }

  const [showResidenceStatus, setShowResidenceStatus] = useState(false);

  const OpenResidenceStatus = () => {
    setShowResidenceStatus(true);
  };
  const CloseResidenceStatus = () => {
    setShowResidenceStatus(false);
  };

  const [View_Owner_Details, setView_Owner_Details] = useState(false)
  const [Owner_DetailsId, setOwner_DetailsId] = useState([])
  
  const OpneView_Owner_Details = (_id) => {
    setView_Owner_Details(true);
    setOwner_DetailsId(_id);
  }
  const closeModal = () => {
    setView_Owner_Details(false);
  };

  return (
    <div>
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" className={`ml-[${getdata}px] max-[425px]:ml-0`}>
        <div className="open_he"><Header toggleNav={toggleNav} /></div>
        {/* Main Content */}
        <div className="flex-1 bg-[#f0f5fb]">
          <div className="p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold md:text-2xl text-md">
                  Resident Tenant and Owner Details
                </h1>
                <button
                  onClick={OpenResidenceStatus}
                  className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg transition duration-200"
                >
                  Add New Resident details
                </button>
                {showResidenceStatus && (
                  <OpenResidenceStatusModal
                    setShowResidenceStatus={CloseResidenceStatus}
                  />
                )}
              </div>
              <div className="overflow-auto max-h-svh">
                <table className="min-w-full bg-[#eef1fd] rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b font-medium text-black">
                        Full Name
                      </th>
                      <th className="px-6 py-3 border-b font-medium text-black">
                        Unit Number
                      </th>
                      <th className="px-6 py-3 border-b font-medium text-black">
                        Unit Status
                      </th>
                      <th className="px-6 py-3 border-b font-medium text-black">
                        Resident Status
                      </th>
                      <th className="px-6 py-3 border-b font-medium text-black">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 border-b font-medium text-black">
                        Member
                      </th>
                      <th className="px-6 py-3 border-b font-medium text-black">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 border-b font-medium text-black">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Sumdata.map((e, index) => (
                      <tr key={index} className="border-b bg-white hover:bg-gray-50 font-medium text-center md:font-semibold overflow-x-scroll">
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex items-center">
                          <img className="w-8 h-8 rounded-full mr-1" src={e.residentphoto} alt="profile" />
                          <span>{e.Fullname}</span>
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">
                          <samp className=' px-2 py-1 text-[#5678e9] bg-[#f6f8fb] mr-2 rounded-full'>{e.Wing}</samp>
                          {e.Unit}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700"><span
                          className={`px-2 py-1 rounded-lg text-sm flex justify-center ${e.UnitStatus === "Occupied"
                            ? "bg-green-100 text-green-600"
                            : e.UnitStatus === "Vacate" ? " bg-[#fff6ff] text-[#9333ea" : ""
                            }`}
                        >
                          {e.UnitStatus === "Occupied" && <img src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770799/puoewxxhgj0kia2qne5q.png" className="mr-1" />}
                          {e.UnitStatus === "Vacate" && <img src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770798/k2zvlds1skcfrevuvvrs.png" className="mr-1" />}
                          {e.UnitStatus}
                        </span></td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700"><span
                          className={`px-2 py-1 rounded-lg text-sm flex justify-center items-center font-semibold ${e.ResidentStatus === "Tenant"
                            ? "bg-[#fff1f8] text-[#ec4899]"
                            : e.ResidentStatus === "Owner"
                              ? "bg-[#f1f0ff] text-[#4f46e5]"
                              : ""
                            }`}
                        >
                          {e.ResidentStatus === "Tenant" && <FaUser className='mr-1 text-lg' />}
                          {e.ResidentStatus === "Owner" && <RiShieldUserFill className='mr-1 text-lg' />}
                          {e.ResidentStatus}
                        </span></td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">{e.Phone}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">
                        {e?.members?.length || "0"}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">
                        {e?.vehicles?.length || "0"}
                        </td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex space-x-1 md:space-x-2 justify-evenly">
                          <button onClick={() => OpneEdit_Owner_Details(e._id)} className="bg-[#f6f8fb] text-[#39973d] px-3 py-1 rounded-lg mr-2">
                            <FaEdit />
                          </button>
                          <button onClick={() => OpneView_Owner_Details(e._id)} className="bg-[#f6f8fb] text-[#5678e9] text-2xl px-1 py-1 rounded-lg">
                            <GrFormView />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <View_Owner_Details_Modal _id={Owner_DetailsId} View_Owner_Details={View_Owner_Details} closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resident_Management;
