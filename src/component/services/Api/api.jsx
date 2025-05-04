import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const url = 'https://society-management-app-server.onrender.com'
const url = 'https://civicnest-backend.onrender.com'
// const url = 'https://sms-backend-blue.vercel.app'


// login Manger

export const ManagerLogin = async (
    data,
    setLoginError,
    navigate,
    storetokenInLs,
    setLoading,
    reset
) => {
    try {
        setLoading(true);
        const { data: resData } = await axios.post(`${url}/manager/login`, {
            Email: data.Email,
            Password: data.Password,
        });

        if (resData?.token) {
            const { role } = jwtDecode(resData.token);
            const paths = {
                Manager: "/manager/home",
                Resident: "/resident/home",
                Security: "/security/visitor",
            };

            if (paths[role]) {
                storetokenInLs(resData.token);
                reset();
                navigate(paths[role]);
            } else {
                throw new Error("Unauthorized role.");
            }
        } else {
            throw new Error("Invalid credentials.");
        }
    } catch (error) {
        setLoginError(
            error.response?.status === 401
                ? "Invalid email or password."
                : error.message || "Login failed."
        );
    } finally {
        setLoading(false);
    }
};

// Forgot password Manger

export const ManagerForgot_password = (data, setLoginError, navigate, setLoading) => {
    axios.post(`${url}/manager/sedotp`, { Email: data.Email, }).then((res) => {
        if (res.data) {
            console.log(res.data);
            setLoading(false);
            localStorage.setItem('Email', JSON.stringify(res.data.data));
            navigate('/forgot_password/opt');
        } else {
            setLoading(false);
            setLoginError('Incorrect email/phone');
        }
    }).catch((error) => {
        setLoading(false);
        console.error('Login error:', error);
        setLoginError('Login failed. Please try again later.');
    })
};

// resend otp

export const ResendOtp = (datas) => {
    axios.post(`${url}/manager/sedotp`, { Email: datas.Email, }).then((res) => {
        console.log(res.data);
    }).catch((error) => {
        console.error('Login error:', error);
    })
}


// Verifyotp Manger

export const Managerverifyotp = (datas, setLoginError, setLoading, navigate, reset) => {
    axios.post(`${url}/manager/verifyotp`, { otp: datas.otp, Email: datas.Email })
        .then((res) => {
            if (res.data) {
                setLoading(false);
                navigate('/reset_password')
            } else {
                setLoading(false);
                setLoginError('Incorrect OTP');
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error('Login error:', error);
            setLoginError('Verify failed. Please try again later.');
            reset({ otp: new Array(4).fill("") });
        })
}

// Reset password Manger

export const ManagerResetPassword = (data, setLoginError, setLoading, reset, navigate) => {
    axios.post(`${url}/manager/forgotpassword`, { newpass: data.Password, Email: data.Email })
        .then((res) => {
            if (res.data) {
                setLoading(false);
                reset()
                console.log("Password Reset Successful");
                localStorage.removeItem('Email');
                navigate('/login')
            } else {
                setLoading(false);
                reset()
                setLoginError('Reset password failed. Please try again.');
            }
        })
        .catch(() => {
            setLoading(false);
            reset()
            setLoginError('Reset password failed. Please try again later.');
        });
}

// regegistration page

// Create User Registration

export const UserDataRegistration = (registrationData, setRegistrationError, reset,navigate) => {

    axios.post(`${url}/manager/createmanager`, registrationData).then((res) => {
        if (res.data) {
            navigate('/')
            reset()
        } else {
            setRegistrationError('Incorrect email/phone or password');
        }
    })
        .catch((error) => {
            console.error('Registration error:', error);
            setRegistrationError('Registration failed. Please try again later.');
        });
}

// Get Socirty

export const GetCreateSocirty = (setSocieties) => {
    axios.get(`${url}/society/societies`).then((res) => {
        setSocieties(res.data.data)
    })
}

// Post Socirty

export const UserCreateSociety = (newSociety, CloseCreatenewSociety,LodData) => {
    axios.post(`${url}/society/createsocieties`, {
        societyname: newSociety.societyname,
        societyaddress: newSociety.societyaddress,
        Country: newSociety.Country,
        State: newSociety.State,
        City: newSociety.City,
        Zipcode: newSociety.Zipcode
    })
        .then((res) => {
            if (res.data) {
                LodData()
                CloseCreatenewSociety()
            } else {
                console.log("Incorrect create society");
            }
        })
        .catch((error) => {
            console.error('Registration error:', error);
        });
}

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

// Profile Get 
export const Profile_img = (setFormData) => {
    axios.get(`${url}/manager/profile`).then((res) => {
        setFormData(res.data);
    })
}

// Profile Post 
export const EditProfile = async (form, Fdata) => {
    axios.put(`${url}/manager/updatemanger`, form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        console.log(res);
        Fdata()
    }).catch((error) => {
        console.error('Error submitting form:', error);
    })
}

