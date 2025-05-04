import React, { useEffect, useState } from 'react'
import Sidebar from '../../layout/Sidebar'
import Header from '../../layout/Header'
import { FaUser } from 'react-icons/fa';
import { Get_Security_Protocols } from '../../../../services/Api/api';
import useSidbarTogal from '../../../../layout/useSidbarTogal';

const Security_Protocols = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen })

  const [Security, setSecurity] = useState([])
  const [loding, setloding] = useState(true)

  useEffect(() => {
    Fdata()
  }, [])

  const Fdata = () => {
    Get_Security_Protocols(setSecurity, setloding)
  }
  return (
    <div className='bg-[#f0f5fb] h-screen'>
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id='main' className={`ml-[${getdata}px] max-[426px]:ml-0`} >
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <div className="p-6 rounded-lg ">
          <div className="overflow-x-auto bg-white p-4 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 max-[426px]:text-xl">Security Protocols</h2>
            {loding ? (
              <div className='flex justify-center'>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
              </div>
            ) : (
              <table className="min-w-full bg-[#eef1fd] rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b font-medium text-left">
                      Title
                    </th>
                    <th className="px-6 py-3 border-b font-medium text-left">
                      Description
                    </th>
                    <th className="px-6 py-3 border-b font-medium ">
                      Date
                    </th>
                    <th className="px-6 py-3 border-b font-medium ">
                      Time
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
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Security_Protocols
