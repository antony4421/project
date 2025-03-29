import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import "./css/calendar.css";

const Calendar = ({ events = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState("");

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getDaysInMonth = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setShowEventModal(true);
  };

  const addEvent = () => {
    if (newEvent.trim() !== "") {
      events.push({ date: selectedDate, name: newEvent });
      setNewEvent("");
      setShowEventModal(false);
    }
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button className="nav-button" onClick={prevMonth}>{"<"}</button>
        <h2 className="month-title">{format(currentMonth, "MMMM yyyy")}</h2>
        <button className="nav-button" onClick={nextMonth}>{">"}</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        {getDaysInMonth().map((day, index) => (
          <div
            key={index}
            className={`calendar-day-cell ${isSameMonth(day, currentMonth) ? "" : "inactive-day"}`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>

      {showEventModal && (
        <div className="event-modal">
          <h3 className="event-modal-title">Events on {format(selectedDate, "MMMM d, yyyy")}</h3>
          <input
            type="text"
            className="event-input"
            placeholder="Add new event"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
          />
          <div className="modal-buttons">
            <button className="save-event-btn" onClick={addEvent}>Save</button>
            <button className="cancel-event-btn" onClick={() => setShowEventModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
