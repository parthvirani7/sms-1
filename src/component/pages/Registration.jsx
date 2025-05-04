import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CreateSociety from "../Modals/CreateSociety";
import { GetCreateSocirty, UserDataRegistration } from "../services/Api/api";

const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [societies, setSocieties] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [RegistrationError, setRegistrationError] = useState("");

  const OpneCreatenewSociety = () => {
    setShowModal(true);
  };
  const CloseCreatenewSociety = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    GetCreateSocirty(setSocieties);
  };

  const onSubmit = (data) => {
    if (data.Password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...registrationData } = data;
    UserDataRegistration(
      registrationData,
      setRegistrationError,
      reset,
      navigate
    );
  };
  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/wFVdCCjB/bgImage.jpg')",
        backgroundSize: "50%",
        backgroundPosition: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hidden lg:flex flex-col w-1/2 bg-gray-100 justify-center items-center">
        <h1 className="text-5xl font-bold text-blue-500">
          Civic<span className="text-black">Nest</span>
        </h1>
        <div className="flex items-center justify-center">
          <img
            src="https://i.ibb.co/PvZb38HP/ad7cc0b0-1bd5-44f9-943e-c7b12c53876f-removebg-preview.png"
            alt="Registration"
            className="mt-10 h-[110%] object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center p-6">
        <h1 className="text-5xl font-bold text-blue-600 lg:hidden mb-3">
          Civic<span className="text-black">Nest</span>
        </h1>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Registration
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Fields */}
            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  First Name<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("Firstname", { required: true })}
                  className="w-full p-1 text-sm border border-gray-300 rounded"
                  placeholder="Enter First Name"
                />
                {errors.Firstname && (
                  <p className="text-red-600 text-xs">
                    First name is required.
                  </p>
                )}
              </div>
              <div className="w-full lg:w-1/2 px-2">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  Last Name<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("Lastname", { required: true })}
                  className="w-full p-1 text-sm border border-gray-300 rounded"
                  placeholder="Enter Last Name"
                />
                {errors.Lastname && (
                  <p className="text-red-600 text-xs">Last name is required.</p>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  Email Address<span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  {...register("Email", { required: true })}
                  className="w-full p-1 text-sm border border-gray-300 rounded"
                  placeholder="Enter Email Address"
                />
                {errors.Email && (
                  <p className="text-red-600 text-xs">Email is required.</p>
                )}
              </div>
              <div className="w-full lg:w-1/2 px-2">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  Phone Number<span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  {...register("Number", {
                    required: "This field is required",
                    pattern: {
                      value: /^\d{10,15}$/, // Adjusted regex to only accept digits (10 to 15)
                      message:
                        "Please enter a valid phone number with 10 to 15 digits",
                    },
                  })}
                  className="w-full p-1 text-sm border border-gray-300 rounded"
                  placeholder="Enter Phone Number"
                />
                {errors.Number && (
                  <p className="text-red-600 text-xs">
                    Phone number is required.
                  </p>
                )}
              </div>
            </div>

            {/* Location Fields */}
            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-1/3 px-2 mb-4 lg:mb-0">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  Country<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("Country", { required: true })}
                  className="w-full p-1 text-sm border border-gray-300 rounded"
                  placeholder="Enter Country"
                />
                {errors.Country && (
                  <p className="text-red-600 text-xs">Country is required.</p>
                )}
              </div>
              <div className="w-full lg:w-1/3 px-2 mb-4 lg:mb-0">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  State<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("State", { required: true })}
                  className="w-full p-1 text-sm border border-gray-300 rounded"
                  placeholder="Enter State"
                />
                {errors.State && (
                  <p className="text-red-600 text-xs">State is required.</p>
                )}
              </div>
              <div className="w-full lg:w-1/3 px-2">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  City<span className="text-red-600">*</span>
                </label>
                <input
                  {...register("City", { required: true })}
                  className="w-full p-1 text-sm border border-gray-300 rounded"
                  placeholder="Enter City"
                  autoComplete="address-level2"
                />
                {errors.City && (
                  <p className="text-red-600 text-xs">City is required.</p>
                )}
              </div>
            </div>

            {/* Society Selection */}
            <div className="mb-4 px-2">
              <label className="block text-gray-700 font-semibold mb-1 text-sm">
                Select Society<span className="text-red-600">*</span>
              </label>
              <select
                {...register("societyid", { required: true })}
                className="w-full p-1 text-sm border border-gray-300 rounded"
              >
                <option value="">Select Society</option>
                {societies.map((e, index) => (
                  <option key={index} value={e._id}>
                    {e.societyname}
                  </option>
                ))}
              </select>
              {errors.society && (
                <p className="text-red-600 text-xs">Society is required.</p>
              )}
              <button
                type="button"
                className="btn bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white text-black font-semibold w-full py-1 rounded text-sm mt-3"
                onClick={OpneCreatenewSociety}
              >
                Create Society
              </button>

              {showModal && (
                <CreateSociety
                  LodData={Fdata}
                  CloseCreatenewSociety={CloseCreatenewSociety}
                />
              )}
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  Password<span className="text-red-600">*</span>
                </label>
                <div className="flex">
                  <input
                    type={passwordShown ? "text" : "password"}
                    {...register("Password", { required: true })}
                    className="w-full p-1 text-sm border border-gray-300 rounded"
                    placeholder="Enter Password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="text-sm text-gray-500"
                    onClick={() => setPasswordShown(!passwordShown)}
                  >
                    {passwordShown ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.Password && (
                  <p className="text-red-600 text-xs">Password is required.</p>
                )}
              </div>
              <div className="w-full lg:w-1/2 px-2">
                <label className="block text-gray-700 font-semibold mb-1 text-sm">
                  Confirm Password<span className="text-red-600">*</span>
                </label>
                <div className="flex">
                  <input
                    type={confirmPasswordShown ? "text" : "password"}
                    {...register("confirmPassword", { required: true })}
                    className="w-full p-1 text-sm border border-gray-300 rounded"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="text-sm text-gray-500"
                    onClick={() =>
                      setConfirmPasswordShown(!confirmPasswordShown)
                    }
                  >
                    {confirmPasswordShown ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-xs">
                    Confirm password is required.
                  </p>
                )}
              </div>
            </div>
            {RegistrationError && (
              <p className="text-red-500 text-sm mt-1">{RegistrationError}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 hover:text-white text-black font-semibold w-full py-1 rounded text-sm"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
