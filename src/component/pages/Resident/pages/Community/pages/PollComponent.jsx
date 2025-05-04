import React from 'react';
import { BiRadioCircle } from 'react-icons/bi';
import { FaRegEye, FaUsb } from 'react-icons/fa';
// Assuming a public path or a placeholder image.
import ProfileImage from '/images/Profile.png'; // Adjust path if needed.
import { FaUser } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';

const PollComponent = ({ polls }) => {
  return (
    <div className="p-2 bg-white">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {polls.map((poll) => {
          // Calculate progress for each option dynamically.
          const option1Votes = poll.option1Votes || 0;
          const option2Votes = poll.option2Votes || 0;
          const totalVotes = option1Votes + option2Votes;
          const option1Percentage = totalVotes ? (option1Votes / totalVotes) * 100 : 90;
          const option2Percentage = totalVotes ? (option2Votes / totalVotes) * 100 : 10;

          return (
            <div
              key={poll.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border"
                  />
                  <div className="ml-4">
                    <h5 className="text-lg font-bold text-blue-500">{poll.author || "User"}</h5>
                    <p className="text-sm text-gray-500">{poll.pollType}</p>
                  </div>
                </div>
                <div className="flex items-center text-white bg-blue-500 p-2 rounded-full">
                  <FaRegEye className="mr-2" />
                  <span className="font-bold text-sm">{poll.views || 0}</span>
                </div>
              </div>
              <hr className="mt-4" />
              <h3 className="mt-4 text-lg font-semibold text-gray-800">{poll.title}</h3>
              <div className="mt-2 text-sm text-blue-500 font-medium flex items-center">
                <BiRadioCircle className="mr-2" />
                <span>Select one or more</span>
              </div>
              <div className="pt-1">
                <span className='flex  justify-end -mb-4'>  <BsPersonCircle />   <BsPersonCircle />   </span>
                <div className="mt-4">
                  {/* Option 1 */}
                  <div className="mb-2">
                    <label className="text-gray-700">
                      <input
                        type="radio"
                        name={`poll-${poll.id}`}
                        className="mr-2"
                      />
                      {poll.option1} ({option1Votes})
                    </label>
                    <div
                      className="bg-green-500 h-2 rounded-full text-center text-white text-xs"
                      style={{ width: `${option1Percentage}%` }}
                    >
                      {/* {option1Percentage.toFixed(0)}% */}
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div className="mb-2">
                    <label className="text-gray-700">
                      <input
                        type="radio"
                        name={`poll-${poll.id}`}
                        className="mr-2"
                      />
                      {poll.option2} ({option2Votes})
                    </label>
                    <div
                      className="bg-red-500 h-4 rounded-full text-center text-white text-xs"
                      style={{ width: `${option2Percentage}%` }}
                    >
                      {/* {option2Percentage.toFixed(0)}% */}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4 text-right">
                {poll.createdAt}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollComponent;
