import React, { useEffect, useState } from 'react'
import { GetAnnouncement } from '../../../../services/Api/api';

const Activity = () => {
    
      const [ActivityData, setActivityData] = useState([]);

  // Fetch Event Data on component mount
  const [Loding, setLoding] = useState(true)
  useEffect(() => {
    
    fetchActivities();
  }, []);


  const fetchActivities = async () => {
    GetAnnouncement(setActivityData,setLoding)
  };
 
    

    return (
        <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Activity Participation</h2>
        {Loding ? (
                  <div className='flex justify-center'>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                </div>
                ) : (
        <table className="w-full table-auto border-collapse rounded-t-lg overflow-hidden">
          <thead className="bg-[#eef1fd] text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Participator Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Activity Time</th>
              <th className="px-4 py-2 text-left">Activity Date</th>
              <th className="px-4 py-2 text-left">Activity Name</th>
            </tr>
          </thead>
    
          <tbody>
            {ActivityData.map((item, index) => (
             <tr key={index} className="border-b">
             <td className="px-4 py-3 flex items-center space-x-2">
               <img
                 src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770800/shfpe3pccvr5qrpuldzh.png"
                 alt="Profile"
                 className="w-8 h-8 rounded-full border border-gray-400"
               />
               <span>{item.title}</span>
             </td>
             <td className="px-4 py-3">{item.description}</td>
             <td className="px-4 py-3">{item.time}</td>
             <td className="px-4 py-3"> {new Date(item.date).toLocaleDateString("en-US", {
                     day: "2-digit",
                     month: "2-digit",
                     year: "numeric",
                   })}</td>
             <td className="px-4 py-3">{item.title}</td>
           </tr>
            ))}
          </tbody>
        </table>  )}
      </div>
    )
}

export default Activity
