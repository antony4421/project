
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Employee from "views/examples/employee.jsx";
import Login from "views/examples/Login.js";
import Index from "views/index.jsx";
import Company from "views/examples/company.jsx";
import LeaveRequestTable from "views/examples/leaverequest.jsx";
import Emphome from "employee/emphome";
import Empdash from "employee/empdash";
import Calendar from "employee/attendance";
import Profile from "views/examples/Profile.js";
import Payslip from "employee/payslip";

import Leave from "employee/leave";
import CompanyEventsCalendar from "employee/calendar";
import Register from "views/examples/Register.js";
import AttendanceCalendar from "employee/empattendance";
import AddEmployee from "views/examples/addemp.jsx";
import PayslipList from "views/examples/paysliplist.jsx";
import ChatApp from "views/examples/chatapp.jsx";
import Socialchat from "employee/socialchat.jsx";
import EditEmployee from "views/examples/editemp.jsx";
import EventsCalendar from "views/examples/event";
import ForgotPassword from "views/examples/forgotpassword";
import ResetPassword from "views/examples/resetpassword";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter  >
    <Routes>
      
      <Route path="/index" element={<Index />} />
      <Route path="/login/*" element={<Login/>}/>
      <Route path="/register/*" element={<Register/>}/>
      <Route path="*" element={<Navigate to="/index" replace />} />
      <Route path="/company" element={<Company />} />
      <Route path="*" element={<Navigate to="/admin/Employee" replace />} />
      <Route path="*" element={<Navigate to="/auth/ContactForm" replace />} />
      <Route path="/employee/*" element={<Employee/>}/>
      <Route path="/emphome/*" element={<Emphome/>}/>
      <Route path="/payslip/*" element={<Payslip/>}/>
      <Route path="/empdash/*" element={<Empdash/>}/>
      <Route path="/Profile/*" element={<Profile/>}/>
      
      <Route path="/leave/*" element={<Leave/>}/>
      <Route path="/attendance/*" element={<Calendar/>}/>
      <Route path="/calendar/*" element={<CompanyEventsCalendar/>}/>
      <Route path="/addemp" element={<AddEmployee />} />
      <Route path="/leaverequest" element={<LeaveRequestTable/>}/>
      <Route path="/empattendance" element={<AttendanceCalendar/>}/>
      <Route path="/paysliplist" element={<PayslipList/>}/>
      <Route path="/chatapp" element={<ChatApp/>}/>
      <Route path="/socialchat" element={<Socialchat/>}/>
      <Route path="/editemp/:id" element={<EditEmployee/>}/>
      <Route path="/event" element={<EventsCalendar/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
);
