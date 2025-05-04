import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Managerverifyotp, ResendOtp } from '../services/Api/api';
import { useNavigate } from 'react-router-dom';

const Forgot_password = () => {
    const [timeLeft, setTimeLeft] = useState(20);
    const [resendAvailable, setResendAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const { handleSubmit, control, reset, watch, setValue, formState: { errors } } = useForm({
        defaultValues: { otp: new Array(4).fill("") }
    });

    const otp = watch("otp");

    useEffect(() => {
        if (timeLeft > 0) {
            const intervalId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            setResendAvailable(true);
        }
    }, [timeLeft]);

    // Handle resend OTP
    const resendOTP = () => {
        setTimeLeft(20);
        setResendAvailable(false);
        reset({ otp: new Array(4).fill("") });
        const Emails = localStorage.getItem('Email');
        const Email = Emails.replace(/^"(.*)"$/, '$1');
        const datas = { Email }
        ResendOtp(datas)
    };
    
    // Form submission handler
    const onSubmit = (data) => {
        const otp = data.otp.join("");
        const Emails = localStorage.getItem('Email');
        const Email = Emails.replace(/^"(.*)"$/, '$1');
        const datas = { otp, Email }
        // console.log(datas);
        setLoading(true); 
        
        Managerverifyotp(datas, setLoginError, setLoading, navigate, reset);
    };

    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://i.ibb.co/wFVdCCjB/bgImage.jpg')", backgroundSize: '50%', backgroundPosition: '100%', backgroundRepeat: 'no-repeat' }}>
            <div className="flex w-full h-full">
                {/* Login Image Side */}
                <div className="hidden lg:flex w-1/2 bg-gray-100 flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold text-blue-600">Civic<span className="text-black">Nest</span></h1>
                    <div className="flex items-center justify-center">
                        <img className="mt-16 h-[110%]" src="https://i.ibb.co/CKcyXs9d/Chat-GPT-Image-Apr-23-2025-02-02-34-PM-removebg-preview.png" alt="Login" />
                    </div>
                </div>
                {/* Login Form Side */}
                <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 py-12 lg:py-0">
                    <h1 className="text-5xl font-bold text-blue-600 lg:hidden">Civic<span className="text-black">Nest</span></h1>
                    <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                        <h3 className="text-2xl mb-4">Enter OTP</h3>
                        <p className="text-gray-600 mb-6">Please enter the 4-digit code sent to your phone number.</p>

                        {/* OTP Input */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex justify-center mb-4">
                                {otp.map((_, index) => (
                                    <Controller
                                        key={index}
                                        name={`otp.${index}`}
                                        control={control}
                                        rules={{
                                            required: "This field is required",
                                            pattern: {
                                                value: /^[0-9]$/,
                                                message: "Enter a valid digit"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                id={`otp-input-${index}`}
                                                type="text"
                                                className={`w-12 h-12 text-2xl text-center border border-gray-300 rounded-md mx-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors?.otp?.[index] ? 'border-red-500' : ''}`}
                                                maxLength="1"
                                                onChange={(e) => {
                                                    setValue(`otp.${index}`, e.target.value);
                                                    if (e.target.value && index < 3) {
                                                        document.getElementById(`otp-input-${index + 1}`)?.focus();
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Backspace" && !otp[index]) {
                                                        const prevInput = document.getElementById(`otp-input-${index - 1}`);
                                                        if (prevInput) {
                                                            prevInput.focus();
                                                        }
                                                    }
                                                }}
                                                onFocus={(e) => e.target.select()}
                                            />
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Validation Errors */}
                            {errors.otp && (
                                <p className="text-red-500 text-sm text-center">Please fill out all fields correctly.</p>
                            )}


                            {/* Timer and Resend OTP */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-gray-500">
                                    <i className="bi bi-clock"></i>
                                    <span>{timeLeft > 0 ? `00:${timeLeft < 20 ? `0${timeLeft}` : timeLeft} sec` : "Time's up!"}</span>
                                </div>
                                <button
                                    type="button"
                                    className={`text-sm text-blue-500 ${!resendAvailable ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={resendOTP}
                                    disabled={!resendAvailable}
                                >
                                    Resend OTP
                                </button>
                            </div>

                            {loginError && <p className="text-red-500 text-sm mt-1 mb-2">{loginError}</p>}

                            {/* Verify Button */}
                            <div className="text-center">
                                <button type="submit" className={`bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white text-black font-semibold w-full py-2 rounded ${loading && 'opacity-50 cursor-not-allowed'}`} disabled={loading}>
                                    {loading ? 'Verifying...' : 'Verify'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgot_password;
