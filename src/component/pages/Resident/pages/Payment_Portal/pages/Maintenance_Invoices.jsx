import React, { useEffect, useState } from 'react';
import Sidebar from '../../../layout/Sidebar';
import Header from '../../../layout/Header';
import Button from '../../../../../layout/Button_gradient';
import axios from 'axios';
import ShowMaintenanceDetails from '../Modal/ShowMaintenanceDetails';
import PaymentmethodModal from '../../Dashboard/Modal/PaymentmethodModal';
import { useNavigate } from 'react-router-dom';
import { Get_Pending_Maintanance } from '../../../Api/api';
import useSidbarTogal from '../../../../../layout/useSidbarTogal';

const Maintenance_Invoices = () => {

    const [isOpen, setIsOpen] = useState(true);
    let [data, setdata] = useState(280);
    let [getdata, setget] = useState(280);
    const toggleNav = () => {
        setIsOpen((prevState) => !prevState);
    };

    useSidbarTogal({setdata, setget, isOpen})

    useEffect(() => {
        Fdata();
    }, []);

    const navigate = useNavigate();
    const [Maintanance, setMaintanance] = useState([]);
    const [PaymentMethod, setPaymentMethod] = useState(false)

    const ClosePaymentMethod = () => {
        setPaymentMethod(false)
    }

    const Fdata = () => {
        Get_Pending_Maintanance(setMaintanance)
    };

    const OpneData = () => {
        navigate("/resident/payment_portal/maintenance_invoices_data");
    }

    return (
        <div className="bg-[#f0f5fb]">
            <Sidebar toggleNav={toggleNav} data={data} />
            <div id="main" className={`ml-[${getdata}px] max-[426px]:ml-0`}>
                <div className="open_he">
                    <Header toggleNav={toggleNav} />
                </div>
                <div className="p-6">
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <div className="flex justify-between items-center max-[768px]:flex-col max-[768px]:items-start">
                            <h1 className="font-semibold md:text-2xl text-xl">Due Event Payment</h1>
                            <div className="flex max-[768px]:flex-col max-[768px]:w-full">
                                <ShowMaintenanceDetails
                                    total_title="Maintenance Amount"
                                    total_price="2,22,520"
                                    totle_color="text-white"
                                    totle_Noch="bg-[#9ccb9e]"
                                    Addclass='max-[768px]:my-4'
                                    textclass='text-semibold text-[#39973d]'
                                />
                                <ShowMaintenanceDetails
                                    total_title="Penalty Amount"
                                    total_price="2,22,520"
                                    totle_color="text-white"
                                    totle_Noch="bg-[#f3a59d]"
                                    textclass='text-semibold text-[#e74c3c]'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="font-semibold md:text-2xl text-xl max-[375px]:text-lg">Pending Maintanance</h1>
                            <Button onClick={OpneData} Btn_Name="View Invoice" />
                        </div>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {Maintanance.length > 0 ? (
                                Maintanance.map((e, index) => (
                                    <div key={index} className="border rounded-lg overflow-hidden shadow">
                                        <div className="flex justify-between items-center bg-[#5678e9] p-4">
                                            <h2 className="text-lg font-semibold text-white">{e.title || 'Maintenance'}</h2>
                                            <span className="px-6 py-1 text-sm font-medium text-white bg-[#6786eb] rounded-full">{e.status}</span>
                                        </div>
                                        <div className="p-4">
                                            <div className="text-gray-600">
                                                <div className="flex justify-between">
                                                    <span>Bill Date</span>
                                                    <span className="font-medium text-[#a7a7a7]">{e.bill_date || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <span>Pending Date</span>
                                                    <span className="font-medium text-[#a7a7a7]">{e.pending_date || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <span>Maintenance Amount</span>
                                                    <span className="font-medium text-[#e74c3c]">₹{e.maintenance_amount || '0.00'}</span>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <span>Maintenance Penalty Amount</span>
                                                    <span className="font-medium text-[#e74c3c]">₹{e.penalty_amount || '0.00'}</span>
                                                </div>
                                                <div className="flex justify-between mt-4 font-semibold text-lg">
                                                    <span>Grand Total</span>
                                                    <span className="text-green-600 font-semibold">₹{e.grand_total || '0.00'}</span>
                                                </div>
                                            </div>
                                            <Button onClick={() => setPaymentMethod(true)} Addclass='w-full mt-2' Btn_Name="Pay Now" />
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 text-center col-span-4">
                                    No pending maintenance invoices.
                                </div>
                            )}
                            {PaymentMethod && (<PaymentmethodModal close1={close} close2={ClosePaymentMethod} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance_Invoices;
