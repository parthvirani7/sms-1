import React, { useState } from 'react'

const OpneResidence_Vacate = ({ setShowResidence_Vacate,setShowResidenceStatusOne }) => {
    const [wing, setWing] = useState('');
    const [unit, setUnit] = useState('');

    const handleSave = () => {
        setShowResidence_Vacate(false);
        setShowResidenceStatusOne(false)
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-4">Residence Status</h2>

                {/* Dropdown for Wing */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Wing</label>
                    <select
                        value={wing}
                        onChange={(e) => setWing(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Wing</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                {/* Dropdown for Unit */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Unit</label>
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Unit</option>
                        <option value="1001">1001</option>
                        <option value="1002">1002</option>
                        <option value="1003">1003</option>
                    </select>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        className="bg-gray-100 w-full py-2 mr-2 text-gray-700 font-semibold rounded"
                        onClick={() => setShowResidence_Vacate(false)}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="py-2 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-blue-800 hover:to-blue-700 transition duration-200"
                        onClick={handleSave}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OpneResidence_Vacate
