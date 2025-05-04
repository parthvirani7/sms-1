import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OpneResidence_Vacate from './OpneResidence_Vacate';

const OpenResidenceStatusModal = ({ setShowResidenceStatus }) => {

    const navigate = useNavigate();

    const [editComplaint, setEditComplaint] = useState({
        Status: ''
    });

    useEffect(() => {
        editdata();
    }, []);

    const editdata = async () => {
        try {
            const response = await axios.get(`https://civicnest-backend.onrender.com/user`);
            setEditComplaint(response.data);
        } catch (error) {
            console.error('Error fetching complaint data:', error);
        }
    };

    const handleInputChange = (e) => {
        setEditComplaint({ ...editComplaint, [e.target.name]: e.target.value });
    };

    const [showResidenceVacate, setshowResidenceVacate] = useState(false);

    const [Occupied, setOccupied] = useState(false)

const handleSave = async () => {
    try {
        if (editComplaint.Status === "Occupied") {
            navigate('/manager/resident_management/resident_owner_Form');
            localStorage.setItem("UnitStatus", editComplaint.Status)
            setOccupied(true)
            setShowResidenceStatus(false);
        }else if (editComplaint.Status === "Vacate") {
            localStorage.setItem("UnitStatus", editComplaint.Status)
            setshowResidenceVacate(true);
        }
    } catch (error) {
        console.error('Error saving complaint:', error);
    }
};

useEffect(() => {
    if (showResidenceVacate) {
        opnenew();
    }
}, [showResidenceVacate]);

const opnenew = () => {
    console.log("Opening ResidenceVacate...");
};

const CloseResidenceVacate = () => {
    setshowResidenceVacate(false);
};


    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 p-6">
                <h2 className="text-xl font-semibold mb-4">Residence Status</h2>

                {/* Radio Buttons for Occupied/Vacate */}
                <div className="flex gap-4 mb-4">
                    <label className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${editComplaint.Status === "Occupied" ? 'border-2 border-blue-500' : 'border border-gray-300'}`}>
                        <input
                            type="radio"
                            name="Status"
                            value="Occupied"
                            checked={editComplaint.Status === "Occupied"}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <span className="text-lg font-medium">Occupied</span>
                    </label>
                    <label className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${editComplaint.Status === "Vacate" ? 'border-2 border-blue-500' : 'border border-gray-300'}`}>
                        <input
                            type="radio"
                            name="Status"
                            value="Vacate"
                            checked={editComplaint.Status === "Vacate"}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <span className="text-lg font-medium">Vacate</span>
                    </label>
                </div>

                {showResidenceVacate && (
                    <OpneResidence_Vacate
                        setShowResidence_Vacate={CloseResidenceVacate}
                        setShowResidenceStatusOne={setShowResidenceStatus}
                    />
                )}

                {/* Checkbox */}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="agree"
                        className="mr-2 w-5 h-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="agree" className="text-sm text-gray-600">By submitting, you agree to select Occupied</label>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        className="bg-gray-100 w-full py-2 mr-2 text-gray-700 font-semibold rounded"
                        onClick={setShowResidenceStatus}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="py-2 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-blue-800 hover:to-blue-700 transition duration-200"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OpenResidenceStatusModal
