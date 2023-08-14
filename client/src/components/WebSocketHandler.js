import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketHandler = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const newSocket = io(); // Establish WebSocket connection
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket !== null) {
      setLoading(false); // Once the socket is set, loading is complete
    }
  }, [socket]);

  if (isLoading) {
    // Return loading or fallback content while the socket is being established
    return <div>Loading...</div>;
  }

  return React.Children.map(children, child =>
    React.cloneElement(child, { socket })
  );
};

export default WebSocketHandler;

