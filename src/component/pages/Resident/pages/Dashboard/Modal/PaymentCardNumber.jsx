import React from 'react'
import { useForm } from "react-hook-form";
import Button from '../../../../../layout/Button_gradient'

const PaymentCardNumber = ({ close1, close2, close3 }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted Successfully:", data);
    close1()
    close2()
    close3()
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mx-auto relative z-60">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Card Name Field */}
          <div className="mb-4">
            <label htmlFor="cardName" className="block text-sm font-medium mb-1">
              Card Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardName"
              {...register("cardName", {
                required: "Card name is required",
              })}
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${errors.cardName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardName.message}</p>
            )}
          </div>

          {/* Card Number Field */}
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
              Card Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardNumber"
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: "Card number must be 16 digits",
                },
              })}
              placeholder="1234 5678 8745 5212"
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${errors.cardNumber ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          {/* Expiry Date and CVV Fields */}
          <div className="flex gap-4 mb-4">
            {/* Expiry Date Field */}
            <div className="w-1/2">
              <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                Expiry Date<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="expiryDate"
                {...register("expiryDate", {
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Invalid expiry date format (MM/YY)",
                  },
                })}
                placeholder="MM/YY"
                className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${errors.expiryDate ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
              )}
            </div>

            {/* CVV Field */}
            <div className="w-1/2">
              <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                CVV<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cvv"
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: "CVV must be 3 digits",
                  },
                })}
                placeholder="123"
                className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${errors.cvv ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={close3}
              className="bg-white border rounded-lg w-1/2 font-semibold text-gray-700 py-2 mr-2 hover:bg-[#f0f5fb]"
            >
              Cancel
            </button>
            <Button type="submit" Btn_Name="Pay Now" Addclass='w-1/2' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentCardNumber
