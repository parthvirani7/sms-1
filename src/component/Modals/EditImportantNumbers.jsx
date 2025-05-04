import React, { useEffect, useState } from 'react';
import { updateImportantNumber } from '../services/Api/api';
import axios from 'axios';
import Close_Button from '../layout/CloseButton';
import Loding_Button from '../layout/Loding_Button';


const EditImportantNumbers = ({ _id, Fdata, closeEditModal }) => {

    const [editNumber, setEditNumber] = useState({
        Fullname: '',
        Phonenumber: '',
        Work: ''
    });
    const [loading, setLoading] = useState(false);


    const url = 'https:/society-management-app-server.onrender.com'
    useEffect(() => {
        editdata()
    }, []);

    const editdata = () => {
        axios.put(`${url}/importantnumber/updateImportantNumber/${_id}`).then((res) => {
            setEditNumber(res.data);
        })
    }

    const handleNewNumberChange = (e) => {
        setEditNumber({ ...editNumber, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setLoading(true)
        updateImportantNumber(_id, editNumber, closeEditModal, Fdata, setLoading)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 overflow-auto max-h-svh">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Edit Contact</h1>
                    <button
                        type="button"
                        className="text-gray-600 hover:text-gray-800 text-2xl"
                        onClick={closeEditModal}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Full Name<span className='text-red'>*</span></label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            name="Fullname"
                            value={editNumber.Fullname}
                            onChange={handleNewNumberChange}
                            placeholder="Enter Name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Phone Number<span className='text-red'>*</span></label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            name="Phonenumber"
                            value={editNumber.Phonenumber}
                            onChange={handleNewNumberChange}
                            placeholder="Enter Number"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Work<span className='text-red'>*</span></label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            name="Work"
                            value={editNumber.Work}
                            onChange={handleNewNumberChange}
                            placeholder="Enter Work"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Close_Button
                            Addclass='w-1/2'
                            onClick={closeEditModal}
                            CloseName='Cancel'
                        />
                        <Loding_Button
                            type="button"
                            onClick={handleSave}
                            loading={loading}
                            Btn_Name='Save Changes'
                            Addclass='w-1/2'
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditImportantNumbers;
