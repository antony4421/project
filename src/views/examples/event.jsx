import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "./css/event.css";
import { Link } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", eventDate: "" });

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  const fetchEvents = () => {
    axios.get("http://localhost:8005/api/events")
      .then(response => {
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedYear = selectedDate.getFullYear();
        const filteredEvents = response.data.filter(event => {
          const [year, month] = event.eventDate.split("-");
          return parseInt(year) === selectedYear && parseInt(month) === selectedMonth;
        });
        setEvents(filteredEvents);
      })
      .catch(error => console.error("Error fetching events!", error));
  };

  const handleDateChange = (date) => {
    const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setSelectedDate(date);
    setNewEvent({ title: "", description: "", eventDate: adjustedDate });
    setShowPopup(true);
  };

  const handleAddOrUpdateEvent = () => {
    if (newEvent.title.trim() === "" || newEvent.description.trim() === "") return;

    if (editingEvent) {
      axios.put(`http://localhost:8005/api/events/${editingEvent.id}`, newEvent)
        .then(() => {
          fetchEvents();
          setShowPopup(false);
          setNewEvent({ title: "", description: "", eventDate: "" });
          setEditingEvent(null);
        })
        .catch(error => console.error("Error updating event!", error));
    } else {
      axios.post("http://localhost:8005/api/events", newEvent)
        .then(() => {
          fetchEvents();
          setShowPopup(false);
          setNewEvent({ title: "", description: "", eventDate: "" });
        })
        .catch(error => console.error("Error adding event!", error));
    }
  };

  const handleEditEvent = (event) => {
    setNewEvent(event);
    setEditingEvent(event);
    setShowPopup(true);
  };

  const handleDeleteEvent = (id) => {
    axios.delete(`http://localhost:8005/api/events/${id}`)
      .then(() => fetchEvents())
      .catch(error => console.error("Error deleting event!", error));
  };

  return (
    <div className='add-employee-layout'>
     <Sidebar />

      <div className="calendar-container">
      
        <div className="calendar-section">
          <h2>Company Events Calendar</h2>
          <Calendar onClickDay={handleDateChange} value={selectedDate} className="custom-calendar" />
        </div>
        <div className="events-section">
          <h3>Events This Month</h3>
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>📅 Date: {event.eventDate}</p>
                <button onClick={() => handleEditEvent(event)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p className="no-events">No events scheduled for this month.</p>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{editingEvent ? "Edit Event" : "Add Event"}</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <textarea
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            ></textarea>
            <p>📅 Selected Date: {newEvent.eventDate}</p>
            <button onClick={handleAddOrUpdateEvent}>{editingEvent ? "Update Event" : "Add Event"}</button>
            <button onClick={() => {
              setShowPopup(false);
              setEditingEvent(null);
            }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;