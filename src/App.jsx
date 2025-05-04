import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import PrivateRoute from "./component/services/PrivateRoute/PrivateRoute.jsx";
import PaymentSuccess from "./component/pages/Resident/PaymentSuccess.jsx";

// Public Pages
const Login = lazy(() => import("./component/pages/Login"));
const Registration = lazy(() => import("./component/pages/Registration"));
const ForgotPassword = lazy(() => import("./component/pages/Forgot_password"));
const ForgotPasswordOpt = lazy(() =>
  import("./component/pages/Forgot_password_opt")
);
const ResetPassword = lazy(() =>
  import("./component/pages/Reset_password.jsx")
);
const Unauthorized = lazy(() => import("./component/layout/Unauthorized.jsx"));

// Manager Pages
const ManagerHome = lazy(() =>
  import("./component/pages/DashStack_manager/Dashboard/Home.jsx")
);
const ManagerProfile = lazy(() =>
  import("./component/pages/DashStack_manager/Dashboard/Profile.jsx")
);
const ResidentManagement = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Resident_Management/Resident_Management.jsx"
  )
);
const ResidentOwnerForm = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Resident_Owner/Resident_Owner_Form.jsx"
  )
);
const FinancialManagement = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Financial_Management/Financial_Management.jsx"
  )
);
const OtherIncome = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Financial_Management/Income/Otherincome.jsx"
  )
);
const ParticipantTable = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Financial_Management/Income/ParticipantTable.jsx"
  )
);
const Expense = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Financial_Management/Income/Expanse.jsx"
  )
);
const Note = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Financial_Management/Income/Note.jsx"
  )
);
const FacilityManagement = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Facility_Management/Facility_Management.jsx"
  )
);
const CreateComplaint = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Complaint_Tracking/Create_Complaint/Create_Complaint.jsx"
  )
);
const RequestTracking = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Complaint_Tracking/Create_Complaint/Request_Tracking.jsx"
  )
);
const VisitorLogs = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Security_Management/Security_Visitor/Visitor_Logs.jsx"
  )
);
const SecurityProtocols = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Security_Management/Security_Visitor/Security_Protocols.jsx"
  )
);
const SecurityGuard = lazy(() =>
  import(
    "./component/pages/DashStack_manager/Security_Guard/Security_Guard.jsx"
  )
);
const Announcement = lazy(() =>
  import("./component/pages/DashStack_manager/Announcement/Announcement.jsx")
);

// Resident Pages
const ResidentHome = lazy(() =>
  import("./component/pages/Resident/pages/Dashboard/Home.jsx")
);
const ResidentPersonalDetail = lazy(() =>
  import("./component/pages/Resident/pages/Personal_Detail/Personal_Detail.jsx")
);
const ResidentServiceComplaint = lazy(() =>
  import(
    "./component/pages/Resident/pages/Service_And_Complaint/Service_And_Complaint.jsx"
  )
);
const ResidentEventsParticipation = lazy(() =>
  import(
    "./component/pages/Resident/pages/Events_Participation/Events_Participation.jsx"
  )
);
const ResidentAccessForums = lazy(() =>
  import(
    "./component/pages/Resident/pages/Community/pages/Forums/Access_Forums.jsx"
  )
);
const Polls = lazy(() =>
  import("./component/pages/Resident/pages/Community/pages/Poll/Polls.jsx")
);
const ResidentCommunitiesDiscussion = lazy(() =>
  import(
    "./component/pages/Resident/pages/Community/pages/Communities/Communities_Discussion.jsx"
  )
);
const MaintenanceInvoices = lazy(() =>
  import(
    "./component/pages/Resident/pages/Payment_Portal/pages/Maintenance_Invoices.jsx"
  )
);
const MaintenanceInvoicesData = lazy(() =>
  import(
    "./component/pages/Resident/pages/Payment_Portal/pages/Maintenance_Invoices_data.jsx"
  )
);
const OtherIncomeInvoice = lazy(() =>
  import(
    "./component/pages/Resident/pages/Payment_Portal/pages/Other_Income_Invoice.jsx"
  )
);
const ResidentSecurityProtocols = lazy(() =>
  import(
    "./component/pages/Resident/pages/Security_Protocols/Security_Protocols.jsx"
  )
);

