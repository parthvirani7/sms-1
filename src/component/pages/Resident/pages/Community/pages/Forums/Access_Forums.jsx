import React, { useState } from 'react';
import Sidebar from '../../../../layout/Sidebar';
import Header from '../../../../layout/Header';
import { FaVideo, FaPhone, FaEllipsisV, FaSmile, FaPaperclip, FaMicrophone } from 'react-icons/fa';
import useSidbarTogal from '../../../../../../layout/useSidbarTogal';

const Access_Forums = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [data, setdata] = useState(280);
  const [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({setdata, setget, isOpen})

  const chats = [
    { name: 'Michael John', message: 'Hi, John! How are you?', time: '10:27', unread: 0 ,imgur: ''},
    { name: 'Elizabeth Sarah', message: 'Thank you for your order!', time: '9:20', unread: 0 },
    { name: 'Jenny Wilson', message: 'Hello, Jenny', time: '7:00', unread: 7 },
    { name: 'Arlene McCoy', message: 'Typing...', time: '9:20', unread: 0 },
    { name: 'Esther Howard', message: 'Hello, Esther', time: '10:27', unread: 0 },
    { name: 'Cody Fisher', message: 'Thank you for your order!', time: '7:00', unread: 0 },
  ];

  const messages = [
    { content: 'Hi there, How are you?', sender: 'Arlene McCoy', time: '9:00 PM', self: false },
    { content: 'Waiting for your reply. I have to go back soon.', sender: 'Arlene McCoy', time: '9:22', self: false },
    { content: 'Hi, I am coming there in a few minutes. Please wait!', time: '9:30', self: true },
    { content: '../../../../../../../../public/Screenshot_2024-11-30_075522-removebg-preview_1.ico', type: 'image', time: '9:45', self: false },
    { content: 'PDF, 2.3 MB', type: 'file', time: '10:00', self: true },
  ];

  return (
    <div className="bg-[#f0f5fb] h-screen flex">
      {/* Sidebar */}
      <Sidebar toggleNav={toggleNav} data={data} />
      
      <div id="main" className={`ml-[${getdata}px] max-[426px]:ml-0 w-full`}>
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>

        <div className="flex flex-col md:flex-row flex-1 h-screen w-full bg-gray-100 p-2 md:p-4 rounded-lg border-spacing-2">
  {/* Left Sidebar */}
  <div className="w-full md:w-1/4 bg-white border-r p-4 rounded-lg max-[726p]:ml-0   overflow-hidden ">
    <h2 className="text-xl md:text-2xl font-bold mb-4">Chat</h2>
    <input
      type="text"
      placeholder="Search Here"
      className="w-full p-2 mb-4 border rounded-full focus:outline-none"
    />
    <div className="space-y-4 overflow-y-auto max-h-[65vh] md:max-h-[85vh]">
      {chats.map((chat, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <h3 className="font-bold text-sm md:text-base">{chat.name}</h3>
              <p className="text-xs md:text-sm text-gray-500 truncate">
                {chat.message}
              </p>
            </div>
          </div>
          <span className="text-xs text-gray-500">{chat.time}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Right Chat Window */}
  <div className="flex-1 flex flex-col bg-white p-4 rounded-lg max-[726px]:hide">
    {/* Chat Header */}
    <div className="flex items-center justify-between border-b pb-3 mb-4">
      <div className="flex items-center space-x-3">
        <img
          src=" https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770800/shfpe3pccvr5qrpuldzh.pn"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-lg md:text-xl font-bold">
          Arlene McCoy (A/1001)
        </h2>
      </div>
      <div className="flex space-x-4">
        <FaVideo className="text-gray-500 hover:text-blue-500 cursor-pointer" />
        <FaPhone className="text-gray-500 hover:text-blue-500 cursor-pointer" />
        <FaEllipsisV className="text-gray-500 hover:text-blue-500 cursor-pointer" />
      </div>
    </div>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
              msg.self
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.type === "image" ? (
              <img
                src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770800/bc7fyacmra9fa6zjudqg.jpg"
                alt="chat-content"
                className="rounded-lg w-full"
              />
            ) : msg.type === "file" ? (
              <div className="flex items-center space-x-2">
                <div className="bg-red-500 p-2 rounded text-white">PDF</div>
                <p>{msg.content}</p>
              </div>
            ) : (
              <p className="break-words">{msg.content}</p>
            )}
          </div>
          <div className="block text-xs mt-2 text-gray-300">{msg.time}</div>
        </div>
      ))}
    </div>

    {/* Message Input */}
    <div className="flex items-center space-x-4 mt-4">
      <FaSmile className="text-gray-300 hover:text-blue-500 cursor-pointer" />
      <FaPaperclip className="text-gray-500 hover:text-blue-500 cursor-pointer" />
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-full focus:outline-none"
      />
      <FaMicrophone className="text-blue-500 cursor-pointer" />
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default Access_Forums;
