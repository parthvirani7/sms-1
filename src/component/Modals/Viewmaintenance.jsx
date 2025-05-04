import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { FaCheckCircle, FaRupeeSign, FaUser } from 'react-icons/fa';
import { HiOutlineCash } from 'react-icons/hi';
import { IoMdWallet } from 'react-icons/io';
import { MdOutlinePendingActions } from 'react-icons/md';

const profileImage = 'https://via.placeholder.com/150';

const ViewMaintenance = ({ close, id }) => {

  const [udata, setudata] = useState([])

  useEffect(() => {
    axios.get(`https://civicnest-backend.onrender.com/Maintenance/${id}`).then((res) => {
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setudata(data);
    })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);


  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}>
      <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-lg font-semibold">View Maintenance Details</h1>
          <button type="button" className="text-gray-600 hover:text-gray-800 text-2xl" onClick={close}> &times; </button>
        </div>
        {udata.map((e, index) => {
          return (
            <div key={index}>
              <div className="flex px-2 flex-col sm:flex-row items-center justify-center sm:justify-start">
                <img src={e.img} alt="Profile" className="w-12 h-12 rounded-full mx-2" />
                <div className='sm:ml-4 my-5'>
                  <h3 className="font-semibold">{e.name}</h3>
                  <p className="text-[#a7a7a7] text-sm">{e.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 px-2">
                <div className="flex flex-col items-center border-r-2 border-gray-300">
                  <span className="font-semibold text-[#a7a7a7]">Wing</span>
                  <span className="bg-gray-100 text-[#5678e9] font-bold text-sm rounded-full w-7 h-7 flex items-center justify-center">
                    A
                  </span>
                </div>
                <div className="flex flex-col items-center border-r-2 border-gray-300">
                  <span className="font-semibold text-[#a7a7a7]">Unit</span>
                  <span className="font-semibold text-gray-900">{e.unit_Num}</span>
                </div>
                <div className="flex flex-col items-center border-r-2 border-gray-300">
                  <span className="font-semibold text-[#a7a7a7]">Status</span>
                  {e.status === 'Owner' ? (
                    <span className="px-2 py-1 text-sm flex justify-center items-center gap-1 rounded-full font-medium text-[#4f46e5] bg-[#f1f0ff]">
                      <BsPersonBoundingBox className='text-sm' />Owner
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-sm flex justify-center items-center gap-1 rounded-full font-medium text-[#ec4899] bg-[#fff1f8]">
                      <FaUser className='text-sm' /> Tenant
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-semibold text-[#a7a7a7]">Amount</span>
                  <span className="flex items-center font-semibold text-green-600">
                    <FaRupeeSign />
                    {e.amount}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3 pb-4 px-2">
                <div className="flex flex-col items-center border-r-2 border-gray-300 sm:pr-4">
                  <span className="font-semibold text-[#a7a7a7]">Penalty</span>
                  <span className="bg-gray-100 text-gray-600 font-bold text-lg rounded-full w-10 h-10  flex items-center justify-center">
                    -
                  </span>
                </div>

                <div className="flex flex-col items-center border-r-2 border-gray-300 sm:px-4">
                  <span className="font-semibold text-[#a7a7a7] pb-1">Status</span>
                  <span className="flex items-center font-semibold">
                    {e.paymentstatus === 'Pending' ? (
                      <span className="px-2 py-1 flex justify-center items-center gap-1 rounded-full font-medium bg-[#fff9e7] text-[#ffc313]">
                        <MdOutlinePendingActions /> Pending
                      </span>
                    ) : (
                      <span className="px-2 py-1 flex justify-center items-center gap-1 rounded-full font-medium bg-[#ebf5ec] text-[#39973d]">
                        <FaCheckCircle /> Done
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[#a7a7a7] font-semibold">Payment</span>
                  <span className="flex items-center text-black font-semibold px-2 py-1 rounded-lg">
                    {e.paymentMethod === 'Online' ? (
                      <span className="px-2 py-1 font-semibold flex justify-center items-center gap-1 rounded-full font-medium bg-[#eef1fd] text-[#5678e9]">
                        <IoMdWallet /> Online
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold flex justify-center items-center gap-1 rounded-full font-medium bg-[#f4f4f4] text-[#202224]">
                        <HiOutlineCash /> Cash
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ViewMaintenance;
