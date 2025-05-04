import React, { useState, useEffect } from 'react';
import PollComponent from '../PollComponent';
import Sidebar from '../../../../layout/Sidebar';
import Header from '../../../../layout/Header';
import { GetNewPoll, GetOwnPoll, GetPreviousPoll } from '../../../../Api/api';
import CreatePoll from '../../Modal/CreatePoll';
import useSidbarTogal from '../../../../../../layout/useSidbarTogal';

const Polls = () => {
  
  const [isOpen, setIsOpen] = useState(true);
  const [data, setdata] = useState(280);
  const [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})
  
  const [pollType, setPollType] = useState('Own'); // Poll type selection state
  const [pollsData, setPollsData] = useState([]); // Data for displaying polls
  const [Create, setCreate] = useState(false); // Create poll modal state

  const openCreatePoll = () => setCreate(true);
  const closeCreatePoll = () => setCreate(false);

  // Format date to 'dd-mm-yyyy' (only date part, ignoring time)
  const formatDateToDDMMYYYY = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getFullYear()}`;
  };

  // Parse 'createdAt' field in 'dd/mm/yyyy h:mm AM/PM' format to Date object
  const parseCreatedAt = (createdAt) => {
    const [datePart, timePart] = createdAt.split(' ');

    const [day, month, year] = datePart.split('/');

    const formattedDate = `${month}/${day}/${year} ${timePart}`;

    return new Date(formattedDate);
  };

  // Fetch data based on poll type
  const Fdata = async () => {
    let data = [];
    const today = new Date();
    const formattedToday = formatDateToDDMMYYYY(today); // Today's date in 'dd-mm-yyyy' format

    try {
      if (pollType === 'Own') {
        data = await GetOwnPoll();
      } else if (pollType === 'New') {
        const newPolls = await GetNewPoll();

        // Debugging to check the data returned from the API
        console.log('Fetched New Polls:', newPolls);

        // Filter polls to show only those created today based on 'createdAt'
        data = newPolls.filter((poll) => {
          if (poll.createdAt) {
            const pollDate = parseCreatedAt(poll.createdAt); // Parse createdAt field to Date object
            const formattedPollDate = formatDateToDDMMYYYY(pollDate); // Format it to 'dd-mm-yyyy'
            return formattedPollDate === formattedToday; // Only show polls created today
          }
          return false; // Skip polls that don't have a valid createdAt field
        });

        console.log('New Polls (Today):', data); // Debugging
      } else if (pollType === 'Previous') {
        const previousPolls = await GetPreviousPoll();

        // Filter out today's polls from the previous polls
        data = previousPolls.filter((poll) => {
          if (poll.createdAt) {
            const pollDate = parseCreatedAt(poll.createdAt); // Parse createdAt field to Date object
            const formattedPollDate = formatDateToDDMMYYYY(pollDate); // Format it to 'dd-mm-yyyy'
            return formattedPollDate !== formattedToday; // Exclude today's polls
          }
          return true; // Include poll if no valid createdAt field
        });

        console.log('Previous Polls (Excluding Today):', data); // Debugging
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
    }

    setPollsData(data); // Update state with filtered data
  };

  useEffect(() => {
    Fdata(); // Fetch data whenever pollType changes
  }, [pollType]);

  return (
    <div className="bg-[#f0f5fb] h-screen">
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" style={{ marginLeft: getdata }}>
        <Header toggleNav={toggleNav} />
        <div className="p-6 bg-gray-100">
          <div className="flex space-x">
            {['Own', 'New', 'Previous'].map((type) => (
              <button
                key={type}
                onClick={() => setPollType(type)}
                className={`py-2 px-8 font-semibold text-center rounded-t-lg border-b-2 border-b-blue-500 ${
                  pollType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                {type} Poll
              </button>
            ))}
          </div>
          <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Polls</h2>
              <button
                onClick={openCreatePoll}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Create Poll
              </button>
              {Create && (
                <CreatePoll
                  Fdata={Fdata} // Refresh data after creating a poll
                  closeCreatePoll={closeCreatePoll}
                />
              )}
            </div>
            <PollComponent polls={pollsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Polls;
