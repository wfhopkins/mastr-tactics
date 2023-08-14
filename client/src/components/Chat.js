import React, { useState, useEffect } from 'react';

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
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <span className="chat-message-from">{message.from}:</span>
            <span className="chat-message-text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