// Security Pages
const VisitorTracking = lazy(() =>
  import("./component/pages/Security/Pages/VisitorTracking.jsx")
);
const Emergency = lazy(() =>
  import("./component/pages/Security/Pages/Emergency.jsx")
);

// Fallback Loader
const Loader = () => (
  <div className="flex justify-center">
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/forgot_password/opt" element={<ForgotPasswordOpt />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          {/* Manager Routes */}
          <Route
            path="/manager/*"
            element={
              <PrivateRoute allowedRoles={["Manager"]}>
                <Routes>
                  <Route path="home" element={<ManagerHome />} />
                  <Route path="home/profile" element={<ManagerProfile />} />
                  <Route
                    path="resident_management"
                    element={<ResidentManagement />}
                  />
                  <Route
                    path="resident_management/resident_owner_form"
                    element={<ResidentOwnerForm />}
                  />
                  <Route
                    path="financial_management/income"
                    element={<FinancialManagement />}
                  />
                  <Route
                    path="financial_management/other_income"
                    element={<OtherIncome />}
                  />
                  {/* <Route path="financial_management/ViewParticipation" element={<ParticipantTable />} /> */}
                  <Route
                    path="financial_management/participant_table"
                    element={<ParticipantTable />}
                  />
                  <Route
                    path="financial_management/expense"
                    element={<Expense />}
                  />
                  <Route path="financial_management/note" element={<Note />} />
                  <Route
                    path="facility_management"
                    element={<FacilityManagement />}
                  />
                  <Route
                    path="complaint_tracking/create_complaint"
                    element={<CreateComplaint />}
                  />
                  <Route
                    path="complaint_tracking/request_tracking"
                    element={<RequestTracking />}
                  />
                  <Route
                    path="security_management/visitor_logs"
                    element={<VisitorLogs />}
                  />
                  <Route
                    path="security_management/security_protocols"
                    element={<SecurityProtocols />}
                  />
                  <Route path="security_guard" element={<SecurityGuard />} />
                  <Route path="announcement" element={<Announcement />} />
                </Routes>
              </PrivateRoute>
            }
          />

          {/* Resident Routes */}
          <Route
            path="/resident/*"
            element={
              <PrivateRoute allowedRoles={["Resident"]}>
                <Routes>
                  <Route path="home" element={<ResidentHome />} />
                  <Route
                    path="personal_detail"
                    element={<ResidentPersonalDetail />}
                  />
                  <Route
                    path="service_and_complaint"
                    element={<ResidentServiceComplaint />}
                  />
                  <Route
                    path="events_participation"
                    element={<ResidentEventsParticipation />}
                  />
                  <Route
                    path="community/access_forums"
                    element={<ResidentAccessForums />}
                  />
                  <Route path="community/polls" element={<Polls />} />
                  <Route
                    path="community/communities_discussion"
                    element={<ResidentCommunitiesDiscussion />}
                  />
                  <Route
                    path="payment_portal/maintenance_invoices"
                    element={<MaintenanceInvoices />}
                  />
                  <Route
                    path="payment_portal/maintenance_invoices_data"
                    element={<MaintenanceInvoicesData />}
                  />
                  <Route
                    path="payment_portal/other_income_invoice"
                    element={<OtherIncomeInvoice />}
                  />
                  <Route
                    path="security_protocols"
                    element={<ResidentSecurityProtocols />}
                  />
                </Routes>
              </PrivateRoute>
            }
          />

          {/* Security Routes */}
          <Route
            path="/security/*"
            element={
              <PrivateRoute allowedRoles={["Security"]}>
                <Routes>
                  <Route path="visitor" element={<VisitorTracking />} />
                  <Route path="emergency" element={<Emergency />} />
                </Routes>
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
