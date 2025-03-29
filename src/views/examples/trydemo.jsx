import React from "react";
import "./contactform.css";

const ContactForm = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title">Get in Touch</h2>
        <div className="progress-bar-container">
          <div className="progress-step-active"></div>
          <div className="progress-step-inactive"></div>
          <div className="progress-step-inactive"></div>
        </div>
        <ul className="contact-list">
          <li className="contact-list-item">Quick Response</li>
          <li className="contact-list-item">Secure Data Handling</li>
          <li className="contact-list-item">24/7 Support</li>
        </ul>
      </div>
      
      <div className="contact-form">
        <h3 className="contact-form-title">Contact Us</h3>
        <label className="contact-label">Name</label>
        <input type="text" className="contact-input" placeholder="Enter your name" />
        
        <label className="contact-label">Phone Number</label>
        <input type="tel" className="contact-input" placeholder="Enter your phone number" />
        
        <label className="contact-label">Company Name</label>
        <input type="text" className="contact-input" placeholder="Enter company name" />
        
        <label className="contact-label">Business Email</label>
        <input type="email" className="contact-input" placeholder="Enter your business email" />
        
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default ContactForm;