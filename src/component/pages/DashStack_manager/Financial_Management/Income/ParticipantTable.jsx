import React, { useState } from 'react';
import Sidebar from '../../../../layout/Sidebar';
import Header from '../../../../layout/Header';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { HiOutlineCash } from 'react-icons/hi';
import { IoMdWallet } from 'react-icons/io';
import useSidbarTogal from '../../../../layout/useSidbarTogal';

const participants = [
  { unit: 'A 1001', date: '10/07/2024', status: 'Owner', phone: '92524 12365', amount: '₹ 1000', payment: 'Cash' },
  { unit: 'B 1002', date: '11/07/2024', status: 'Tenant', phone: '92458 12865', amount: '₹ 1000', payment: 'Online' },
  { unit: 'C 1003', date: '12/07/2024', status: 'Owner', phone: '92524 12365', amount: '₹ 1000', payment: 'Cash' },
  { unit: 'D 1004', date: '14/07/2024', status: 'Tenant', phone: '92458 12865', amount: '₹ 1000', payment: 'Online' },
  { unit: 'E 1005', date: '17/07/2024', status: 'Tenant', phone: '92458 12865', amount: '₹ 1000', payment: 'Online' },
  // Additional data...
];

const ParticipantTable = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);

  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})

  return (
    <div>
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id='main' className={`ml-[${getdata}px] max-[425px]:ml-0`}>
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>

        {/* Main Content */}
        <div className="maain p-4 bg-white">
          <div className="p-4 bg-slate-50 rounded-lg mt-5 shadow-lg overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">Ganesh Chaturthi Participator Member List</h1>
            <table className="w-full table-auto border-collapse">
              <thead className=" bg-blue-100 text-gray-700 justify-around 'rounded-t-full">
                <tr className='rounded-t-full '>
                  <th className="px-8 py-2 text-left">Unit Number</th>
                  <th className="px-8 py-2 text-left">Date</th>
                  <th className="px-8 py-2 text-left">Status</th>
                  <th className="px-8 py-2 text-left">Phone Number</th>
                  <th className="px-8 py-2 text-left">Amount</th>
                  <th className="px-8 py-2 text-left">Payment</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-left">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600">{item.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-left">{item.date}</td>
                    <td className="px-3 py-3 text-center">
                      {item.status === 'Owner' ? (
                        <span className="px-2 py-1 flex items-center justify-center w-full sm:w-36 rounded-full text-blue-700 bg-blue-100">
                          <FaUser /> Owner
                        </span>
                      ) : (
                        <span className="px-2 py-1 flex items-center justify-center w-full sm:w-36 rounded-full text-pink-700 bg-pink-100">
                          <BsPersonBoundingBox /> Tenant
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-left">{item.phone}</td>
                    <td className="px-4 py-3 text-green-600 font-bold text-left">{item.amount}</td>
                    <td className="px-4 py-3 text-center">
                      {item.payment === 'Online' ? (
                        <span className="px-2 py-1 flex items-center justify-center  w-full sm:w-36 rounded-full bg-blue-100 text-blue-600">
                          <IoMdWallet /> Online
                        </span>
                      ) : (
                        <span className="px-2 py-1 flex items-center justify-center w-full sm:w-36 rounded-full bg-gray-200 text-gray-600">
                          <HiOutlineCash /> Cash
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantTable;
