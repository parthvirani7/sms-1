import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar';
import Header from '../../../layout/Header';
import { GrFormView } from 'react-icons/gr';
import axios from 'axios';
import ViewData_invoices_to from '../Modal/ViewData_invoices_to';
import { Get_Maintenance_Invoices_data } from '../../../Api/api';
import useSidbarTogal from '../../../../../layout/useSidbarTogal';

const Maintenance_Invoices_data = () => {

    const [isOpen, setIsOpen] = useState(true);
    let [data, setdata] = useState(280);
    let [getdata, setget] = useState(280);
    const toggleNav = () => {
        setIsOpen((prevState) => !prevState);
    };

    useSidbarTogal({setdata, setget, isOpen})

    // State for selected month
    const [selectedMonth, setSelectedMonth] = useState('');

    // State for invoices data
    const [getInvoices, setgetInvoices] = useState([]);

    // State for View data 

    const [View, setView] = useState(false)
    const [ViewID, setViewID] = useState("")

    useEffect(() => {
        Fdata();
    }, []);

    const Fdata = () => {
        Get_Maintenance_Invoices_data(setgetInvoices)
    };

    // Filter invoices based on selected month
    const filteredInvoices = selectedMonth
        ? getInvoices.filter((invoice) => {
            const billDate = new Date(invoice.Bill_Date);
            return billDate.toLocaleString('default', { month: 'long' }) === selectedMonth;
        })
        : getInvoices;

    const ViewData = (id) => {
        setView(true)
        setViewID(id)
    };

    const CloseView = () => {
        setView(false)
    }

    return (
        <div className="bg-[#f0f5fb]">
            <Sidebar toggleNav={toggleNav} data={data} />
            <div id="main" className={`ml-[${getdata}px] max-[426px]:ml-0`}>
                <div className="open_he">
                    <Header toggleNav={toggleNav} />
                </div>
                <div className="p-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h1 className="font-semibold md:text-2xl text-md">Maintenance Invoices</h1>
                            <select name="month" className='border py-1 px-2' defaultValue="Month" onChange={(e) => setSelectedMonth(e.target.value)} >
                                <option value="Month" disabled>Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                        <div className="overflow-auto h-svh">
                            <table className="min-w-full bg-[#eef1fd] rounded-lg">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 border-b font-medium ">Invoice ID</th>
                                        <th className="px-6 py-3 border-b font-medium ">Owner Name</th>
                                        <th className="px-6 py-3 border-b font-medium ">Bill Date</th>
                                        <th className="px-6 py-3 border-b font-medium ">Payment Date</th>
                                        <th className="px-6 py-3 border-b font-medium ">Phone Number</th>
                                        <th className="px-6 py-3 border-b font-medium ">Email</th>
                                        <th className="px-6 py-3 border-b font-medium ">Maintenance Amount</th>
                                        <th className="px-6 py-3 border-b font-medium ">Pending Amount</th>
                                        <th className="px-6 py-3 border-b font-medium ">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Loop through filtered invoices */}
                                    {filteredInvoices.map((e, index) => {
                                        return (
                                            <tr key={index} className="border-b bg-white hover:bg-gray-50 font-medium text-center md:font-semibold overflow-x-scroll">
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.Invoice_ID}</td>
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.Owner_Name}</td>
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">
                                                    {new Date(e.Bill_Date).toLocaleDateString("en-US", {
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </td>
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">
                                                    {new Date(e.Payment_Date).toLocaleDateString("en-US", {
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </td>
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">+91 {e.Phone_Number}</td>
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.Email}</td>
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.Maintenance_Amount}</td>
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 truncate">{e.Pending_Amount}</td>
                                                <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 flex space-x-2 md:space-x-2 justify-center">
                                                    <button className="text-blue-500 text-2xl rounded" onClick={() => ViewData(e.id)}>
                                                        <GrFormView />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {View && <ViewData_invoices_to Close={CloseView} id={ViewID} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance_Invoices_data;