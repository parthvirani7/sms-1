import React, { useState } from 'react';
import { ImportantNumbersPost } from '../services/Api/api';
import Close_Button from '../layout/CloseButton';
import Loding_Button from '../layout/Loding_Button';

const CreateImportantNumbers = ({ setShowModal, Fdata }) => {
    const [newNumber, setNewNumber] = useState({
        Fullname: '',
        Phonenumber: '',
        Work: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNewNumberChange = (e) => {
        const { name, value } = e.target;
        setNewNumber({ ...newNumber, [name]: value });

        // Validate phone number
        if (name === 'Phonenumber') {
            if (!/^\d{0,10}$/.test(value)) {
                setError('Phone number must be 10 digits');
            } else if (value.length === 10) {
                setError('');
            } else {
                setError('');
            }
        }
    };

    const handleAddSociety = () => {
        if (newNumber.Phonenumber.length !== 10) {
            setError('Phone number must be exactly 10 digits');
            return;
        }
        setLoading(true)
        ImportantNumbersPost(newNumber, Fdata,setLoading);
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 overflow-auto max-h-svh">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Create New Contact</h1>
                    <button
                        type="button"
                        className="text-gray-600 hover:text-gray-800 text-2xl"
                        onClick={() => setShowModal(false)}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {/* Full Name Input */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Full Name<span className='text-red'>*</span></label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            name="Fullname"
                            value={newNumber.Fullname}
                            onChange={handleNewNumberChange}
                            placeholder="Enter Name"
                        />
                    </div>
                    {/* Phone Number Input */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Phone Number<span className='text-red'>*</span></label>
                        <input
                            type="text"
                            className={`w-full p-1 text-sm border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
                            name="Phonenumber"
                            value={newNumber.Phonenumber}
                            onChange={handleNewNumberChange}
                            placeholder="Enter Number"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    {/* Work Input */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Work<span className='text-red'>*</span></label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            name="Work"
                            value={newNumber.Work}
                            onChange={handleNewNumberChange}
                            placeholder="Enter Work"
                        />
                    </div>
                    {/* Buttons for Cancel and Add Society */}
                    <div className="flex justify-end mt-4">
                        <Close_Button
                            Addclass='w-1/2'
                            onClick={() => setShowModal(false)}
                            CloseName='Cancel'
                        />
                        <Loding_Button
                            loading={loading}
                            Btn_Name='Add to Society'
                            onClick={handleAddSociety}
                            Addclass='w-1/2'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateImportantNumbers;
