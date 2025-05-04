import React, { useState } from 'react';
import { UserCreateSociety } from '../services/Api/api';

const CreateSociety = ({ CloseCreatenewSociety,LodData }) => {
    const [newSociety, setNewSociety] = useState({
        societyname: '',
        societyaddress: '',
        Country: '',
        State: '',
        City: '',
        Zipcode: ''
    });

    const handleNewSocietyChange = (e) => {
        setNewSociety({ ...newSociety, [e.target.name]: e.target.value });
    };

    const handleAddSociety = () => {
        UserCreateSociety(newSociety,CloseCreatenewSociety,LodData)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Create New Society</h1>
                </div>
                <div className="p-4">
                    {/* Society Name */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Society Name*</label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            name="societyname"
                            value={newSociety.societyname}
                            onChange={handleNewSocietyChange}
                            placeholder="Enter Name"
                        />
                    </div>
                    {/* Society Address */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium pb-2">Society Address*</label>
                        <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            name="societyaddress"
                            value={newSociety.societyaddress}
                            onChange={handleNewSocietyChange}
                            placeholder="Enter Address"
                        />
                    </div>
                    {/* Row for Country and State */}
                    <div className="flex mb-3">
                        <div className="w-1/2 pr-2">
                            <label className="block text-sm font-medium pb-2">Country*</label>
                            <input
                                type="text"
                                className="w-full p-1 text-sm border border-gray-300 rounded"
                                name="Country"
                                value={newSociety.Country}
                                onChange={handleNewSocietyChange}
                                placeholder="Enter Country"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-sm font-medium pb-2">State*</label>
                            <input
                                type="text"
                                className="w-full p-1 text-sm border border-gray-300 rounded"
                                name="State"
                                value={newSociety.State}
                                onChange={handleNewSocietyChange}
                                placeholder="Enter State"
                            />
                        </div>
                    </div>
                    {/* Row for City and Zip Code */}
                    <div className="flex mb-5">
                        <div className="w-1/2 pr-2">
                            <label className="block text-sm font-medium pb-2">City*</label>
                            <input
                                type="text"
                                className="w-full p-1 text-sm border border-gray-300 rounded"
                                name="City"
                                value={newSociety.City}
                                onChange={handleNewSocietyChange}
                                placeholder="Enter City"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-sm font-medium pb-2">Zip Code*</label>
                            <input
                                type="text"
                                className="w-full p-1 text-sm border border-gray-300 rounded"
                                name="Zipcode"
                                value={newSociety.Zipcode}
                                onChange={handleNewSocietyChange}
                                placeholder="Enter Zip Code"
                            />
                        </div>
                    </div>
                    {/* Buttons for Cancel and Add Society */}
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="bg-gray-100 w-1/2 font-semibold text-gray-700 mr-2"
                            onClick={CloseCreatenewSociety}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-gray-100 w-1/2 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-500 hover:text-white text-black font-semibold py-1 rounded text-sm"
                            onClick={handleAddSociety}
                        >
                            Add Society
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateSociety;

