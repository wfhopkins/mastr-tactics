import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';

const Chat = ({ socket, currentUser, opponent }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        text: messageInput,
        from: currentUser,
        to: opponent,
      };

      // Update the local state to display your sent message immediately
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('privateMessage', newMessage);
      setMessageInput('');
    }
  };

  useEffect(() => {
    socket.on('privateMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  return (
    <div className="chat-container">
      
      
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="chat-input-field"
        />
        <button onClick={handleSendMessage} className="chat-button">Send</button>
      </div>

      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <span className="chat-message-from">{message.from}:</span>
            <span className="chat-message-text">{message.text}</span>
          </div>
        ))}
      
      </div>
    </div>

    
  );
};

export default Chat;
