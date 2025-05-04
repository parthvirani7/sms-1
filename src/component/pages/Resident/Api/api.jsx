import axios from "axios";
import {jwtDecode} from "jwt-decode";

// const url = 'https://society-management-app-server.onrender.com'
// const url = 'https://civicnest-backend.onrender.com'
const url = 'https://sms-backend-blue.vercel.app'


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Get_Profile_img = (setFormData) =>{
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  axios.get(`${url}/resident/profile/${decodedToken._id}`).then((res) => {
    setFormData(res.data)
  })
}
export const AnnouncementGet = (setAnnouncement) =>{
  axios.get(`${url}/announcement/getAllAnnouncements`).then((res) => {
    console.log(res.data)
    setAnnouncement(res.data)
  })
}

// Home page 
// Pending Maintenances

export const Get_Pending_Maintenances = (setPendingData) => {
  axios.get('https://civicnest-backend.onrender.com/PendingMaintenances').then((res) => {
    setPendingData(res.data)
  })
}

// Service_And_Complaint page
// Complaint_Submissionpage
// Complaint data Get

export const GetComplaint = (setdata, setloadingcomplaint) => {
  axios.get(`${url}/complaint/getAllComplaints`).then((res) => {
    // console.log(res.data);
    setdata(res.data);
    setloadingcomplaint(false)
  })
}

// Complaint data Post
export const PostComplaint = (data, Fdata, close, setloading) => {
  setloading(true)
  axios.post(`${url}/complaint/createComplaint`, data).then((res) => {
    console.log(res.data);
    Fdata()
    close()
    setloading(false)
  })
}

// Complaint data Delete
export const DeleteComplaint = (setdata, closeDelete, DId, setloadingDelete) => {
  setloadingDelete(true)
  axios.delete(`${url}/complaint/deleteComplaint/${DId}`).then((res) => {
    setdata((prevData) => prevData.filter((item) => item._id !== DId));
    closeDelete();
    setloadingDelete(false)
  })
    .catch((err) => {
      console.error("Error deleting:", err);
      setloadingDelete(false)
    });
}

// Request_Submission page

// Request_Submission data Get

export const GetRequest_Submission = (setdata, setloadingData) => {
  axios.get(`${url}/request/getAllRequests`).then((res) => {
    setdata(res.data);
    setloadingData(false)
  })
}

// Complaint data Post
export const PostRequest_Submission = (data, Fdata, close, setloading) => {
  setloading(true)
  axios.post(`${url}/request/createRequest`, data).then((res) => {
    close()
    Fdata()
    setloading(false)
    console.log(res.data);
  })
}

// Complaint data Delete
export const DeleteRequest_Submission = (data, setdata, closeDelete, DId, setloadingDelete) => {
  setloadingDelete(true)
  axios.delete(`${url}/request/deleteRequest/${DId}`).then((res) => {
    console.log(res.data);
    const Deletedata = data.filter((item) => item._id !== DId);
    setdata(Deletedata)
    setloadingDelete(false)
    closeDelete()
  })
    .catch((err) => {
      console.error("Error deleting:", err);
    });
}

// payment portal page
// Maintenance_Invoices page
// Pending Maintanance Get
export const Get_Pending_Maintanance = (setMaintanance) => {
  axios.get('https://civicnest-backend.onrender.com/Pending_Maintanance').then((res) => {
    setMaintanance(res.data);
  });
}

// Pending Maintanance User Data Get

export const Get_Maintenance_Invoices_data = () => {
  axios.get('https://civicnest-backend.onrender.com/Maintenance_Invoices_data').then((res) => {
    setgetInvoices(res.data);
  });
}

//  Maintenance

export const GetMaintenance = (setudata) => {
  axios.get(`${url}/maintenance/getAllmaintenances`).then((res) => {
      setudata(res.data)
  })
}

// EventData
export const GetEventData = (setEventData) => {
  axios.get('https://civicnest-backend.onrender.com/EventData').then((res) => {
    // console.log(res.data);
    setEventData(res.data)
  })
}

export const GetActivityData = (setActivityData) => {
  axios.get('https://civicnest-backend.onrender.com/ActivityData').then((res) => {
    // console.log(res.data);
    setActivityData(res.data)
  })
}

//Polls 
export const GetOwnPoll = async () => {
  const res = await axios.get('https://civicnest-backend.onrender.com/OwnPoll');
  return res.data;
};


export const PostOwnpoll = (data, Fdata, closeCreatePoll) => {
  console.log(data);

  axios.post(`https://civicnest-backend.onrender.com/OwnPoll`, data).then((res) => {
    closeCreatePoll(false)
    Fdata()
  })
}



export const GetNewPoll = async () => {
  const res = await axios.get('https://civicnest-backend.onrender.com/OwnPoll');
  return res.data;
};

export const GetPreviousPoll = async () => {
  const res = await axios.get('https://civicnest-backend.onrender.com/OwnPoll');
  return res.data;
};


