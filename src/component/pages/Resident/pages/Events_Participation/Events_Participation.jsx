import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import Activity from "./Activity";
import useSidbarTogal from "../../../../layout/useSidbarTogal";
import { GetAnnouncement } from "../../../../services/Api/api";

const Events_Participation = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [data, setdata] = useState(280);
  const [getData, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen })

  const [activeTab, setActiveTab] = useState("Events");
  const [EventData, setEventData] = useState([]); // Initialize as an empty array

  // Fetch Event Data on component mount
  const [Loding, setLoding] = useState(true)

  useEffect(() => {
    
    fetchActivities();
  }, []);


  const fetchActivities = async () => {
    GetAnnouncement(setEventData,setLoding)
  };
 

  return (
    <div className="bg-[#f0f5fb] min-h-screen">
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" className={`ml-[${getData}px] max-[426px]:ml-0`}>
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <div className="p-6 bg-gray-100">
          <div className="flex flex-wrap">
            <button
              className={`py-2 px-8 max-[426px]:px-4 font-semibold text-center rounded-t-lg border-b-2 border-b-blue-500 ${activeTab === "Events" ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
                  : "bg-white text-gray-700"
                }`}
              onClick={() => setActiveTab("Events")}
            >
              Events Participate
            </button>
            <button
              className={`py-2 px-8 max-[426px]:px-4 font-semibold text-center rounded-t-lg border-b-2 border-b-blue-500 ${activeTab === "Activity"
                ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
                : "bg-white text-gray-700"
                }`}
              onClick={() => setActiveTab("Activity")}
            >
              Activity Participate
            </button>
          </div>

          {activeTab === "Events" && (
            <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-lg">
              <h2 className="text-lg lg:text-2xl font-bold mb-4">Events Participation</h2>
              {Loding ? (
                  <div className='flex justify-center'>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                </div>
                ) : (
              <table className="w-full table-auto border-collapse rounded-t-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#eef1fd] text-gray-700">
                    <th className="px-4 py-2 text-left">Participator Name</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Event Time</th>
                    <th className="px-4 py-2 text-left">Event Date</th>
                    <th className="px-4 py-2 text-left">Event Name</th>
                  </tr>
                </thead>
               
                <tbody>
                  {EventData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <img
                          src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770799/bl9awma4kwu1d9tdrakp.png"
                          alt="Profile"
                          className="w-8 h-8 rounded-full border border-gray-400"
                        />
                        <span>{item.title}</span>
                      </td>
                      <td className="px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3">{item.time}</td>
                      <td className="px-4 py-3"> {new Date(item.date).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}</td>
                      <td className="px-4 py-3">{item.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>  )}
            </div>
          )}
          {activeTab === "Activity" && (

            <Activity />
          )}
        </div>
      </div>
    </div>
  );
};

export default Events_Participation;
