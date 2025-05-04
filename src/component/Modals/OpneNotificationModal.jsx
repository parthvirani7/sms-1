import React, { useEffect, useRef, useState } from 'react'
import { BiBell, BiCheck, BiX } from 'react-icons/bi';
import { IoIosNotifications } from 'react-icons/io';

const OpneNotificationModal = () => {
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Evelyn Harper (A-101)',
            message: 'Evelyn Harper gave a fund of ₹1000 for Navratri.',
            timestamp: '32 Minutes ago',
            type: 'payment',
            amount: 1000,
            status: 'pending',
        },
        {
            id: '2',
            title: 'Maintenance (A-101)',
            message: 'Evelyn Harper gave a Maintenance of ₹1000.',
            timestamp: '2 days ago',
            type: 'maintenance',
            amount: 1000,
            status: 'pending',
        },
        {
            id: '3',
            title: 'Ganesh Chaturthi (A-101)',
            message: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in OurResident.',
            timestamp: '2 days ago',
            type: 'event',
            amount: 1500,
            status: 'pending',
        },
    ]);

    // const [isOpen, setIsOpen] = useState(true);

    const handleAccept = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, status: 'accepted' } : notif
        ));
    };

    const handleDecline = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, status: 'declined' } : notif
        ));
    };

    const handleClearAll = () => {
        setNotifications([]);


    };
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsNotificationOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (


        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="border-2 border-[#d3d3d3] p-1 rounded-lg text-2xl hover:bg-[#d3d3d3]">
                <IoIosNotifications />
            </button>

            {isNotificationOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  max-[498px]:right-[-105px] max-[415px]:right-[-130px] max-[325px]:right-[-160px]"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-button"
                >
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-semibold">Notification</h2>
                                {notifications.length > 0 && (
                                    <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                                        {notifications.length}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                {notifications.length > 0 && (
                                    <button
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Clear all
                                    </button>
                                )}
                                <button >
                                    <BiX onClick={toggleDropdown} className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[32rem] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <div className="mx-auto w-32 h-32 mb-6">
                                        <img
                                            src="https://illustrations.popsy.co/gray/notification-bell.svg"
                                            alt="No notifications"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                        No notification yet!
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        We'll notify you when something arrives.
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className="p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === 'payment' ? 'bg-blue-100' :
                                                    notification.type === 'maintenance' ? 'bg-green-100' :
                                                        'bg-purple-100'
                                                    }`}>
                                                    <BiBell className={`h-5 w-5 ${notification.type === 'payment' ? 'text-blue-600' :
                                                        notification.type === 'maintenance' ? 'text-green-600' :
                                                            'text-purple-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-medium text-gray-900">
                                                            {notification.title}
                                                        </h3>
                                                        <span className="text-xs text-gray-500">
                                                            {notification.timestamp}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        {notification.message}
                                                    </p>
                                                    {notification.amount && (
                                                        <p className="text-sm font-medium text-gray-900 mb-3">
                                                            Per Person Amount: ₹{notification.amount.toLocaleString()}
                                                        </p>
                                                    )}
                                                    {notification.status === 'pending' && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleAccept(notification.id)}
                                                                className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                onClick={() => handleDecline(notification.id)}
                                                                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                                            >
                                                                Decline
                                                            </button>
                                                        </div>
                                                    )}
                                                    {notification.status === 'accepted' && (
                                                        <div className="flex items-center gap-1 text-green-600">
                                                            <BiCheck className="h-4 w-4" />
                                                            <span className="text-sm font-medium">Accepted</span>
                                                        </div>
                                                    )}
                                                    {notification.status === 'declined' && (
                                                        <div className="flex items-center gap-1 text-red-600">
                                                            <BiX className="h-4 w-4" />
                                                            <span className="text-sm font-medium">Declined</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OpneNotificationModal
