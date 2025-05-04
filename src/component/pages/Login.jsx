import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ManagerLogin } from '../services/Api/api';
import { useAuth } from '../services/Auth/auth';


const Login = () => {
    const { storetokenInLs } = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


    // User Login 
    const onSubmit = (data) => {
        setLoading(true);
        ManagerLogin(data, setLoginError, navigate, storetokenInLs, setLoading, reset)
    };

    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://i.ibb.co/wFVdCCjB/bgImage.jpg')", backgroundSize: '50%', backgroundPosition: '100%', backgroundRepeat: 'no-repeat' }}>
            <div className="flex w-full h-full">
                {/* Login Image Side */}
                <div className="hidden lg:flex w-1/2 bg-gray-100 flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold text-blue-600">Civic<span className="text-black">Nest</span></h1>
                    <div className="flex items-center justify-center"><img className="mt-16 h-[120%]" src="https://i.ibb.co/Pzbqrzwy/Civic-Nest-Society-Management-Made-Easy-removebg-preview-1.png" alt="Login" /></div>
                </div>
                {/* Login Form 0 */}
                <div className="flex flex-col w-full lg:w-1/2 items-center justify-center px-8 py-12 lg:py-0 ">
                    <h1 className="text-5xl max-[425px]:text-4xl font-bold text-blue-600 lg:hidden">Civic<span className="text-black">Nest</span></h1>
                    <form className="bg-white w-full max-w-md shadow-lg rounded-lg p-8 mt-8" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                        <div className="hidden max-[1023px]:flex items-center justify-center"><img className="h-44 max-[375px]:h-36 max-[320px]:h-28" src="https://i.ibb.co/Pzbqrzwy/Civic-Nest-Society-Management-Made-Easy-removebg-preview-1.png" alt="Login" /></div>
                        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                        <div className="mb-4">
                            <label className="font-semibold">Email or Phone Number*</label>
                            <input
                                type="text"
                                className="border rounded w-full py-2 px-3 mt-1"
                                placeholder="Enter Your Email or Phone Number"
                                {...register("Email", {
                                    required: "Email or phone number is required",
                                    pattern: {
                                        value: /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|^\d{10,15}$)$/i,
                                        message: "Enter a valid email address or phone number"
                                    }
                                })}
                                autoComplete="username"
                            />
                            {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>}
                        </div>

                        <label className="font-semibold">Password*</label>
                        <div className="flex items-center mb-4">
                            <input
                                type={passwordShown ? "text" : "password"}
                                className="border rounded w-full py-2 px-3 mt-1"
                                placeholder="Enter Password"
                                {...register("Password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 4,
                                        message: "Password must be at least 6 characters long"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Password cannot exceed 20 characters"
                                    }
                                })}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="text-gray-500 ml-2"
                                onClick={() => setPasswordShown(!passwordShown)}
                            >
                                {passwordShown ? '🙈' : '👁️'}
                            </button>
                        </div>
                        {errors.Password && <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>}
                        {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}

                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    {...register("rememberMe")}
                                    autoComplete="off"
                                />
                                Remember Me
                            </label>
                            <Link to="/forgot_password" className="text-blue-600 text-sm">Forgot Password?</Link>
                        </div>

                        <button type="submit" className={`bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white text-black font-semibold w-full py-2 rounded ${loading && 'opacity-50 cursor-progress'}`} disabled={loading}>
                            {loading ? 'Log In...' : 'Log In'}
                        </button>

                        <p className="text-center text-sm mt-4">Don’t have an account? <Link to="/registration" className="text-blue-600 font-semibold">Registration</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
