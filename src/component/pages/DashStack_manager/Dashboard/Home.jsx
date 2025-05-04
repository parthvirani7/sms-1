import React, { useEffect, useState } from "react";
import Sidebar from "../../../layout/Sidebar";
import Header from "../../../layout/Header";
import Home_totle_card from "../../../layout/Home_totle_card";
import { MdOutlineAttachMoney } from "react-icons/md";
import TotalBalanceChart from "../../../layout/TotalBalanceChart";
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import {
  GetOtherIncome,
  GetExpanse,
  GetResident,
  GetAnnouncement,
  GetComplainy,
  ImportantNumbersGet,
} from "../../../services/Api/api";
import { TiThMenu } from "react-icons/ti";
import CreateImportantNumbers from "../../../Modals/CreateImportantNumbers";
import EditImportantNumbers from "../../../Modals/EditImportantNumbers";
import OpenEditComplintModel from "../../../Modals/OpenEditComplintModel";
import { GrFormView } from "react-icons/gr";
import ViewComplintModel from "../../../Modals/ViewComplintModel";
import DeleteImportantNumbersModal from "../../../Modals/DeleteImportantNumbersModal";
import LodingDelete from "../../../layout/DeleteLoding";
import { DeleteComplaint } from "../../../services/Api/api";
import useSidbarTogal from "../../../layout/useSidbarTogal";
import { GetMaintenance } from "../../../services/Api/api";
import {
  MdAccountBalanceWallet,
  MdMoneyOff,
  MdPrecisionManufacturing,
} from "react-icons/md";

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);

  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen });

  const [contacts, setContacts] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [Important_id, setImportant_id] = useState([]);

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    ImportantNumbersGet(setContacts, setLoading);
  };

//other incoms

const [otherIncomeData, setOtherIncomeData] = useState([]);
const [loadingIncome, setLoadingIncome] = useState(true);

useEffect(() => {
  GetOtherIncome(setOtherIncomeData, setLoadingIncome);
}, []);

const totalIncome = otherIncomeData.reduce((sum, income) => {
  const amt = parseFloat(income.Amount) || 0; // Make sure it’s a valid number
  return sum + amt;
}, 0);


  //expance data 

  const [expenseData, setExpenseData] = useState([]);
const [loadingExpense, setLoadingExpense] = useState(true);

useEffect(() => {
  GetExpanse(setExpenseData, setLoadingExpense);
}, []);