// ImportantNumbers page Home

// ImportantNumbers get

export const ImportantNumbersGet = (setContacts, setLoading) => {
    setLoading(true);
    // const token = localStorage.getItem('token')
    // console.log(token);
    axios.get(`${url}/importantnumber/getAllImportantNumbers`
        //  {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
    )
        .then((res) => {
            setContacts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Error fetching important numbers:', err);
            setLoading(false);
            setContacts([]);
        });
}

// ImportantNumbers post

export const ImportantNumbersPost = (newNumber, Fdata, setLoading) => {
    const token = localStorage.getItem('token')
    axios.post(`${url}/importantnumber/createImportantNumber`, newNumber, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setLoading(false)
            Fdata()

        })
        .catch((err) => {
            setLoading(false)
            console.error('Error fetching important numbers:', err);
        });
}

// ImportantNumbers delete

export const ImportantNumbersDelete = (_id, contacts, setContacts, ClosedeleteContact, setLoading) => {
    axios.delete(`${url}/importantnumber/deleteImportantNumber/${_id}`)
        .then((res) => {
            console.log(res);
            const deletData = contacts.filter((e) => e._id !== _id)
            setContacts(deletData)
            ClosedeleteContact()
            setLoading(false)
        })
        .catch((err) => {
            console.error('Error fetching important numbers:', err);
            setLoading(false)
        });
}

// ImportantNumbers edit

export const updateImportantNumber = (_id, editNumber, Fdata, closeEditModal, setLoading) => {
    axios.put(`${url}/importantnumber/updateImportantNumber/${_id}`, editNumber)
        .then(() => {
            closeEditModal();
            Fdata()
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error saving data:", error)
            setLoading(false)
        });
};

// Resident Management page Get

export const GetResident = (setSumdata, setLoading) => {
    axios.get(`${url}/resident/getall`)
      .then((res) => {
        console.log(res.data);
        setSumdata(res.data);
      })
      .catch((err) => {
        console.error("Error fetching resident data", err);
      })
      .finally(() => {
        setLoading(false); // ✅ Stop loading spinner/dots
      });
  };

// Resident Management page Get /id

export const GetResidentId = (_id,setData) =>{
    axios.get(`${url}/resident/profile/${_id}`).then((res) => {
        console.log("hiii",res.data);
        setData(res.data);
      });
}

// Resident Management page Post

