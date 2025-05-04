import React, { useState } from 'react'
import Header from '../../layout/Header'
import Sidenav from '../../layout/Sidebar'
import { FaFileAlt } from 'react-icons/fa';

const Tenant = () => {
    const [activeTab, setActiveTab] = useState("Owner");

  const details = {
    Owner: {
      name: "Arlene McCoy",
      phone: "+91 9575225165",
      address: "C-101, Dhara Arcade, Mota Varachha Surat",
    },
    Tenant: {
      name: "John Doe",
      phone: "+91 9876543210",
      address: "B-202, Skyline Tower, City Center",
    },
  };

  const data = details[activeTab];

  const [members] = useState([
    {
      name: 'Arlene McCoy',
      email: 'Arlenemccoy@gmail.com',
      phone: '+91 99130 52221',
      age: 22,
      gender: 'Male',
      relation: 'Brother',
    },
    {
      name: 'Arlene McCoy',
      email: 'BrooklynSimmons@gmail.com',
      phone: '+91 99233 66134',
      age: 22,
      gender: 'Male',
      relation: 'Uncle',
    },
    {
      name: 'Arlene McCoy',
      email: 'JennyWilson@gmail.com',
      phone: '+91 99130 52221',
      age: 22,
      gender: 'Male',
      relation: 'Sister',
    },
    {
      name: 'Arlene McCoy',
      email: 'JaneCooper@gmail.com',
      phone: '+91 99130 52221',
      age: 22,
      gender: 'Male',
      relation: 'Mother',
    },
  ]);

  const [vehicles] = useState([
    {
      type: 'Two Wheelers',
      VehicleName: 'Splendor',
      VehicleNumber: 'GJ-5216',
    },
    {
      type: 'Four Wheelers',
      VehicleName: 'Fortuner',
      VehicleNumber: 'GJ-5216',
    },
    {
      type: 'Two Wheelers',
      VehicleName: 'Splendor',
      VehicleNumber: 'GJ-5216',
    },
    {
      type: 'Two Wheelers',
      VehicleName: 'Splendor',
      VehicleNumber: 'GJ-5216',
    },
  ]);
  const Pending = [
    {
      billDate: "11/01/2024",
      pendingDate: "11/01/2024",
      maintenanceAmount: 1000,
      penaltyAmount: 250,
      totalAmount: 1250,
    },
    {
      billDate: "11/01/2024",
      pendingDate: "11/01/2024",
      maintenanceAmount: 1000,
      penaltyAmount: 250,
      totalAmount: 1250,
    },
    {
      billDate: "11/01/2024",
      pendingDate: "11/01/2024",
      maintenanceAmount: 1000,
      penaltyAmount: 250,
      totalAmount: 1250,
    },
  ];
  const duePending =[
    {
      Date: "11/01/2024",
      Amount: 1000,
      dueAmount: 250,
    }, {
      Date: "11/01/2024",
      Amount: 1000,
      dueAmount: 250,
    }
  ];
  const Announcement =[
    {
      Date: "11/01/2024",
      Time:"8:15 PM",
      name: "Annual Maintenance",
      Description: "All vehicles should be checked and serviced annually.",
    }, {
      Date: "11/01/2024",
      Time:"9:55 AM",
      name: "Annual Maintenance",
      Description: "All vehicles should be checked and serviced annually.",
    }
  ]

    return (
    <div>

      {/* Data Display Section */}
        <div className="p-6 bg-white rounded-lg shadow ">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 font-semibold">
              <th className="p-2">Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-700">
              <td className="p-2">{data.name}</td>
              <td className="p-2">{data.phone}</td>
              <td className="p-2">{data.address}</td>
            </tr>
          </tbody>
        </table></div>

  {/* Profile Section */}
        <div className="bg-white p-6 shadow rounded-md mt-5" >
      {/* Left Section: Profile Picture and Info */}
    <div className="flex flex-wrap gap-6 items-center justify-between">
      <div className="flex flex-wrap items-center gap-6">
        <img
          src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770800/shfpe3pccvr5qrpuldzh.png"
          alt="Profile"
          className="rounded-full w-24 h-24 md:w-36 md:h-36 border border-gray-300"
        />
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
            {[
              ["Full Name", "Arlene McCoy"],
              ["Phone Number", "+91 99130 44537"],
              ["Email Address", "arlenemccoy@gmail.com"],
              ["Gender", "Male"],
              ["Wing", "A"],
              ["Age", "20"],
              ["Unit", "1001"],
              ["Relation", "Father"],
            ].map(([label, value]) => (
              <p key={label}>
                <span className="font-medium">{label}:</span> <br />
                <span>{value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Documents */}
      <div className="space-y-3 flex-1 max-w-sm">
        {[
          ["Syncfusion Essential Adharcard Front Side.JPG", "3.5 MB"],
          ["Address Proof Front Side.PDF", "3.5 MB"],
        ].map(([fileName, size], index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 border rounded-md"
          >
            <FaFileAlt className="text-blue-500" />
            <div>
              <p>{fileName}</p>
              <p className="text-xs text-gray-500">{size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Sections: Members, Vehicles, etc. */}
  {[{ title: "Member", items: members }, { title: "Vehicle", items: vehicles }].map(({ title, items }, sectionIndex) => (
    <div key={sectionIndex} className="bg-white p-6 shadow rounded-md mt-8">
      <h2 className="text-lg font-semibold mb-4">
        {title}: ({items.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
              <h2 className="text-lg font-semibold text-white">
                {item.name || item.type}
              </h2>
            </div>
            <div className="p-2">
              {Object.entries(item).map(
                ([key, value]) =>
                  key !== "name" && key !== "type" && (
                    <p key={key} className="text-sm text-gray-600 mb-1">
                      <strong>{key}:</strong> {value} 
                    </p>
                    
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}

    {/* Maintenance Details */}
    <div className="flex flex-wrap lg:flex-nowrap items-center justify-between p-4 mb-4 bg-white rounded-lg space-y-4 lg:space-y-0 mt-6">
  <h2 className="text-2xl font-semibold flex-grow lg:flex-grow-0">Show Maintenance Details</h2>
  <div className="flex flex-wrap lg:flex-nowrap gap-4">
    {[
      ["Maintenance Amount", "₹ 1500", "border-green-500", "text-green-500" ,"bg-green-50" ,"mix-blend-multiply"],
      ["Penalty Amount", "₹ 500", "border-red-500", "text-red-500"  ,"bg-red-50" ,"mix-blend-multiply"],
    ].map(([label, value, borderClass, textClass, bgClass]) => (
      <div
        key={label}
        className={`p-4 rounded-lg shadow-lg border-r-4  border-2-4 ${borderClass} w-full lg:w-60 flex-shrink-0 relative ${bgClass}`}
      >
        <div
          className={`h-10 w-2 absolute top-1/2 left-0 border-r-4 transform  -translate-y-1/2  bg-opacity-50 rounded-full`}
        ></div>
        <h3 className="text-gray-600 font-medium">{label}</h3>
        <p className={`font-bold text-2xl ${textClass}`}>{value}</p>
      </div>
    ))}
  </div>
</div>


    {/* Pending and Due Maintenance */}
    {[{ title: "Pending Maintenance", data: Pending }, { title: "Due Maintenance", data: duePending }].map(({ title, data }, index) => (
    <div key={index} className="bg-white p-4 rounded-lg mt-5">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center p-2 rounded-t-lg bg-[#5678e9]">
              <h2 className="text-lg font-semibold text-white">
                Maintenance
              </h2>
              <span className="text-sm bg-blue-700 text-white py-1 px-3 rounded-full">
                Pending
              </span>
            </div>
            <div className="mt-4 text-gray-700 p-2">
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="flex justify-between mt-2">
                  <span>{key}</span>
                  <span>₹ {typeof value === "number" ? value.toFixed(2) : value}</span>
                </div>
              ))}
              <button className="mt-4 w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-2 rounded-lg shadow hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-blue-300 transition-all duration-200">
  Pay Now
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}

        {/* Announcements */}
<div className="bg-white p-6 shadow rounded-md mt-5">
  <h2 className="text-xl md:text-2xl font-semibold mb-4">Announcements</h2>
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {Announcement.map((Annou, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-md relative border border-gray-200"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center rounded-t-lg p-2 bg-[#5678e9]">
          <h2 className="text-lg font-semibold text-white">{Annou.name}</h2>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Date:</strong> {Annou.Date}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Time:</strong> {Annou.Time}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Description:</strong> <span>{Annou.Description}</span>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    )
}

export default Tenant
