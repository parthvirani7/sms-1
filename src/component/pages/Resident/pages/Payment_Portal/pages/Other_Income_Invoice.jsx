import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layout/Sidebar'
import Header from '../../../layout/Header'
import Button from '../../../../../layout/Button_gradient';
import axios from 'axios';
import PaymentmethodModal from '../../Dashboard/Modal/PaymentmethodModal';
import useSidbarTogal from '../../../../../layout/useSidbarTogal';

const Other_Income_Invoice = () => {

    const [isOpen, setIsOpen] = useState(true);
    let [data, setdata] = useState(280);
    let [getdata, setget] = useState(280);
    const toggleNav = () => {
        setIsOpen((prevState) => !prevState);
    };

    useSidbarTogal({setdata, setget, isOpen})

    const [Maintanance, setMaintanance] = useState([]);
    const [PaymentMethod, setPaymentMethod] = useState(false)

    const ClosePaymentMethod = () => {
        setPaymentMethod(false)
    }

    useEffect(() => {
        Fdata();
    }, []);

    const Fdata = () => {
        axios.get('https://civicnest-backend.onrender.com/Event_Payment').then((res) => {
            setMaintanance(res.data);
        });
    };

    return (
        <div className='bg-[#f0f5fb] h-screen'>
            <Sidebar toggleNav={toggleNav} data={data} />
            <div id='main' className={`ml-[${getdata}px] max-[426px]:ml-0`}>
                <div className="open_he">
                    <Header toggleNav={toggleNav} />
                </div>
                <div className="p-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="font-semibold md:text-2xl text-lg">Due Event Payment</h1>
                            <Button Btn_Name="View Invoice" />
                        </div>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {Maintanance.length > 0 ? (
                                Maintanance.map((e, index) => (
                                    <div key={index} className="border rounded-lg overflow-hidden shadow">
                                        <div className="flex justify-between items-center bg-[#5678e9] p-4">
                                            <h2 className="text-lg font-semibold text-white">{e.title || 'Due Event Payment'}</h2>
                                            <span className="px-6 py-1 text-sm font-medium text-white bg-[#6786eb] rounded-full">{e.Status}</span>
                                        </div>
                                        <div className="p-4">
                                            <div className="text-gray-600">
                                                <div className="flex justify-between">
                                                    <span>Event Name</span>
                                                    <span className="font-medium text-[#a7a7a7]">{e.Event_name || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <span>Event Due Date</span>
                                                    <span className="font-medium text-[#a7a7a7]">{e.Event_due_date || 'N/A'}</span>
                                                </div>
                                                <div className="flex justify-between mt-2">
                                                    <span>Amount</span>
                                                    <span className="font-medium text-[#e74c3c]">₹ {e.Amount || '0.00'}</span>
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
    )
}

export default Other_Income_Invoice
