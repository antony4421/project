import React from "react";
import "./css/empdash.css"; // Importing the custom CSS
import timeAttendanceImg from "./images/Time-Attendance-System-PNG-File.png";
import payslip from "./images/pay.png";
import leave from "./images/leave.png";
import engage from "./images/engage.png";
import Calendar from  "./images/calendar.png";
import { Link } from "react-router-dom";
const services = [
  {
    image:timeAttendanceImg,
    title: "Attendance",
    
    description:
      " Keep track of employee attendance efficiently with real-time check-in and check-out records.",
      link: "/empattendance",
      
  },
  {
    image:payslip,
    title: "Payslip",
    description:
      " detailed payslips for employees with automated salary calculations",
      link: "/payslip",
  },
  {
    image: leave,
    title: "leave",
    description:
      "apply for leave, track their leave balance,",
      link: "/leave",
  },
  {
    image: engage,
    title: "engage",
    description:
      "Enhance company culture, boost morale, and strengthen teamwork",
      link: "/socialchat",
  },
  {
    image: Calendar,
    title: "calendar",
    description:
      "important company events at a glance. ",
      link: "/calendar",
  },
];


const empdash = () => {
  return (
    <div className="landing">
     {/* Transparent Navbar */}
     <nav className="custom-navbar">
              <h1 className="custom-logo">HR SOLUTION</h1>
              <ul className="custom-nav-links">
                <li className="custom-nav-item"><Link to="/emphome">Home</Link></li>
                <li className="custom-nav-item">
                  <Link to="/empdash">Services</Link>
                </li>
                <li className="custom-nav-item"><Link to="/payslip">Payslip</Link></li>
                <li className="custom-nav-item">
                  <Link to="/socialchat">Social</Link>
                </li>
              </ul>
             <button className="custom-signin-btn"><Link to="/login">Logout</Link></button>
            </nav>
   
    <section className="services">
      <h2>
        Amazing <span>Services & Features</span> For You
      </h2>
      <p className="subtitle">
      Explore a comprehensive suite of services and features
        
      </p>
      <div className="service-cards">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image} alt={service.title} className="service-image" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link to={service.link}>Read More →</Link>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default empdash;
