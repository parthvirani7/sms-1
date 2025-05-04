import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import axios from "axios";
import { FaFileAlt } from "react-icons/fa";
import Tenant from "./Tenant";
import useSidbarTogal from "../../../../layout/useSidbarTogal";
import {
  AnnouncementGet,
  Get_Profile_img,
} from "../../Api/api";

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

const Personal_Detail = () => {
  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen });

  const [activeTab, setActiveTab] = useState("Owner");
  const [FormData, setFormData] = useState({ members: [], vehicles: [] });
  const [Announcement, setAnnouncement] = useState();
  const [maintenanceData, setMaintenanceData] = useState({
    paid: [],
    pending: [],
  });

  // Fetch profile data
  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    Get_Profile_img((data) => {
      setFormData(data || { members: [], vehicles: [] });
    });
  };

  // Fetch announcements
  useEffect(() => {
    AnnGET();
  }, []);

  const AnnGET = () => {
    AnnouncementGet(setAnnouncement);
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

  return (
    <div className="bg-[#f0f5fb] h-screen">
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" className={`ml-[${getdata}px] max-[425px]:ml-0`}>
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* Tabs Section */}
          <div className="flex flex-wrap">
            <button
              className={`py-2 px-8 font-semibold text-center rounded-t-lg border-b-2 border-b-blue-500 ${
                activeTab === "Owner"
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setActiveTab("Owner")}
            >
              Owner
            </button>
            <button
              className={`py-2 px-8 font-semibold text-center rounded-t-lg border-b-2 border-b-blue-500 ${
                activeTab === "Tenant"
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setActiveTab("Tenant")}
            >
              Tenant
            </button>
          </div>
          {activeTab === "Owner" && (
            <div>
              {/* Profile Section */}
              <div className="bg-white p-6 shadow rounded-md">
                <div className="flex flex-wrap gap-6 items-center justify-between max-[425px]:flex-col">
                  <div className="flex flex-wrap items-center gap-6 max-[425px]:flex-col">
                    <img
                      src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770800/shfpe3pccvr5qrpuldzh.png"
                      alt="Profile"
                      className="rounded-full w-24 h-24 md:w-36 md:h-36 border border-gray-300"
                    />
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
                        {[
                          ["Full Name", FormData.Fullname || ""],
                          ["Phone Number", FormData.Phone || ""],
                          ["Email Address", FormData.Email || ""],
                          ["Gender", FormData.Gender || ""],
                          ["Wing", FormData.Wing || ""],
                          ["Age", FormData.Age || ""],
                          ["Unit", FormData.Unit || ""],
                          ["Relation", FormData.Relation || ""],
                        ].map(([label, value]) => (
                          <p key={label}>
                            <span className="font-medium">{label}:</span> <br />
                            <span className="text-[#a7a7a7]">{value}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 flex-1 max-w-sm">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border rounded-md max-[425px]:w-[14px]">
                      <FaFileAlt className="text-blue-500" />
                      <div>
                        <p>Front Side</p>
                        <p className="text-xs text-gray-500">img size</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border rounded-md max-[425px]:w-[14px]">
                      <FaFileAlt className="text-blue-500" />
                      <div>
                        <p>Back Side</p>
                        <p className="text-xs text-gray-500">img size</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Members Section */}
              <div className="bg-white p-4 rounded-lg mt-5">
                <p className="mb-3 font-semibold text-lg">
                  Member : ({FormData?.members?.length ?? 0})
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {FormData.members?.map((e, index) => (
                    <div
                      className="bg-white shadow-md rounded-md relative"
                      key={index}
                    >
                      <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">
                          {e.fullName}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2 mb-4 p-2">
                        <div className="text-sm text-gray-500 flex justify-between">
                          Email
                          <span className="ml-2 text-base font-semibold text-gray-700">
                            {e.email}
                          </span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Phone Number
                          <span className="text-black">{e.phone}</span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Age
                          <span className="text-black">{e.age}</span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Gender
                          <span className="text-black">{e.gender}</span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Relation
                          <span className="text-black">{e.Relation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicles Section */}
              <div className="bg-white p-4 rounded-lg mt-5">
                <p className="mb-3 font-semibold text-lg">
                  Vehicle : ({FormData?.vehicles?.length ?? 0})
                </p>
                <div className="grid |grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {FormData.vehicles?.map((e, index) => (
                    <div
                      className="bg-white shadow-md rounded-md relative"
                      key={index}
                    >
                      <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">
                          {e.type}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2 mb-4 p-2">
                        <div className="text-sm text-gray-500 flex justify-between">
                          Vehicle Name
                          <span className="ml-2 text-base font-semibold text-gray-700">
                            {e.name}
                          </span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Vehicle Number
                          <span className="text-black">{e.number}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paid and Pending Maintenance */}
              {[
                { title: "Paid Maintenance", data: maintenanceData.paid, isPaid: true },
                { title: "Pending Maintenance", data: maintenanceData.pending, isPaid: false },
              ].map(({ title, data, isPaid }, index) => (
                <div key={index} className="bg-white p-4 rounded-lg mt-5">
                  <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {data &&
                      Array.isArray(data) &&
                      data.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white shadow-md rounded-lg"
                        >
                          <div className="flex justify-between items-center p-2 rounded-t-lg bg-[#5678e9]">
                            <h2 className="text-lg font-semibold text-white">
                              Maintenance
                            </h2>
                            <span className="text-sm bg-blue-700 text-white py-1 px-3 rounded-full">
                              {isPaid ? "Paid" : "Pending"}
                            </span>
                          </div>
                          <div className="mt-4 text-gray-700 p-4">
                            <div className="flex justify-between mt-2">
                              <span>Maintenance Amount</span>
                              <span>₹ {item.Maintenance_Amount?.toFixed(2) || "0.00"}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                              <span>Due Date</span>
                              <span>
                                {new Date(
                                  item.Maintenance_Due_Date
                                ).toLocaleDateString("en-IN")}
                              </span>
                            </div>
                           {!isPaid &&(<div className="flex justify-between mt-2">
                              <span>Penalty Amount</span>
                              <span>₹ {item.Penalty_Amount?.toFixed(2) || "0.00"}</span>

                            </div>)}
                            <div className="flex justify-between mt-2">
                              <span>Penalty After</span>
                              <span>
                                {item.Penalty_Applied_After_Day_Selection} days
                              </span>
                            </div>
                            {!isPaid && (
                              <button
                                className="mt-4 w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-2 rounded-lg shadow hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-blue-300 transition-all duration-200"
                                onClick={() => payment(item)}
                              >
                                Pay Now
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Announcements Section */}
              <div className="bg-white p-6 shadow rounded-md mt-5">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Announcements
                </h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Announcement?.map((e, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-md relative border border-gray-200"
                    >
                      <div className="flex justify-between items-center rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">
                          {e.title}
                        </h2>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-2 flex justify-between">
                          <strong>Announcement Date</strong>
                          <p className="text-black text-sm font-medium">
                            {new Date(e.date).toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex justify-between">
                          <strong>Announcement Time</strong>
                          <p className="text-black text-sm font-medium">
                            {e.time}
                          </p>
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex justify-between">
                          <strong>Description</strong>
                          <p className="text-black font-medium text-sm">
                            {e.description}
                          </p>
                        </p>
                      </div>
                    </div>
                  )) || <p>No announcements available.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Tenant" && <Tenant />}
        </div>
      </div>
    </div>
  );
};

export default Personal_Detail;