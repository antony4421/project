import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/ChatApp.css";
import Sidebar from "./components/Sidebar/Sidebar";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setEmployeeId(parseInt(storedEmployeeId, 10));
      fetchEmployeeName(storedEmployeeId);
    }
    fetchMessages();
  }, []);

  const fetchEmployeeName = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8005/api/employees/${id}`);
      setSenderName(response.data.name);
    } catch (error) {
      console.error("Error fetching employee name:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8005/api/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && !image) return;
    
    const formData = new FormData();
    formData.append("employeeId", employeeId);
    formData.append("sender", senderName);
    formData.append("text", newMessage);
    if (image) {
      formData.append("image", image, image.name);
    }
    
    try {
      await axios.post("http://localhost:8005/api/messages/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewMessage("");
      setImage(null);
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const likeMessage = async (id) => {
    try {
      await axios.post(`http://localhost:8005/api/messages/like/${id}`);
      fetchMessages(); // Refresh messages after liking
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const employeeId = localStorage.getItem("employeeId");
      await axios.delete(`http://localhost:8005/api/messages/${id}`, {
        params: { employeeId: employeeId }
      });
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
};

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="custom-paylist">
      <Sidebar />
      <div className="chat-container">
        <h2 className="chat-title">Chat Room</h2>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender === senderName ? "chat-sender" : "chat-receiver"}`}>
              <strong>{msg.sender}:</strong> {msg.text}
              {msg.image && <img src={`http://localhost:8005${msg.image}`} alt="Sent" className="chat-image" />}
              <div className="chat-actions">
                <span>{msg.likes} Likes</span>
                <button className="chat-like-button" onClick={() => likeMessage(msg.id)}>Like</button>
                
                {/* Only show delete button if message was sent by logged-in user */}
                {msg.employeeId === employeeId && (
                  <button className="chat-delete-button" onClick={() => deleteMessage(msg.id, msg.employeeId)}>Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="chat-file-input" id="imageUpload" />
          <label htmlFor="imageUpload" className="chat-upload-label">📷</label>
          <button className="chat-send-button" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
