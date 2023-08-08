import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import sound from '../sounds/notify.mp3';

// Define the Chat component
const Chat = function(props) {
  // Initialize sound effect
  const [play] = useSound(sound, { volume: 0.75 });

  // State to manage messages, socket connection, text input, and recipient
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [to, setTo] = useState("");

  // Set up socket connection and handle events
  useEffect(() => {
    // Create a new socket connection
    const socket = io();
    setSocket(socket);

    // Handle connection event
    socket.on('connect', () => {
      // Uncomment the next line for debugging
      // console.log("Connected.");
    });

    // Handle system messages
    socket.on("system", data => {
      // Uncomment the next lines for debugging
      // console.log(data);
      setMessages(prev => [data, ...prev]);
    });

    // Handle public messages
    socket.on("public", data => {
      const message = `${data.from} says: ${data.text}`;
      setMessages(prev => [message, ...prev]);
      // Uncomment the next line for debugging
      // console.log(data);
    });

    // Handle private messages
    socket.on("private", data => {
      // Play notification sound
      play();

      const message = `${data.from} says: ${data.text}`;
      setMessages(prev => [message, ...prev]);
      // Uncomment the next line for debugging
      // console.log(data);
    });

    // Clean up socket connection to prevent memory leaks
    return () => socket.disconnect();
  }, [play]);

  // Send a message via the socket
  const send = function() {
    socket.emit("message", { text, to });
  };

  // Generate a list of messages as list items
  const list = messages.map((msg, i) => {
    return <li key={i}>{msg}</li>;
  });

  // Render the Chat component
  return (
    <>
      {/* Input for selecting recipient */}
      <div>
        <input
          onChange={event => setTo(event.target.value)}
          value={to}
          placeholder="Recipient" />
      </div>

      {/* Textarea for composing messages */}
      <div>
        <textarea
          onChange={e => setText(e.target.value)}
          placeholder="Type a message" />
      </div>

      {/* Send and clear buttons */}
      <button onClick={send}>Send</button>
      <button onClick={() => setMessages([])}>Clear</button>

      {/* List of messages */}
      <ul>
        {list}
      </ul>
    </>
  );
};

// Export the Chat component as the default export
export default Chat;
