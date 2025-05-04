import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {  MdSecurity } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

export default function Sidenav({ toggleNav, data }) {
  const { pathname } = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div id="mySidenav" style={{ width: data, display: data === 0, transition: 'width 0.3s' }} className="fixed overflow-y-auto top-0 left-0 h-full z-10 transition-all duration-500 bg-white text-white max-[425px]:fixed">
      <div className="flex flex-col justify-between h-screen">
        <div>
          <div className="flex justify-center my-4">
          <h1 className="text-4xl font-bold text-blue-600 mt-3 max-[425px]:mt-10 mb-5">Civic<span className="text-black">Nest</span></h1>
          </div>

          <button onClick={toggleNav} className="absolute text-black top-0 right-6 text-3xl hidden max-[425px]:flex">
            ×
          </button>

          <Link
            onClick={toggleDropdown}
            aria-current={pathname.startsWith("/security") ? "page" : undefined}
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg transition-colors duration-300 flex items-center bg-gradient-to-r  text-white from-blue-600 to-blue-400   ${pathname.startsWith("/security")
              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold"
              : "hover:bg-gray-100 text-black"
              }`}
          >
            {/* Active Indicator */}
            <MdSecurity  className="inline mr-2" />
            Security
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
                    to="/security/visitor"
                    className={`text-nowrap block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/security/visitor") ? "border-black font-semibold" : ""}`}
                  >
                  Visitor Tracking
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to="/security/emergency"
                    className={`text-nowrap block px-4 py-2 hover:bg-gray-100 text-black border-l-4 ${pathname.startsWith("/security/emergency") ? "border-black font-semibold" : ""}`}
                  >
                    Emergency Management
                  </Link>
                </li>
                
              </ul>
            </div>
          )}
        </div>
        <div className="border-t">
          <Link to="/"
            className={`text-nowrap relative p-3 ms-4 m-2 rounded-lg text-lg block transition-colors duration-300 flex text-black text-red-600 items-center ${pathname === "/"
              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold"
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
