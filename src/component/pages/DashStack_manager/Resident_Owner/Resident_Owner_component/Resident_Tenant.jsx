import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Resident_Tenant = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        email: '',
        age: '',
        gender: '',
        wing: '',
        unit: '',
        relation: '',
        ResidentStatus:'Tenant',
        photo: null,
        members: [{ fullName: '', phone: '', email: '', age: '', gender: '', relation: '' }],
        vehicles: [{ type: 'Two Wheeler', name: '', number: '' }],
        // documents: {
            aadhaarFront: null,
            aadhaarBack: null,
            addressProof: null,
            rentAgreement: null,
        // },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prevData) => ({
                ...prevData,
                photo: file,
            }));
        }
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...formData.members];
        updatedMembers[index][field] = value;
        setFormData((prevData) => ({
            ...prevData,
            members: updatedMembers,
        }));
    };

    const handleVehicleChange = (index, field, value) => {
        const updatedVehicles = [...formData.vehicles];
        updatedVehicles[index][field] = value;
        setFormData((prevData) => ({
            ...prevData,
            vehicles: updatedVehicles,
        }));
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            // documents: {
                // ...prevData.documents,
                [fileType]: file,
            // },
        }));
    };

    const addMember = () => {
        setFormData((prevData) => ({
            ...prevData,
            members: [...prevData.members, { fullName: '', phone: '', email: '', age: '', gender: '', relation: '' }],
        }));
    };

    const addVehicle = () => {
        setFormData((prevData) => ({
            ...prevData,
            vehicles: [...prevData.vehicles, { type: 'Two Wheeler', name: '', number: '' }],
        }));
    };

    const handleSubmit = () => {
        console.log('Form Submission Data:', formData);
        PostSumdata(formData);
    };
    return (
        <div>
            <div className="bg-white mb-6 p-6 flex-col rounded-lg shadow">
                <div className="w-full flex max-[425px]:flex-col">
                    <div className="text-center pr-5 max-[425px]:flex-col max-[425px]:flex max-[425px]:items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                            {formData.photo ? (
                                <img
                                    src={URL.createObjectURL(formData.photo)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-xl">+</span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <button className="mt-2 text-blue-500">Add Photo</button>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-md w-full"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-md w-full"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-4">
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-md w-full"
                                required
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-md w-full"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                type="text"
                                name="wing"
                                placeholder="Wing"
                                value={formData.wing}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-md w-full"
                                required
                            />
                            <input
                                type="text"
                                name="unit"
                                placeholder="Unit"
                                value={formData.unit}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-md w-full"
                                required
                            />
                            <input
                                type="text"
                                name="relation"
                                placeholder="Relation"
                                value={formData.relation}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'aadhaarFront')}
                    />
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'aadhaarBack')}
                    />
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'addressProof')}
                    />
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 'rentAgreement')}
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="flex justify-between items-center px-5 py-2">
                    <p>Members</p>
                    <button onClick={addMember} className="text-blue-500">Add Member</button>
                </div>
                {formData.members.map((member, index) => (
                    <div key={index} className="grid grid-cols-6 md:grid-cols-9 gap-4 mb-4 px-5 pb-5">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={member.fullName}
                            onChange={(e) => handleMemberChange(index, "fullName", e.target.value)}
                            className="p-2 border col-span-2 border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={member.phone}
                            onChange={(e) => handleMemberChange(index, "phone", e.target.value)}
                            className="p-2 border col-span-2 border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={member.email}
                            onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                            className="p-2 border col-span-2 border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={member.age}
                            onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                        <select
                            value={member.gender}
                            onChange={(e) => handleMemberChange(index, "gender", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Relation"
                            value={member.relation}
                            onChange={(e) => handleMemberChange(index, "relation", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                ))}

            </div>

            <div className="bg-white rounded-lg shadow mt-4">
                <div className="flex justify-between items-center px-5 py-2">
                    <p>Vehicles</p>
                    <button onClick={addVehicle} className="text-blue-500">Add Vehicle</button>
                </div>
                {formData.vehicles.map((vehicle, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-4 px-5 pb-5">
                        <select
                            value={vehicle.type}
                            onChange={(e) => handleVehicleChange(index, "type", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        >
                            <option value="Two Wheeler">Two Wheeler</option>
                            <option value="Four Wheeler">Four Wheeler</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Vehicle Name"
                            value={vehicle.name}
                            onChange={(e) => handleVehicleChange(index, "name", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Vehicle Number"
                            value={vehicle.number}
                            onChange={(e) => handleVehicleChange(index, "number", e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                ))}

            </div>

            <div className="mt-4 flex justify-end">
                <Link to={"/manager/resident_management"} className="px-4 py-2 rounded-lg border-2 bg-white mr-3">Cancel</Link>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Create</button>
            </div>
        </div>
    )
}

export default Resident_Tenant
