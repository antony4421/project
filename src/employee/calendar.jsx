

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "./css/CompanyEventsCalendar.css";
import { Link } from "react-router-dom";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, [selectedMonth]);

  const fetchEvents = () => {
    axios.get("http://localhost:8005/api/events")
      .then(response => {
        const selectedMonthNum = selectedMonth.getMonth() + 1;
        const selectedYear = selectedMonth.getFullYear();
        const filteredEvents = response.data.filter(event => {
          const [year, month] = event.eventDate.split("-");
          return parseInt(year) === selectedYear && parseInt(month) === selectedMonthNum;
        });
        setEvents(filteredEvents);
      })
      .catch(error => console.error("Error fetching events!", error));
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  return (
    <div className="landing8">
      <nav className="custom-navbar">
        <h1 className="custom-logo">HR SOLUTION</h1>
        <ul className="custom-nav-links">
          <li className="custom-nav-item"><Link to="/emphome">Home</Link></li>
          <li className="custom-nav-item"><Link to="/empdash">Services</Link></li>
          <li className="custom-nav-item"><Link to="/payslip">Payslip</Link></li>
          <li className="custom-nav-item"><Link to="/socialchat">Social</Link></li>
        </ul>
        <button className="custom-signin-btn"><Link to="/login">Logout</Link></button>
      </nav>

      <div className="calendar-container">
        <div className="calendar-section">
          <h2>Company Events Calendar</h2>
          <Calendar 
            onClickMonth={handleMonthChange} 
            value={selectedMonth} 
            className="custom-calendar" 
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split('T')[0];
              return events.some(event => event.eventDate === dateStr) ? "highlight-event" : "";
            }}
          />
        </div>
        <div className="events-section">
          <h3>Events This Month</h3>
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>📅 Date: {event.eventDate}</p>
              </div>
            ))
          ) : (
            <p className="no-events">No events scheduled for this month.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
