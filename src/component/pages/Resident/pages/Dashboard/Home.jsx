import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import Home_totle_card from "../../../../layout/Home_totle_card";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineAttachMoney } from "react-icons/md";
import TotalBalanceChart from "../../../../layout/TotalBalanceChart";
import {
  
  GetAnnouncement,
  Facility_Management_Get,
  GetComplainy,
  ImportantNumbersGet,
} from "../../../../services/Api/api";
import axios from "axios";
import { Get_Profile_img,Get_Pending_Maintenances,GetComplaint } from "../../Api/api";
import useSidbarTogal from "../../../../layout/useSidbarTogal";
import {
  MdAccountBalanceWallet,
  MdMoneyOff,
  MdPrecisionManufacturing,
} from "react-icons/md";
import { GetMaintenance } from "../../../Resident/Api/api";


const url = "https://sms-backend-blue.vercel.app";
// const url = "https://civicnest-backend.onrender.com";

// Axios interceptor to add Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen });

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState("");

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    ImportantNumbersGet(setContacts, setLoading);
  };

 // Fetch maintenance status
 useEffect(() => {
  getMaintenanceStatus();
}, []);

const getMaintenanceStatus = async () => {
  try {
    const response = await axios.get(`${url}/maintenance/getMaintenanceStatus`);
    setMaintenanceData({
      paid: response.data.paid || [],
      pending: response.data.pending || [],
    });
  } catch (err) {
    console.error("Error fetching maintenance status:", err);
  }
};

// Razorpay payment function
const payment = async (maintenanceData) => {
  try {
    // Fetch the Razorpay key from the backend
    const { data: keydata } = await axios.get(`${url}/payment/razorpay/key`);
    const { key } = keydata;
    console.log("Razorpay Key:", key);

    // Construct the payload for the backend API
    const payload = {
      amount: maintenanceData.Maintenance_Amount,
      paymentType: "Maintenance",
      incomeId: maintenanceData._id,
      paymentMethod: "online",
    };
    console.log("🚀 ~ payment ~ payload:", payload)

    // Make a request to backend to create the payment order
    const response = await axios.post(`${url}/payment/create`, payload);
    console.log("Backend Response:", response.data);

    // Initialize Razorpay options
    const options = {
      key: key,
      amount: maintenanceData.Maintenance_Amount * 100, // Convert to paise
      currency: "INR",
      name: "Your Society Name",
      description: "Maintenance Payment",
      order_id: response.data.order.id,
      callback_url: `${url}/payment/verifypayment/${response.data.paymentRecord._id}`,
      prefill: {
        name: FormData.Fullname || "User Name",
        email: FormData.Email || "user@example.com",
        contact: FormData.Phone || "9999999999",
      },
      theme: {
        color: "#5678e9",
      },
    };

    // Initialize and open Razorpay payment modal
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Error processing payment:", err);
  }
};


  // Pending Maintenances

  const [PendingData, setPendingData] = useState("");

  useEffect(() => {
    GetPendMain();
  }, []);

  const GetPendMain = () => {
    Get_Pending_Maintenances(setPendingData);
  };

  // get complaint List

  useEffect(() => {
    getComplaintdata();
  }, []);

  const [filter, setFilter] = useState("Month");

  let [getComplaint, setgetComplaint] = useState([]);
  const [loadingcomplaint, setloadingcomplaint] = useState(true);
  const getComplaintdata = () => {
    GetComplaint(setgetComplaint, setloadingcomplaint);
  };

  const filterComplaints = () => {
    const now = new Date();
    return getComplaint.filter((e) => {
      const complaintDate = new Date(e.createdAt);
      switch (filter) {
        case "Day":
          return now.toDateString() === complaintDate.toDateString();
        case "Week":
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return complaintDate >= weekAgo && complaintDate <= now;
        case "Month":
          return (
            complaintDate.getMonth() === now.getMonth() &&
            complaintDate.getFullYear() === now.getFullYear()
          );
        default:
          return true;
      }
    });
  };

  const [activities, setActivities] = useState([]);
  const [facility, setFacility] = useState([]);
  const [Loding, setLoding] = useState(true);

  useEffect(() => {
    fetchActivities();
    fetchFacility();
  }, []);

  const fetchActivities = async () => {
    GetAnnouncement(setActivities, setLoding);
  };

  const fetchFacility = async () => {
    Facility_Management_Get(setFacility, setLoding);
  };

  const getFirstLetter = (title) => {
    return title ? title.charAt(0).toUpperCase() : ""; // Get the first letter and capitalize it
  };
  // maintance

  const [maintenanceData, setMaintenanceData] = useState([]);
