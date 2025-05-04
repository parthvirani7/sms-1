import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdAttachEmail, MdDashboard, MdSecurity } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { IoIosContact } from "react-icons/io";
import { FaCity } from "react-icons/fa";
import { BsFillRecordBtnFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";

export default function Sidenav({ toggleNav, data }) {
  const { pathname } = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [isComplaintTrackingDropdown, setIsComplaintTrackingDropdown] = useState(false);

  const toggleComplaintTrackingDropdown = () => {
    setIsComplaintTrackingDropdown(!isComplaintTrackingDropdown);
  };

  const [isSecurity_managementDropdown, setIsSecurity_managementDropdown] = useState(false);

  const toggleSecurity_managementDropdown = () => {
    setIsSecurity_managementDropdown(!isSecurity_managementDropdown);
  };

  const AdminLogout = () => {
    localStorage.removeItem('token');
  }

  return (
    <div
      id="mySidenav"
      style={{
        width: data,
        display: data === 0,
        transition: 'width 0.3s',
      }}
      className="fixed overflow-y-auto top-0 left-0 h-full z-10 transition-all duration-500 bg-white text-white max-[425px]:fixed"
    >
      <div className="flex flex-col justify-between h-screen">
        <div>
        <div className="flex justify-center my-4">
            <h1 className="text-4xl font-bold text-blue-600 mt-3 max-[425px]:mt-10 mb-5">Civic<span className="text-black">Nest</span></h1>
          </div>

          <button onClick={toggleNav} className="absolute text-black top-0 right-6 text-3xl hidden max-[426px]:flex">
            ×
          </button>

          <Link
            to="/manager/home"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg transition-colors duration-300 flex text-black items-center ${pathname.startsWith("/manager/home") ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold" : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname === "/manager/home" && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <MdDashboard className="inline mr-2" />
            Overview
          </Link>

          <Link
            to="/manager/resident_management"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 text-black flex items-center ${pathname.startsWith("/manager/resident_management")
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-200"
              }`}
          >
            {/* {pathname.startsWith("/manager/resident_management") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <BsFillRecordBtnFill className="inline mr-2" />
            Member Directory
          </Link>

          <Link
            onClick={toggleDropdown}
            aria-current={pathname.startsWith("/manager/financial_management") ? "page" : undefined}
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg transition-colors duration-300 flex items-center ${pathname.startsWith("/manager/financial_management")
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100 text-black"
              }`}
          >
            {/* Active Indicator */}
            {/* {pathname.startsWith("/manager/financial_management") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <RiMoneyDollarBoxFill className="inline mr-2" />
            Billing & Payments
          </Link>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className={`mt-2 w-full bg-white rounded-lg overflow-hidden transition-all duration-500 ${isDropdownOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
              <ul className="w-full">
                <li className="ml-6">
                  <Link
                    to="/manager/financial_management/income"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/manager/financial_management/income") ? "border-black font-semibold" : ""}`}
                  >
                    Income
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to="/manager/financial_management/expense"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/manager/financial_management/expense") ? "border-black font-semibold" : ""}`}
                  >
                    Expense
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to="/manager/financial_management/note"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/manager/financial_management/note") ? "border-black font-semibold" : ""}`}
                  >
                    Note
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <Link
            to="/manager/facility_management"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname === "/manager/facility_management" ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold" : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/manager/facility_management") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <FaCity className="inline mr-2" />
            Amenities & Resources
          </Link>

          <Link
            onClick={toggleComplaintTrackingDropdown}
            aria-current={pathname.startsWith("/manager/complaint_tracking") ? "page" : undefined}
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname.startsWith("/manager/complaint_tracking")
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/manager/complaint_tracking") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <MdAttachEmail className="inline mr-2" />
            Issue Resolution
          </Link>

          {/* Dropdown Menu */}
          {isComplaintTrackingDropdown && (
            <div
              className={`mt-2 w-full bg-white rounded-lg overflow-hidden transition-all duration-500 ${isComplaintTrackingDropdown ? "max-h-screen" : "max-h-0"
                }`}
            >
              <ul className="w-full">
                <li className="ml-6">
                  <Link
                    to="/manager/complaint_tracking/Create_Complaint"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/manager/complaint_tracking/Create_Complaint") ? "border-black font-semibold" : ""}`}
                  >
                    Create Complaint
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to="/manager/complaint_tracking/Request_Tracking"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/manager/complaint_tracking/Request_Tracking") ? "border-black font-semibold" : ""}`}
                  >
                    Request Tracking
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <Link
            onClick={toggleSecurity_managementDropdown}
            aria-current={pathname.startsWith("/manager/security_management") ? "page" : undefined}
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname.startsWith("/manager/security_management")
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/manager/security_management") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <MdSecurity className="inline mr-2" />
            Safety & Security
          </Link>

          {isSecurity_managementDropdown && (
            <div
              className={`mt-2 w-full bg-white rounded-lg overflow-hidden transition-all duration-500 ${isSecurity_managementDropdown ? "max-h-screen" : "max-h-0"
                }`}
            >
              <ul className="w-full">
                <li className="ml-6">
                  <Link
                    to="/manager/security_management/visitor_logs"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/manager/security_management/visitor_logs") ? "border-black font-semibold" : ""}`}
                  >
                    Visitor Logs
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to="/manager/security_management/security_protocols"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/manager/security_management/security_protocols") ? "border-black font-semibold" : ""}`}
                  >
                    Security Protocols
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <Link
            to="/manager/security_guard"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname === "/manager/security_guard"
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/manager/security_guard") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <IoIosContact className="inline mr-2" />
            Guard Monitoring
          </Link>

          <Link
            to="/manager/announcement"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname === "/manager/announcement"
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/manager/announcement") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <GrAnnounce className="inline mr-2" />
            Notices & Updates
          </Link>
        </div>
        <div className="border-t">
          <Link
            to="/"
            onClick={AdminLogout}
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black text-red-600 items-center ${pathname === "/"
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100"
              }`}
          >
            <IoLogOut className="inline text-red-600 mr-2" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}