import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdDashboard, MdDateRange, MdSecurity } from "react-icons/md";
import { RiCommunityFill } from "react-icons/ri";
import { BiSolidUserDetail } from "react-icons/bi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaCcAmazonPay } from "react-icons/fa";
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

  const AdminLogout =()=>{
    localStorage.removeItem('token');
  }

  return (
    <div id="mySidenav" style={{ width: data, display: data === 0, transition: 'width 0.3s' }} className="fixed overflow-y-auto top-0 left-0 h-full z-10 transition-all duration-500 bg-white text-white max-[425px]:fixed">
      <div className="flex flex-col justify-between h-screen">
        <div>
        <div className="flex justify-center my-4">
            <h1 className="text-4xl font-bold text-blue-600 mt-3 max-[425px]:mt-10 mb-5">Civic<span className="text-black">Nest</span></h1>
          </div>

          <button onClick={toggleNav} className="absolute text-black top-0 right-6 text-3xl hidden max-[426px]:flex">
            ×
          </button>

          <Link
            to="/resident/home"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname === "/resident/home" ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold" : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname === "/resident/home" && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <MdDashboard className="inline mr-2" />
            Overview
          </Link>

          <Link
            to="/resident/personal_detail"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 text-black flex items-center ${pathname.startsWith("/resident/personal_detail")
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-200"
              }`}
          >
            {/* {pathname.startsWith("/resident/personal_detail") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <BiSolidUserDetail className="inline mr-2" />
            Personal Detail
          </Link>

          <Link
            to="/resident/service_and_complaint"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname === "/resident/service_and_complaint" ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold" : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/resident/service_and_complaint") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <BsFillBoxSeamFill className="inline mr-2" />
            Service And Complaint
          </Link>

          <Link
            to="/resident/events_participation"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname === "/resident/events_participation" ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold" : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/resident/events_participation") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <MdDateRange className="inline mr-2" />
            Events Participation
          </Link>

          <Link
            onClick={toggleDropdown}
            aria-current={pathname.startsWith("/resident/community") ? "page" : undefined}
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg transition-colors duration-300 flex items-center ${pathname.startsWith("/resident/community")
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100 text-black"
              }`}
          >
            {/* Active Indicator */}
            <RiCommunityFill className="inline mr-2" />
            Community
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
                    to="/resident/community/access_forums"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/resident/community/access_forums") ? "border-black font-semibold" : ""}`}
                  >
                    Access Forums
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to="/resident/community/polls"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/resident/community/polls") ? "border-black font-semibold" : ""}`}
                  >
                    Polls
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to="/resident/community/communities_discussion"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/resident/community/communities_discussion") ? "border-black font-semibold" : ""}`}
                  >
                    Communities Discussion
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <Link
            onClick={toggleComplaintTrackingDropdown}
            aria-current={pathname.startsWith("/resident/payment_portal") ? "page" : undefined}
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname.startsWith("/resident/payment_portal")
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/resident/payment_portal") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <FaCcAmazonPay className="inline mr-2" />
            Payment Portal
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
                    to="/resident/payment_portal/maintenance_invoices"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/resident/payment_portal/maintenance_invoices") ? "border-black font-semibold" : ""}`}
                  >
                    Maintenance Invoices
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to="/resident/payment_portal/other_income_invoice"
                    className={`block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/resident/payment_portal/other_income_invoice") ? "border-black font-semibold" : ""}`}
                  >
                    Other Income Invoice
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <Link to="/resident/security_protocols"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black items-center ${pathname === "/resident/security_protocols"
              ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold"
              : "hover:bg-gray-100"
              }`}
          >
            {/* {pathname.startsWith("/resident/security_protocols") && (
              <div className="absolute -left-4 top-0 bottom-0 w-2 bg-orange-600 rounded-r-lg"></div>
            )} */}
            <MdSecurity className="inline mr-2" />
            Security Protocols
          </Link>
        </div>

        <div className="border-t">
          <Link to="/"
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