const totalAmount = expenseData.reduce((sum, expense) => {
  const amt = parseFloat(expense.Amount) || 0; // fallback to 0 if NaN
  return sum + amt;
}, 0);

  //resident data

  const [residentData, setResidentData] = useState([]);
  const [loadingResident, setLoadingResident] = useState(true);

  useEffect(() => {
    getResidentData();
  }, []);

  const getResidentData = () => {
    GetResident(setResidentData, setLoadingResident);
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

  // add numbers pop_up

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // edit numbers pop_up

  const OpneeditModal = (_id) => {
    seteditModal(true);
    setImportant_id(_id);
  };

  const closeeditModal = () => {
    seteditModal(false);
  };

  // edit numbers pop_up

  const [ImportantNumbersDelete, setImportantNumbersDelete] = useState(false);
  const [ImportantNumbersDeleteId, setImportantNumbersDeleteId] =
    useState(null);

  const OpnedeleteContact = (_id) => {
    setImportantNumbersDelete(true);
    setImportantNumbersDeleteId(_id);
  };

  const ClosedeleteContact = () => {
    setImportantNumbersDelete(false);
  };

  // get complaint List

  useEffect(() => {
    getComplaintdata();
  }, []);

  let [getComplaint, setgetComplaint] = useState([]);
  const [loadingcomplaint, setloadingcomplaint] = useState(true);
  const getComplaintdata = () => {
    GetComplainy(setgetComplaint, setloadingcomplaint);
  };

  // edit complaint List pop_up

  const [EditComplint, setEditComplint] = useState(false);
  const [ViewComplint, setViewComplint] = useState(false);
  const [DeleteComplint, setDeleteComplint] = useState(false);
  const [loadingcomplint, setloadingcomplint] = useState(false);
  const [a_id, seta_id] = useState([]);
  const [b_id, setb_id] = useState([]);
  const [c_id, setc_id] = useState([]);

  const OpneEditComplint = (_id) => {
    setEditComplint(true);
    seta_id(_id);
  };
  const closeEditComplint = () => {
    setEditComplint(false);
  };

  const OpneViewComplint = (_id) => {
    setViewComplint(true);
    setb_id(_id);
  };
  const closeViewComplint = () => {
    setViewComplint(false);
  };

  const OpneDeleteComplint = (_id) => {
    setDeleteComplint(true);
    setc_id(_id);
  };
  const CloseDeleteComplint = () => {
    setDeleteComplint(false);
  };
  const ComlintDelete = () => {
    DeleteComplaint(
      c_id,
      setloadingcomplint,
      CloseDeleteComplint,
      getComplaint,
      setgetComplaint
    );
  };
  const [activities, setActivities] = useState([]);
  const [Loding, setLoding] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    GetAnnouncement(setActivities, setLoding);
  };

  const getFirstLetter = (title) => {
    return title ? title.charAt(0).toUpperCase() : ""; // Get the first letter and capitalize it
  };
  const totalBalance = totalIncome - totalAmount;

  return (
    <div className="capitalize">
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" className={`ml-[${getdata}px] max-[425px]:ml-0`}>
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <main className="flex-1 space-y-6 ">
          <div className="p-6 space-y-4 bg-[#f0f5fb]">
          {/* Dashboard Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
  <Home_totle_card
    total_title="Total Balance"
    total_price={loadingIncome || loadingExpense ? "..." : `₹${totalBalance.toLocaleString()}`}
    totle_color="text-white"
    totle_icon_bg_back="bg-[#e3f2fd]"
    totle_icon_bg="bg-[#2563eb]"
    totle_bg_border="border-[#1565c0]"
    totle_Noch="bg-[#2563eb]"
    totle_simbol={<MdAccountBalanceWallet />}
  />
<Link to="http://localhost:5173/manager/financial_management/income">
  <Home_totle_card
    total_title="Total Other Income"
    total_price={loadingIncome ? "..." : `₹${totalIncome.toLocaleString()}`}
    totle_color="text-white"
    totle_icon_bg_back="bg-[#e1f5fe]"
    totle_icon_bg="bg-[#2563eb]"
    totle_bg_border="border-[#0288d1]"
    totle_Noch="bg-[#2563eb]"
    totle_simbol={<MdOutlineAttachMoney />}
  />
  </Link>
<Link to="http://localhost:5173/manager/financial_management/expense">
  <Home_totle_card
    total_title="Total Expense"
    total_price={loadingExpense ? "..." : `₹${totalAmount.toLocaleString()}`}
    totle_color="text-white"
    totle_icon_bg_back="bg-[#f3fafe]"
    totle_icon_bg="bg-[#2563eb]"
    totle_bg_border="border-[#039b3f51b5e5]"
    totle_Noch="bg-[#2563eb]"
    totle_simbol={<MdMoneyOff />}
  />
  </Link>

<Link to="http://localhost:5173/manager/resident_management">
<Home_totle_card
    total_title="Total Unit"
    total_price={loadingResident ? "..." : residentData.length}
    totle_color="text-white"
    totle_icon_bg_back="bg-[#e8eaf6]"
    totle_icon_bg="bg-[#2563eb]"
    totle_bg_border="border-[#3f51b5]"
    totle_Noch="bg-[#2563eb]"
    totle_simbol={<MdPrecisionManufacturing />}
  />
</Link>
</div>


           {/* Complaint List and Upcoming Activity */}
<div className="grid grid-cols-1 gap-4">
  <div className="bg-white rounded-lg shadow">
    <div className="bg-white rounded-lg p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-base sm:text-lg font-semibold">Complaint List</h2>
        <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Month</option>
          <option>Week</option>
          <option>Day</option>
        </select>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto max-h-80">
        {loadingcomplaint ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
          </div>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-[#eef1fd] text-gray-700">
                <th className="px-4 py-2 whitespace-nowrap">Complainer Name</th>
                <th className="px-4 py-2 whitespace-nowrap">Complaint Name</th>
                <th className="px-4 py-2 whitespace-nowrap">Date</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Priority</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Complain Status</th>
                <th className="px-4 py-2 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {getComplaint.map((e, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770799/bl9awma4kwu1d9tdrakp.png"
                        alt="profile"
                      />
                      <span>{e.Complainer_Name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{e.Complaint_Name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(e.createdAt).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
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
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
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
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-green-500 p-1"
                        onClick={() => OpneEditComplint(e._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-blue-500 text-xl"
                        onClick={() => OpneViewComplint(e._id)}
                      >
                        <GrFormView />
                      </button>
                      <button
                        onClick={() => OpneDeleteComplint(e._id)}
                        className="text-red-500 p-1"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modals */}
        {EditComplint && (
          <OpenEditComplintModel
            _id={a_id}
            closeEditComplint={closeEditComplint}
            LodData={getComplaintdata}
          />
        )}
        {ViewComplint && (
          <ViewComplintModel
            _id={b_id}
            closeViewComplint={closeViewComplint}
          />
        )}
        {DeleteComplint && (
          <LodingDelete
            loading={loadingcomplint}
            DeleteClick={ComlintDelete}
            close={CloseDeleteComplint}
            getComplaint={getComplaint}
          />
        )}
      </div>
    </div>
  </div>
</div>

            {/* visitor log and support directory */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Visitors Log - takes 2 columns on large screens */}
  <div className="bg-white p-5 rounded-xl shadow-md lg:col-span-2">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">Visitors Log</h2>
      <a href="#" className="text-blue-600 text-sm hover:underline">View all</a>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-[600px] w-full bg-[#eef1fd] rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-3 border-b font-medium text-left">Visitor Name</th>
            <th className="px-4 py-3 border-b font-medium text-center">Phone Number</th>
            <th className="px-4 py-3 border-b font-medium text-center">Date</th>
            <th className="px-4 py-3 border-b font-medium text-center">Unit Number</th>
            <th className="px-4 py-3 border-b font-medium text-center">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="px-4 py-2 text-xs md:text-sm text-gray-700 flex items-center">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770799/bl9awma4kwu1d9tdrakp.png"
                alt="profile"
              />
              <span>Vj</span>
            </td>
            <td className="px-4 py-2 text-xs md:text-sm text-gray-700 text-center">123456789</td>
            <td className="px-4 py-2 text-xs md:text-sm text-gray-700 text-center">05/05/2222</td>
            <td className="px-4 py-2 text-xs md:text-sm text-gray-700 text-center">
              <span className="px-2 py-1 text-[#5678e9] bg-[#f6f8fb] rounded-full">A</span> 1001
            </td>
            <td className="px-4 py-2 text-xs md:text-sm text-gray-700 text-center">2:50 AM</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  {/* Support Directory - shifts below on small screens */}
  <div className="bg-white p-5 rounded-xl shadow-md">
    <div className="bg-white rounded-xl">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Support Directory</h2>
        <button
          onClick={openModal}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" />
          Add Contact
        </button>
        {showModal && (
          <CreateImportantNumbers Fdata={Fdata} setShowModal={closeModal} />
        )}
      </div>

      <div className="space-y-4 h-80 overflow-y-auto pr-2">
        {loading ? (
          <div className="flex justify-center h-full items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="flex justify-between items-start p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">
                    Name: <span className="text-gray-500">{contact.Fullname}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Phone: <span className="text-gray-500">{contact.Phonenumber}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Role: <span className="text-gray-500">{contact.Work}</span>
                  </p>
                </div>
                <div className="flex space-x-3 pt-1">
                  <button
                    onClick={() => OpnedeleteContact(contact._id)}
                    className="text-red-500 hover:text-red-600 transition"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => OpneeditModal(contact._id)}
                    className="text-blue-600 hover:text-blue-700 transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editModal && (
          <EditImportantNumbers
            Fdata={Fdata}
            _id={Important_id}
            closeEditModal={closeeditModal}
          />
        )}

        {ImportantNumbersDelete && (
          <DeleteImportantNumbersModal
            contacts={contacts}
            setContacts={setContacts}
            ClosedeleteContact={ClosedeleteContact}
            _id={ImportantNumbersDeleteId}
          />
        )}
      </div>
    </div>
  </div>
</div>


            <div className="mt-6 bg-white rounded-lg p-4">
  
  <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">Maintenance Details</h2>
      <a href="http://localhost:5173/manager/financial_management/income" className="text-blue-600 mb-4 text-sm hover:underline">View all</a>
    </div>
  {loadingMaintenance ? (
    <div className="flex justify-center items-center py-6">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400" />
    </div>
  ) : maintenanceData.length === 0 ? (
    <p className="text-gray-500">No maintenance records found.</p>
  ) : (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {maintenanceData.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 p-6 transition duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-600">₹{item.Maintenance_Amount}</h3>
            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
              Maintenance
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium">Penalty:</span>
              <span>₹{item.Penalty_Amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Due Date:</span>
              <span>{new Date(item.Maintenance_Due_Date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Penalty After:</span>
              <span>{item.Penalty_Applied_After_Day_Selection} days</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