const [loadingMaintenance, setLoadingMaintenance] = useState(true);

useEffect(() => {
  GetMaintenance((data) => {
    console.log("Maintenance Data:", data); // 👀 log here
    setMaintenanceData(data);
    setLoadingMaintenance(false);
  });
}, []);


  const [FormData, setFormData] = useState({ members: [], vehicles: [] })

  useEffect(() => {
    VFdata();
  }, []);

  const VFdata = () => {
    Get_Profile_img((data) => {
      setFormData(data || { members: [], vehicles: [] });
    });
  };

  return (
    <div className="bg-[#f0f5fb] h-full">
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" className={`ml-[${getdata}px] max-[426px]:ml-0`}>
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <div className="flex-1 space-y-6 p-6">
          <div className="grid xl:grid-cols-4 grid-cols-1 gap-4">
           <div className="bg-white xl:col-span-3 rounded-lg shadow">
  <div className="bg-white rounded-lg p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg text-blue-600 font-semibold">
        Complaint List
      </h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Month">Month</option>
        <option value="Week">Week</option>
        <option value="Day">Day</option>
      </select>
    </div>

    <div className="overflow-x-auto h-32 px-2">
      {loadingcomplaint ? (
        <div className="flex justify-center h-full items-center pb-10">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
        </div>
      ) : filterComplaints().length === 0 ? (
        <div className="flex justify-center items-center h-full py-6 text-gray-500 text-sm">
          No complaints found for selected filter. Everything seems fine!
        </div>
      ) : (
        <table className="min-w-full text-left rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#eef1fd] text-gray-700">
              <th className="px-4 py-2">Complainer Name</th>
              <th className="px-4 py-2">Complaint Name</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2 text-center">Priority</th>
              <th className="px-4 py-2 text-center">Complain Status</th>
            </tr>
          </thead>
          <tbody>
            {filterComplaints().map((e, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 flex items-center space-x-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770799/bl9awma4kwu1d9tdrakp.png"
                    alt="profile"
                  />
                  <span>{e.Complainer_Name}</span>
                </td>
                <td className="px-4 py-2">{e.Complaint_Name}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(e.createdAt).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-md font-medium flex justify-center ${
                      e.Priority === "High"
                        ? "bg-[#e74c3c] text-white"
                        : e.Priority === "Medium"
                        ? "bg-[#5678e9] text-white"
                        : e.Priority === "Low"
                        ? "bg-[#39973d] text-white"
                        : ""
                    }`}
                  >
                    {e.Priority}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-md font-medium flex justify-center ${
                      e.Status === "Open"
                        ? "bg-[#eef1fd] text-[#5678e9]"
                        : e.Status === "Pending"
                        ? "bg-[#fff9e7] text-[#ffc313]"
                        : e.Status === "Solve"
                        ? "bg-[#ebf5ec] text-[#39973d]"
                        : ""
                    }`}
                  >
                    {e.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
</div>

            <div className="bg-white p-4 rounded-xl shadow">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-blue-600">
      My Vehicle : ({FormData?.vehicles?.length ?? 0})
    </h2>
  </div>

  <div className="space-y-4">
    {FormData.vehicles?.map((e, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-md p-3 shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
      >
        <span className="inline-block bg-[#5678e9] text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
          {e.type}
        </span>

        <div className="space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-medium text-gray-800">Vehicle Name:</span> {e.name}
          </p>
          <p>
            <span className="font-medium text-gray-800">Vehicle Number:</span> {e.number}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg col-span-1">
              <div className=" bg-white rounded-lg">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg text-blue-600 font-semibold">
                    Important Numbers
                  </h2>
                </div>
                <div className="space-y-4 h-80 overflow-y-auto pr-2">
                  {loading ? (
                    <div className="flex justify-center h-full items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {contacts.map((contact) => (
                        <div
                          key={contact._id}
                          className="border border-gray-200 rounded-md p-3 shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
                        >
                          <div>
                            <p className="text-sm text-blue-400">
                              Name :{" "}
                              <span className="text-black capitalize font-semibold">
                                {contact.Fullname}
                              </span>
                            </p>
                            <p className="text-sm text-blue-400">
                              Phone Number :{" "}
                              <span className="text-black capitalize font-semibold">
                                {contact.Phonenumber}
                              </span>
                            </p>
                            <p className="text-sm text-blue-400">
                              Work :{" "}
                              <span className="text-black capitalize font-semibold">
                                {contact.Work}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-4 col-span-1">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-lg text-blue-600 font-semibold">Maintenances Details</h2>
    <a href="https://sms-peach-gamma.vercel.app/resident/personal_detail" className="text-blue-500 hover:underline text-sm font-medium">
      View All
    </a>
  </div>

  {/* Sections: Pending then Paid */}
  {[
    { title: "Pending Maintenance", data: maintenanceData.pending, isPaid: false },
    { title: "Paid Maintenance", data: maintenanceData.paid, isPaid: true },
  ].map(({ title, data, isPaid }, index) => (
    <div key={index} className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>

      <div className="flex flex-col space-y-3 overflow-y-auto max-h-[260px] pr-2">
        {data &&
          Array.isArray(data) &&
          data.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-md p-3 shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Maintenance Amount</span>
                <span className="text-sm font-semibold text-gray-900">
                  ₹ {item.Maintenance_Amount?.toFixed(2) || "0.00"}
                </span>
              </div>

              {!isPaid && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Due Date</span>
                  <span className="text-sm text-gray-800">
                    {new Date(item.Maintenance_Due_Date).toLocaleDateString("en-IN")}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Status</span>
                <span className={`text-xs font-semibold py-1 px-2 rounded ${
                  isPaid ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              {!isPaid && (
                <button
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md transition"
                  onClick={() => payment(item)}
                >
                  Pay Now
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  ))}
</div>










            <div className="bg-white p-4 rounded-lg shadow-lg col-span-1">
              <div className=" bg-white rounded-lg">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg text-blue-600 font-semibold">
                    Upcoming Bookings
                  </h2>

                </div>
                <div className="mt-6">
  {loading ? (
    <div className="flex justify-center h-full items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400" />
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4 max-h-[24rem] overflow-y-auto pr-2">
      {facility.map((facility) => (
        <div
          key={facility._id}
          className="border border-gray-200 rounded-md p-3 shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Facility Name</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{facility.Facility_Name}</p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="text-sm text-gray-400">Description</span>
            </div>
            <p className="text-base text-gray-700">{facility.Description}</p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="text-sm text-gray-400">Scheduled Date</span>
            </div>
            <p className="text-base text-gray-700">
              {new Date(facility.Schedule_Service_Date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg col-span-1">
              <div className=" bg-white rounded-lg">
                
        <h2 className="text-lg text-blue-600 font-semibold mb-4">Upcoming Activity</h2>
                <div className="border border-gray-200 rounded-md p-3 shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
    
      {Loding ? (
                  <div className='flex justify-center'>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                </div>
                ): (
        <div className="space-y-4">
          {/* Dynamically render each activity item */}
          {activities.map((activity, index) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex items-center space-x-3">
                {/* Use different colors for different activities based on type */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    activity.color ? `bg-${activity.color}-100` : 'bg-slate-200'
                  }  'gray-600' font-bold`}
                >
                  {getFirstLetter(activity.title)}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{activity.title}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm"> {new Date(activity.date).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}</p>
            </div>
          ))}
        </div>
     
            ) }
    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;