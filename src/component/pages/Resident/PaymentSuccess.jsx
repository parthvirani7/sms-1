import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 to-green-400 text-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful! 🎉</h1>
        <p className="text-lg mb-6">Thank you for your payment. Your transaction has been successfully processed.</p>
        <a
          href="/resident/home"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition-all duration-200"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
