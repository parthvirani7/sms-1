import React, { useState } from 'react';
import Sidebar from '../../../../layout/Sidebar';
import Header from '../../../../layout/Header';
import { FaUserCircle, FaRegEye, FaRegUserCircle } from 'react-icons/fa';
import { RiCheckDoubleFill, RiCheckFill } from 'react-icons/ri';
import { FiMoreVertical } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';

const Communities_Discussion = () => {
  const [data, setdata] = useState(280);
  const [getdata, setget] = useState(280);

  function openNav() {
    setdata(280);
    setget(280);
  }
  function closeNav() {
    setdata(0);
    setget(0);
  }

  const questions = [
    {
      id: 1,
      votes: 0,
      answers: 1,
      views: 20,
      question: 'What is the capital of France?',
      dummyText:
        'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!',
    },
    {
      id: 2,
      votes: 3,
      answers: 0,
      views: 20,
      question: 'What is the capital of France?',
      dummyText:
        'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!',
    }, {
      id: 1,
      votes: 0,
      answers: 1,
      views: 20,
      question: 'What is the capital of France?',
      dummyText:
        'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!',
    },
    {
      id: 2,
      votes: 3,
      answers: 0,
      views: 20,
      question: 'What is the capital of France?',
      dummyText:
        'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!',
    }, {
      id: 1,
      votes: 0,
      answers: 1,
      views: 20,
      question: 'What is the capital of France?',
      dummyText:
        'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!',
    },
    {
      id: 2,
      votes: 3,
      answers: 0,
      views: 20,
      question: 'What is the capital of France?',
      dummyText:
        'Feel free to let me know if you need more examples or if there\'s anything specific you\'d like to include in your dummy content!',
    },


  ];

  const chats = [
    { name: 'Michael John', message: 'Hi, John! How are you doing?', time: '10:27', status: 'read', online: true },
    { name: 'Jenny Wilson', message: 'Hello, Jenny', time: '7:00', status: 'unread', online: false },
    { name: 'Community', message: 'Typing...', time: '9:20', status: 'typing', online: true },
    { name: 'Esther Howard', message: 'Hello, Esther', time: '10:27', status: 'unread', online: true },
    { name: 'Cody Fisher', message: 'Thank you for your order!', time: '7:00', status: 'read', online: false },
  ];

  return (
    <div className="bg-[#f0f5fb] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 bg-white shadow-lg ${data === 280 ? 'w-64' : 'w-0'
          } md:w-64`}
      >
        <Sidebar closeNav={closeNav} data={data} />
      </div>

      {/* Main Content */}
      <div
        id="main"
        className={`transition-all duration-300 flex-grow ${data === 280 ? 'ml-[280px]' : 'ml-0'} md:ml-64`}
      >
        <Header openNav={openNav} />

        <div className="bg-gray-100 p-4 md:p-10">
          <div className="flex flex-col md:flex-row max-w-full mx-auto bg-white shadow-lg rounded-lg h-[80vh]">
            {/* Scrollable Sidebar */}
            <div className="w-full md:w-1/4 p-4 border-b md:border-r overflow-y-auto h-full">
              <h2 className="text-xl font-bold mb-4">Chat</h2>
              <input
                type="text"
                placeholder="Search Here"
                className="w-full p-2 mb-4 border rounded-lg"
              />
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 mb-2 rounded-lg hover:bg-gray-200 cursor-pointer ${chat.status === 'typing' ? 'bg-white' : ''
                    }`}
                >
                  <img
                    src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770800/bc7fyacmra9fa6zjudqg.jpg"
                    alt="Profile"
                    className="w-10 h-10 my-3 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-lg font-semibold  flex items-center">
                      {chat.name}
                      <span
                        className={`ml-2 w-3 h-3 rounded-full ${chat.online ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        title={chat.online ? 'Online' : 'Offline'}
                      />
                    </p>
                    <p
                      className={`text-sm  ${chat.status === 'unread' ? 'text-gray-700 font-bold' : 'text-gray-500'
                        }`}
                    >
                      {chat.message}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-gray-400">{chat.time}</p>
                    {chat.status === 'read' && <RiCheckDoubleFill className="text-blue-500 inline-block" />}
                    {chat.status === 'unread' && <RiCheckFill className="text-gray-500 inline-block" />}
                  </div>
                </div>
              ))}
            </div>


            <div className="w-full md:w-3/4 p-4 overflow-y-auto h-full">
              <div className="bg-white p-4  border-b-2 flex items-center  mb-2 justify-between">

                <div className="flex items-center">
                  <FaRegUserCircle size={40} className="text-gray-400" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">Community</p>
                    <p className="text-xs text-gray-500">9:00 PM</p>
                  </div>
                </div>


                <div className="flex items-center space-x-4">
                  <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                    Ask Question
                  </button>
                  <FiMoreVertical className="text-gray-500 cursor-pointer" size={24} />
                </div>
              </div>
              <div className="bg-slate-100 shadow-lg rounded-lg p-5">
                {questions.map((q) => (
                  <div key={q.id} className="border-b border-gray-300 p-4 flex items-start gap-4">
                    <div className="flex flex-col items-center mt-2">
                      <span className="text-sm text-gray-600">{q.votes} Votes</span>
                      <span className="text-sm text-gray-600">{q.answers} Answers</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{q.question}</h3>
                      <p className="text-sm text-gray-600">{q.dummyText}</p>
                    </div>
                    <div className="flex items-center bg-white p-2 rounded-full">
                      <FaRegEye className="mr-1" /> {q.views}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow p-3 border rounded-l-lg focus:outline-none"
                />
                <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold  px-5 py-4 rounded-r-lg w-20 md:w-auto flex "> <IoMdSend className='mr-1 mt-1' /> Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communities_Discussion;
