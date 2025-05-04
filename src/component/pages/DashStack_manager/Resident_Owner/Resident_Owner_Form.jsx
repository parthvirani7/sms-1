import React, { useState } from "react";
import Header from "../../../layout/Header";
import Sidebar from "../../../layout/Sidebar";
import Resident_Owner from "../Resident_Owner/Resident_Owner_component/Resident_Owner";
import Resident_Tenant from "../Resident_Owner/Resident_Owner_component/Resident_Tenant";
import useSidbarTogal from "../../../layout/useSidbarTogal";

const Resident_Owner_Form = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);

  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})

  const [activeTab, setActiveTab] = useState("Owner");
  
  return (
    <div>
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" className={`ml-[${getdata}px] max-[425px]:ml-0`}>
        <Header toggleNav={toggleNav} />
        <main className="flex-1">
          <div className="p-6 h-full bg-[#f0f5fb]">
            <div className="flex">
              <button
                className={`py-2 px-8 font-semibold text-center rounded-t-lg border-b-2 border-b-blue-500 ${activeTab === "Owner"
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
                  : "bg-white text-gray-700"
                  }`}
                onClick={() => setActiveTab("Owner")}
              >
                Owner
              </button>
              <button
                className={`py-2 px-8 font-semibold text-center rounded-t-lg border-b-2 border-b-blue-500 ${activeTab === "Tenant"
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
                  : "bg-white text-gray-700"
                  }`}
                onClick={() => setActiveTab("Tenant")}
              >
                Tenant
              </button>
            </div>

            {activeTab === "Owner" && (
              <Resident_Owner/>
            )}
            {activeTab === "Tenant" && (
              <Resident_Tenant />
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Resident_Owner_Form;