export const PostSumdata = async (formData) => {
    const data = new FormData();

    // Append all text fields and other simple fields
    Object.entries(formData).forEach(([key, value]) => {
        if (key === 'members' || key === 'vehicles') {
            // Stringify arrays
            data.append(key, JSON.stringify(value));
        } else if (key === 'photo' || key === 'aadhaarFront' || key === 'aadhaarBack' || key === 'addressProof' || key === 'rentAgreement') {
            // Append files if they exist
            if (value) {
                data.append(key, value);
            }
        } else {
            // Append other values directly
            data.append(key, value);
        }
    });

    try {
        const response = await axios.post(
            `https://civicnest-backend.onrender.com/resident/create`,
            data,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );
        console.log('Response:', response.data);
        localStorage.removeItem('UnitStatus');
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

// Resident Management page

// Complaint Tracking page

// === Complaint get

export const GetComplainy = (setgetComplaint, setloadingcomplaint) => {
    axios.get(`${url}/complaint/getAllComplaints`).then((res) => {
        // console.log(res.data);
        setgetComplaint(res.data);
        setloadingcomplaint(false)
    })
}

// === Complaint create

export const CreateComplaint = async (data, setClosecreateComplint, getComplaintdata, setloading) => {
    setloading(true)
    try {
        const response = await axios.post(`${url}/complaint/createComplaint`, data);
        console.log(response.data);
        getComplaintdata()
        setClosecreateComplint(false);
        setloading(false)
    } catch (error) {
        console.error("Error submitting complaint:", error);
        setloading(false)
    }
}

// === Complaint delete

export const DeleteComplaint = async (_id, setloadingcomplint, CloseDeleteComplint, getComplaint, setgetComplaint) => {
    setloadingcomplint(true)
    axios.delete(`${url}/complaint/deleteComplaint/${_id}`).then((res) => {
        const Deletedata = getComplaint.filter((e) => e._id !== _id)
        setgetComplaint(Deletedata)
        setloadingcomplint(false)
        CloseDeleteComplint()
    })
}

// === Complaint Edit

export const EditComplaint = async (closeEditComplint, _id, editComplaint, setloading, LodData) => {
    console.log(editComplaint);

    setloading(true)
    try {
        const res = await axios.put(`${url}/complaint/updateComplaint/${_id}`, editComplaint);
        console.log(res.data);
        closeEditComplint();
        LodData()
        setloading(false)
    } catch (error) {
        console.error('Error saving complaint:', error);
        setloading(false)
    }
}

// Request Tracking page

// Get Request

export const GetRequest = (setgetComplaint, setloadingRequest) => {
    axios.get(`${url}/request/getAllRequests`).then((res) => {
        console.log(res.data);
        setgetComplaint(res.data);
        setloadingRequest(false)
    })
}

// Post Request

export const PostRequest = (data, getComplaintdata, setClosecreateComplint, setloading) => {
    setloading(true)
    axios.post(`${url}/request/createRequest`, data).then((res) => {
        setClosecreateComplint()
        getComplaintdata()
        setloading(false)
    })
}

// Delete Request

export const DeleteRequest = (_id, setloadingDelete, CloseDeleteComplint, getComplaint, setgetComplaint) => {
    setloadingDelete(true)
    axios.delete(`${url}/request/deleteRequest/${_id}`).then((res) => {
        console.log(res.data);
        const Deletedata = getComplaint.filter((e) => e._id !== _id)
        setgetComplaint(Deletedata)
        setloadingDelete(false)
        CloseDeleteComplint()
    })
}

// Edit Request

export const EditRequest = async (_id, editComplaint, closeEditComplint, setloading, Lodata) => {
    setloading(true)
    try {
        const res = await axios.put(`${url}/request/updateRequest/${_id}`, editComplaint);
        console.log(res.data);
        setloading(false)
        closeEditComplint();
        Lodata()
    } catch (error) {
        console.error('Error saving complaint:', error);
        setloading(false)
    }
}

// Security Management page

// Get Security Protocols

export const Get_Security_Protocols = (setSecurity, setloding) => {
    axios.get(`${url}/security/getallprotocols`).then((res) => {
        // console.log(res.data)
        setSecurity(res.data)
        setloding(false)
    })
}

// Post Security Protocols

export const Post_Security_Protocols = (data, Fdata, CloseAddProtocols, setloding) => {
    setloding(true)
    axios.post(`${url}/security/createprotocol`, data).then((res) => {
        CloseAddProtocols()
        Fdata()
        setloding(false)
    })
}

// Delete Security Protocols

export const Delete_Security_Protocols = (_id, setdeleteloding, CloseDeleteProtocols, Security, setSecurity) => {
    setdeleteloding(true)
    axios.delete(`${url}/security/deleteprotocol/${_id}`).then((res) => {
        const Deletedata = Security.filter((e) => e._id !== _id)
        setSecurity(Deletedata)
        setdeleteloding(false)
        CloseDeleteProtocols()
    })
}

// Edit Security Protocols

export const Edit_Delete_Security_Protocols = (_id, data, setloding, CloseEditProtocols) => {
    setloding(true)
    axios.put(`${url}/security/updateprotocol/${_id}`, data).then((res) => {
        setloding(false)
        CloseEditProtocols()
    })
}


// Security Guard page

// Get Security Guard Details

export const GetGuard_Details = (setGuard_Details, setlodingData) => {
    axios.get(`${url}/security/getallsecurity`).then((res) => {
        setGuard_Details(res.data)
        setlodingData(false)
    })
}

// post Security Guard Details

export const PostGuard_Details = (data, CloseAddSecurity, Fdata, setloading) => {
    setloading(true)
    axios.post(`${url}/security/createsecurity`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        CloseAddSecurity()
        setloading(false)
        Fdata()
    })
}

// Delete Security Guard Details

export const DeleteGuard_Details = (_id, setloadingDelete, Guard_Details, setGuard_Details, CloseDeleteSecurity) => {
    setloadingDelete(true)
    axios.delete(`${url}/security/deletesecurity/${_id}`).then((res) => {
        setloadingDelete(false)
        const deletData = Guard_Details.filter((e) => e._id !== _id)
        setGuard_Details(deletData)
        CloseDeleteSecurity()
    })
}

// Edit Security Guard Details

export const EditGuard_Details = (_id, formData, CloseEdit, Fdata, setloading) => {
    setloading(true)
    axios
        .put(`${url}/security/updatesecurity/${_id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
            CloseEdit();
            Fdata()
            setloading(false)
        })
        .catch((err) => {
            console.error('Error updating data:', err);
        });
};


// Announcement page

// Get Announcement

export const GetAnnouncement = (setgetAnnouncement, setLoding) => {
    axios.get(`${url}/announcement/getAllAnnouncements`).then((res) => {
        setgetAnnouncement(res.data)
        setLoding(false)
    }).catch((err) => {
        console.error('Error fetching important numbers:', err);
        setLoding(false)
    });
}

// Post Announcement

export const PostAnnouncement = (data, Fdata, ClaseAddAnnouncement, setloading) => {
    setloading(true)
    axios.post(`${url}/announcement/createAnnouncement`, data).then((res) => {
        setloading(false)
        ClaseAddAnnouncement(false)
        Fdata()
    })
}

// Delete Announcement

export const DeleteAnnouncementDele = (_id, Fdata, ClaseDeleteAnnouncement, setloadingDelete) => {
    setloadingDelete(true)
    axios.delete(`${url}/announcement/deleteAnnouncement/${_id}`).then((res) => {
        Fdata()
        ClaseDeleteAnnouncement(false)
        setloadingDelete(false)
    }).catch((err) => {
        console.error('Error fetching important numbers:', err);
        setloadingDelete(false)
    });
}

// Edit Announcement

export const EditAnnouncement = (_id, formData, ClaseEditAnnouncement, setloading, LodaData) => {
    setloading(true)
    axios.put(`${url}/announcement/updateAnnouncement/${_id}`, formData).then((res) => {
        ClaseEditAnnouncement()
        setloading(false)
        LodaData()
    }).catch((err) => {
        console.error('Error fetching important numbers:', err);
        setloading(false)
    });
}

// Facility Management page

// Facility Management Get

export const Facility_Management_Get = (setincomeData, setloadingFacility) => {
    axios.get(`${url}/facility/getAllFacilities`).then((res) => {
        setincomeData(res.data)
        setloadingFacility(false)
    })
}

// Facility Management Post

export const Facility_Management_Post = (data, Fdata, setClosecreate_facility, setloading) => {
    setloading(true)
    axios.post(`${url}/facility/createFacility`, data).then((res) => {
        console.log(res.data);
        Fdata()
        setClosecreate_facility(false)
        setloading(false)
    })
}

// Facility Management Delete

export const Facility_Management_Delete = (DeleteData, DeleteClose, setloading, incomeData, setincomeData) => {
    setloading(true)
    axios.delete(`${url}/facility/deleteFacility/${DeleteData}`).then((res) => {
        DeleteClose()
        const deletData = incomeData.filter((e) => e._id !== DeleteData)
        setincomeData(deletData)
        setloading(false)
    })
}

// Facility Management Edit

export const Facility_Management_Edit = (_id, data, setloading, seteditcreate_facility, lodData) => {
    setloading(true)
    axios.put(`${url}/facility/updateFacility/${_id}`, data).then((res) => {
        lodData()
        seteditcreate_facility(false)
        setloading(false)
    })
}

// Financial Maintenance page

//  Maintenance

export const GetMaintenance = (setudata) => {
    axios.get(`${url}/maintenance/getAllmaintenances`).then((res) => {
        setudata(res.data)
    })
}

//   Income page
export const PostIncome = (data, Fdata, setShowAddDetail) => {
    axios.post(`${url}/maintenance/createMaintenance`, data).then((res) => {
        Fdata()
        setShowAddDetail(false)
    })
}

//Other Income

export const GetOtherIncome = (setCreateIncome, setLoading) => {
    axios.get(`${url}/otherincome/getAllOtherincome`)
      .then((res) => {
        console.log(res.data);
        setCreateIncome(res.data);
      })
      .catch((err) => {
        console.error("Error fetching other income", err);
      })
      .finally(() => {
        setLoading(false); // Stop loading once data is fetched
      });
  };

export const PostOtherIncome = (data, Fdata, setCreateIncome) => {
    axios.post(`${url}/otherincome/createOtherincome`, data).then((res) => {
        Fdata()
        setCreateIncome(false)
    })
}


export const UpdateOtherIncome = async (id, data) => {
    try {
        const response = await axios.put(`${url}/otherincome/updateOtherincome/${id}`, data);
        return response.data; // Ensure backend returns `{ success: true, data: updatedData }`
    } catch (error) {
        console.error('Error in UpdateOtherIncome API:', error);
        throw error;
    }
};

export const DeleteOtherIncome = (DeleteId, incomeData, setIncomeData, closeDeleteBox) => {
    const _id = DeleteId
    axios
        .delete(`${url}/OtherIncome/deleteOtherincome/${_id}`)
        .then((res) => {
            console.log(res);
            const Deletedata = incomeData.filter((e) => e._id !== _id)
            setIncomeData(Deletedata)
            closeDeleteBox()
        })
        .catch((err) => {
            console.error("Error deleting income:", err);
            closeDeleteBox()
        });
};
///Expanse

export const GetExpanse = (setAddExpense, setLoading) => {
    axios.get(`${url}/expenses/getAllexpensess`)
      .then((res) => {
        setAddExpense(res.data);
      })
      .catch((err) => {
        console.error("Error fetching expenses", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

export const PostExpanse = async (data, Fdata, setAddExpense, setPreviewImage, reset, handleCancel, setLoading) => {
    console.log(data.Bill);

    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('date', new Date(data.date).toISOString());
    formData.append('amount', data.amount);
    if (data.Bill && data.Bill.length > 0) {
        formData.append('Bill', data.Bill[0]);
    }

    try {
        const res = await axios.post(`${url}/expenses/createexpenses`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        Fdata(); // Invoke the callback to fetch data (if applicable)
        console.log(res);

        setAddExpense(false);
        reset();
        setPreviewImage(null);
        handleCancel();
    } catch (error) {
        console.error('Error submitting expense:', error);
    } finally {
        setLoading(false);
    }
};

export const PutExpense = async (_id, data, lodData, setPreviewImage, Close, setLoading) => {
    try {
        await axios.put(`${url}/expenses/updateexpenses/${_id}`, formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        lodData();
        setPreviewImage(null);
        Close();
        setLoading(false);
    } catch (error) {
        console.error('Error submitting expense:', error);
        setLoading(false);
    }
}

export const DeleteExpense = (RemoveId, Fdata, RemoveView, setLoading) => {
    axios.delete(`${url}/expenses/deleteexpenses/${RemoveId}`).then((res) => {
        Fdata()
        RemoveView()
        setLoading(false)
    })
}

///Visiter Data

export const GetVisiter = (setVisitorLogs, setloding) => {
    axios.get(`${url}/security/getallVisitors`).then((res) => {
        setVisitorLogs(res.data)
        setloding(false)
    })
}

export const PostVisiter = (data, Fdata, setAddVisiterbox) => {
    axios.post('https://civicnest-backend.onrender.com/Visitors', data).then((res) => {
        Fdata()
        setAddVisiterbox(res.data)
    })
}


//Notes

export const GetNotes = (setNotes, setlodingData) => {
    axios.get(`${url}/note/getAllNotes`).then((res) => {
        setNotes(res.data)
        setlodingData(false)
    })
}

export const PostNotes = (data, Fdata, setcreate, setloading) => {
    setloading(true)
    axios.post(`${url}/note/createNote`, data).then((res) => {
        setloading(false)
        Fdata()
        setcreate(false)
    })
}

export const DeleteNotes = (DeleteId, setloading, DeleteClose, Fdata) => {
    setloading(true)
    axios.delete(`${url}/note/deleteNote/${DeleteId}`).then((res) => {
        setloading(false)
        Fdata()
        DeleteClose()
    })
}

export const EditNotes = async (_id, formData, setloading, seteditcreate) => {
    console.log("Submitted Data:", formData);
    setloading(true)
    try {
        const response = await axios.put(`${url}/note/updateNote/${_id}`, formData);
        console.log(response.data);

        seteditcreate(false);
        setloading(false)
    } catch (error) {
        console.error("Error updating note:", error);
        alert("Failed to update note");
        setloading(false)
    }
}