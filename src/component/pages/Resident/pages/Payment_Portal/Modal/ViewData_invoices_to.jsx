import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Button from '../../../../../layout/Button_gradient';
import { FaCloudArrowDown } from "react-icons/fa6";

const ViewData_invoices_to = ({ Close, id }) => {
    const [getInvoices, setgetInvoices] = useState([]);
    const modalRef = useRef(null); // Reference for the modal

    useEffect(() => {
        Fdata();
    }, []);

    const Fdata = () => {
        axios.get('https://civicnest-backend.onrender.com/Maintenance_Invoices_data').then((res) => {
            setgetInvoices(res.data);
        });
    };

    const ViewData = getInvoices.filter((e) => e.id === id);

    const Print_invoice = () => {
        const modalElement = modalRef.current;

        if (modalElement) {
            html2canvas(modalElement).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 190; // PDF width
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
                pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

                // Open the PDF in a new window for print
                const pdfBlob = pdf.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const newWindow = window.open(pdfUrl);
                if (newWindow) {
                    newWindow.addEventListener('load', () => {
                        newWindow.focus();
                        newWindow.print();
                    });
                }
            });
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) Close();
            }}
        >
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2" ref={modalRef}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Maintenance Invoices</h1>
                    <button type="button" className="text-gray-600 hover:text-gray-800 text-2xl" onClick={Close}>
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {ViewData.length > 0 ? (
                        ViewData.map((e, index) => (
                            <div key={index}>
                                <div className="bg-[#f6f8fb] rounded-lg p-4">
                                    <div className="flex mb-2">
                                        <div className="w-1/2">
                                            <p className="text-[#a7a7a7] font-medium">Invoice Id</p>
                                            <p>{e.Invoice_ID}</p>
                                        </div>
                                        <div className="w-1/2">
                                            <p className="text-[#a7a7a7] font-medium">Owner Name</p>
                                            <p>{e.Owner_Name}</p>
                                        </div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div className="w-1/2">
                                            <p className="text-[#a7a7a7] font-medium">Bill Date</p>
                                            <p>
                                                {new Date(e.Bill_Date).toLocaleDateString("en-US", {
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <div className="w-1/2">
                                            <p className="text-[#a7a7a7] font-medium">Payment Date</p>
                                            <p>
                                                {new Date(e.Payment_Date).toLocaleDateString("en-US", {
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-[#a7a7a7] font-medium">Phone Number</p>
                                        <p>{e.Phone_Number}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-[#a7a7a7] font-medium">Email</p>
                                        <p>{e.Email}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-[#a7a7a7] font-medium">Address</p>
                                        <p>{e.Address}</p>
                                    </div>
                                </div>
                                <div className="bg-[#f6f8fb] rounded-lg p-4 mt-3">
                                    <div className="mb-2 flex justify-between">
                                        <p className="font-medium">Maintenance Amount</p>
                                        <p>{e.Maintenance_Amount}</p>
                                    </div>
                                    <div className="mb-2 flex justify-between border-b-2 pb-2">
                                        <p className="font-medium">Penalty</p>
                                        <p>350</p>
                                    </div>
                                    <div className="mb-2 flex justify-between">
                                        <p className="font-medium">Grand Total</p>
                                        <p>{parseFloat(e.Maintenance_Amount) + 350}</p>
                                    </div>
                                </div>
                                <div className="bg-[#f6f8fb] rounded-lg p-4 mt-3">
                                    <div>
                                        <p className="text-[#a7a7a7] font-medium">Note</p>
                                        <p>
                                            A visual representation of your spending categories
                                            visual representation.
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={Print_invoice}
                                    Addclass="w-full mt-3"
                                    Btn_Name={<span className='flex items-center justify-center'><FaCloudArrowDown className='mr-2 text-xl' /> Download Invoice</span>}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="p-4">No data found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewData_invoices_to;
