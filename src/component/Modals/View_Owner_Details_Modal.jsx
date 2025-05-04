import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetResidentId } from '../services/Api/api';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaFileAlt } from 'react-icons/fa';

const View_Owner_Details_Modal = ({ _id, View_Owner_Details, closeModal }) => {
  const [fetchedImageSize, setFetchedImageSize] = useState(null);
  const [fetchedPdfSize, setFetchedPdfSize] = useState(null);
  const [data, setData] = useState(null); // Set data as an object, not an array

  useEffect(() => {
    if (_id) {
      fetchData();
    }
  }, [_id]);

  const fetchData = () => {
    GetResidentId(_id, setData);
  };

  const fetchImageSize = async (url) => {
    try {
      const response = await axios.head(url);
      const contentLength = response.headers['content-length'];
      if (contentLength) {
        setFetchedImageSize((contentLength / (1024 * 1024)).toFixed(2) + " MB");
      }
    } catch (error) {
      console.error("Error fetching image size:", error);
    }
  };

  const fetchPdfSize = async (url) => {
    try {
      const response = await axios.head(url);
      const contentLength = response.headers['content-length'];
      if (contentLength) {
        setFetchedPdfSize((contentLength / (1024 * 1024)).toFixed(2) + " MB");
      }
    } catch (error) {
      console.error("Error fetching PDF size:", error);
    }
  };

  useEffect(() => {
    if (data) {
      if (data.residentphoto) {
        fetchImageSize(data.residentphoto);
      }
      if (data.AadharCard_FrontSide) {
        fetchPdfSize(data.AadharCard_FrontSide);
      }
    }
  }, [data]);

  return (
    <div>
      {View_Owner_Details && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
          onClick={closeModal}
        ></div>
      )}

      {/* Offcanvas component */}
      <div
        className={`fixed top-0 right-0 w-80 h-full overflow-y-auto bg-white shadow-lg z-50 transform transition-transform duration-300 ${View_Owner_Details ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h5 className="text-lg font-semibold">View Owner Details</h5>
          <button
            onClick={closeModal}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {data ? (
            <div>
              <div className="text-center flex items-center justify-center mb-3">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                  <img
                    src={data.residentphoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xl text-center font-medium">{data.Fullname}</p>
                <p className="text-md text-center text-[#4f4f4f]">{data.Email}</p>
              </div>
              <div className="m-2 mb-5 rounded-lg shadow-md">
                <div className="flex justify-between px-3 py-2 border-b">
                  <p className="text-sm font-medium">Wing</p>
                  <p className="text-sm">{data.Wing}</p>
                </div>
                <div className="flex justify-between px-3 py-2 border-b">
                  <p className="text-sm font-medium">Unit</p>
                  <p className="text-sm">{data.Unit}</p>
                </div>
                <div className="flex justify-between px-3 py-2 border-b">
                  <p className="text-sm font-medium">Age</p>
                  <p className="text-sm">{data.Age}</p>
                </div>
                <div className="flex justify-between px-3 py-2">
                  <p className="text-sm font-medium">Gender</p>
                  <p className="text-sm">{data.Gender}</p>
                </div>
              </div>
              <div className="m-2 rounded-lg shadow-md">
                <div className="px-3 py-2">
                  <p>Document</p>
                  <div className="mb-3">
                    <div className="space-y-3 flex-1 max-w-sm ">
                      <div className="flex items-center gap-3 p-3 py-2 bg-gray-50 border rounded-md max-[425px]:w-[14px]">
                        <FaFileAlt className="text-blue-500" />
                        <div>
                          <p className='text-sm'>Adharcard Front Side.JPG</p>
                          <p className="text-xs text-gray-500">{fetchedPdfSize}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 py-2 bg-gray-50 border rounded-md max-[425px]:w-[14px]">
                        <FaFileAlt className="text-blue-500" />
                        <div>
                          <p className='text-sm'>Address Proof Front Side.PDF</p>
                          <p className="text-xs text-gray-500">{fetchedImageSize}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-md relative mx-2">
                <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
                  <h2 className="text-lg font-semibold text-white">
                    Member Counting
                  </h2>
                  <div className="relative">
                    <button className="text-blue-500 bg-white px-2 rounded-md focus:outline-none">
                      {data.members?.length || "0"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-4 p-3 bg-[#f6f6f6]">

                  {data.members.map((member, index) => (
                    <div key={index} className='bg-[#fff] rounded-lg p-2'>
                      <span className="ml-1 text-base font-semibold text-black flex justify-between border-b py-1">
                        <p className="text-sm font-semibold flex justify-between">
                          First Name
                        </p>
                        <p className='text-sm text-[#4f4f4f]'>
                          {member.fullName}
                        </p>
                      </span>
                      <span className="ml-1 text-base font-semibold text-black flex justify-between border-b py-1">
                        <p className="text-sm font-semibold flex justify-between">
                          Phone No
                        </p>
                        <p className='text-sm text-[#4f4f4f]'>
                          {member.phone}
                        </p>
                      </span>
                      <span className="ml-1 text-base font-semibold text-black flex justify-between border-b py-1">
                        <p className="text-sm font-semibold flex justify-between">
                          Age
                        </p>
                        <p className='text-sm text-[#4f4f4f]'>
                          {member.age}
                        </p>
                      </span>
                      <span className="ml-1 text-base font-semibold text-black flex justify-between border-b py-1">
                        <p className="text-sm font-semibold flex justify-between">
                          Gender
                        </p>
                        <p className='text-sm text-[#4f4f4f]'>
                          {member.gender}
                        </p>
                      </span>
                      <span className="ml-1 text-base font-semibold text-black flex justify-between py-1">
                        <p className="text-sm font-semibold flex justify-between">
                          Relation
                        </p>
                        <p className='text-sm text-[#4f4f4f]'>
                          {member.Relation}
                        </p>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View_Owner_Details_Modal;
