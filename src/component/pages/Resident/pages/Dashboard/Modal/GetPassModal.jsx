import React, { useState } from 'react';
import PaymentmethodModal from './PaymentmethodModal';
import CloseBtn from '../../../../../layout/CloseButton'

const GetPassModal = ({ close }) => {
    const [selectMember, setSelectMember] = useState("");
    const [PaymentMethod, setPaymentMethod] = useState(false)
    const perPersonAmount = 1500;

    const totalAmount = selectMember ? perPersonAmount * parseInt(selectMember) : 0;

    const totleAmount = () => {
        console.log(`Total Amount: $${totalAmount}`);
        setPaymentMethod(true)
    };

    const ClosePaymentMethod = () => {
        setPaymentMethod(false)
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
            <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mx-auto relative z-60">
                <div className="flex mb-2 pb-2 justify-between items-center border-b">
                    <h2 className="text-xl font-semibold">Detail of the Per Person</h2>
                    <button type="button" className="text-gray-600 hover:text-gray-800 text-2xl" onClick={close}>
                        &times;
                    </button>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className='text-[#4f4f4f]'>Per Person Amount :</p>
                        <p className='text-[#4f4f4f] bg-[#f4f4f4] px-4 py-1 rounded-full'>
                            $ {perPersonAmount}
                        </p>
                    </div>

                    <div className="mb-2">
                        <label className='text-sm'>Select Member</label>
                        <select
                            value={selectMember}
                            onChange={(e) => setSelectMember(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Members</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                        <p>Total Amount :</p>
                        <p className='text-[#4f4f4f] bg-[#f4f4f4] px-4 py-1 rounded-full'>
                            $ {totalAmount}
                        </p>
                    </div>

                    <div className="flex justify-end mt-4">
                        <CloseBtn type="button" CloseName="Cancel" onClick={close} Addclass='w-1/2' />
                        <button
                            onClick={totleAmount}
                            disabled={totalAmount === 0}
                            className={`px-4 py-2 w-1/2 rounded-lg font-semibold shadow-lg transition duration-200 ${totalAmount === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-orange-600 hover:to-yellow-600"
                                }`}
                        >
                            Get Pass
                        </button>
                    </div>
                    {PaymentMethod && (<PaymentmethodModal close1={close} close2={ClosePaymentMethod} />)}
                </div>
            </div>
        </div>
    );
};

export default GetPassModal;
