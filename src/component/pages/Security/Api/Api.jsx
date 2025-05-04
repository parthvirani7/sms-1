import axios from "axios";

// // const url = 'https://society-management-app-server.onrender.com'
// const url = "https://civicnest-backend.onrender.com";
const url = 'https://sms-backend-blue.vercel.app'


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

///Visiter Data

export const GetVisiter = (setVisitorLogs, setloding) => {
  axios.get(`${url}/security/getallVisitors`).then((res) => {
    console.log(res.data);
    setVisitorLogs(res.data);
    setloding(false);
  });
};

export const PostVisiter = (payload, Fdata, setloding, close) => {
  setloding(true);
  axios.post(`${url}/security/createVisitor`, payload).then((res) => {
    Fdata();
    close();
    setloding(false);
  });
};

//Emergency Alert
// export const GetAlert = (setAlertType) => {
//     axios.get(`${url}/alert/createAlert`).then((res) => {
//         setAlertType(res.data)
//         setlodingData(false)
//     })
// }

export const PostAlert = async (data, callback) => {
  try {
    const response = await axios.post(`${url}/alert/createAlert`, data);
    console.log("Response:", response.data);
    if (callback) callback(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Server Response:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};
