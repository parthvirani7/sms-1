import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CloseBtn from "../layout/CloseButton";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import Loding_Button from '../layout/Loding_Button';
import { PutExpense } from "../services/Api/api";

const EditExpensesModal = ({ Close, _id, lodData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState({
        Title: "",
        Description: "",
        Date: "",
        Amount: "",
        Bill: "",
    });
    

    useEffect(() => {
        Fdata();
    }, []);

    const Fdata = async () => {
        try {
            const response = await axios.put(`https://society-management-app-server.onrender.com/expenses/updateexpenses/${_id}`);
            const data = response.data;
            setExpenses({
                Title: data.Title || "",
                Description: data.Description || "",
                Date: data.Date || "",
                Amount: data.Amount || "",
                Bill: data.Bill,
            });
            
        } catch (error) {
            console.error("Error fetching expense data:", error);
        }
    };

    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue("Bill", expenses.Bill || [file]);
            setPreviewImage(file);
        }
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value);
        setExpenses((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const onSubmit = async (data) => {
        setLoading(true)
        PutExpense(_id, data, lodData, setPreviewImage, Close, setLoading)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-1/4 md:w-1/2 overflow-auto max-h-svh">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-lg font-semibold">Edit Expenses</h1>
                    <button
                        type="button"
                        className="text-gray-600 hover:text-gray-800 text-2xl"
                        onClick={Close}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Title */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="Title">
                                Title
                            </label>
                            <input type="text" id="Title"
                                {...register("Title", { required: "Title is required" })}
                                className={`w-full border ${errors.title ? "border-red-500" : "border-gray-300"
                                    } rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.title ? "focus:ring-red-500" : "focus:ring-indigo-300"
                                    }`}
                                onChange={handleInputChange}
                                value={expenses.Title}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="Description">
                                Description
                            </label>
                            <textarea
                                id="Description"
                                {...register("Description", {
                                    required: "Description is required",
                                    minLength: {
                                        message: "Description must be at least 10 characters long",
                                    },
                                })}
                                className={`w-full border ${errors.description
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.description
                                        ? "focus:ring-red-500"
                                        : "focus:ring-indigo-300"
                                    }`}
                                onChange={handleInputChange}
                                value={expenses.Description}
                            ></textarea>
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Date and Amount */}
                        <div className="flex">
                            {/* Date */}
                            <div className="mb-4 w-1/2">
                                <label
                                    className="block text-sm font-medium mb-2"
                                    htmlFor="Date"
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="Date"
                                    {...register("Date", { required: "Date is required" })}
                                    className={`border ${errors.date ? "border-red-500" : "border-gray-300"
                                        } rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.date ? "focus:ring-red-500" : "focus:ring-indigo-300"
                                        }`}
                                    onChange={handleInputChange}
                                    value={
                                        expenses?.Date
                                            ? new Date(expenses.Date)
                                                .toISOString()
                                                .slice(0, 10)
                                            : ""
                                    }
                                />
                                {errors.date && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.date.message}
                                    </p>
                                )}
                            </div>

                            {/* Amount */}
                            <div className="mb-4 w-1/2">
                                <label className="block text-sm font-medium mb-2" htmlFor="Amount">
                                    Amount
                                </label>
                                <input type="number" id="Amount"
                                    {...register("Amount", {
                                        required: "Amount is required",
                                        min: {
                                            value: 1,
                                            message: "Amount must be greater than 0",
                                        },
                                    })}
                                    className={`border ${errors.amount
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        } rounded-lg py-2 focus:outline-none focus:ring ${errors.amount
                                            ? "focus:ring-red-500"
                                            : "focus:ring-indigo-300"
                                        }`}
                                    onChange={handleInputChange}
                                    value={expenses.Amount}
                                />
                                {errors.amount && (
                                    <p className="mt-1 text-sm text-red-500"> {errors.amount.message} </p>
                                )}
                            </div>
                        </div>

                        {/* Upload Bill */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Bill <span className="text-red-500">*</span>
                            </label>
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 focus-within:border-blue-500 cursor-pointer"
                                onClick={handleFileClick}
                            >
                                <input type="file" {...register("Bill")} onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                                <div>
                                    {previewImage ? (

                                        <img src={URL.createObjectURL(previewImage)} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-md mb-2" />

                                    ) : expenses.Bill ? (

                                        <img src={expenses.Bill} alt="Existing Bill" className="mx-auto h-32 w-32 object-cover rounded-md mb-2" />

                                    ) : (
                                        <div className="flex justify-center mb-2">
                                            <BiImageAdd className="text-gray-400 text-4xl" />
                                        </div>
                                    )}
                                    <p className="text-blue-500 font-semibold"> Upload a file </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <CloseBtn type="button" Addclass="w-1/2" onClick={Close} CloseName="Cancel" />
                            <Loding_Button type="submit" Addclass="w-1/2" Btn_Name="Submit" loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditExpensesModal;
