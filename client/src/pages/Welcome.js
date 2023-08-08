import React from 'react';
import Chat from './Chat';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h4>This is the welcome page</h4>
      <p>Check out the rules page!</p>
      <button className="start-button">Get Started</button>
      <Chat />
    </div>
  );
};

export default Welcome;