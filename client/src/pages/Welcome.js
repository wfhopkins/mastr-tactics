import React, { useState } from 'react';
import Chat from './Chat';
import GameModal from '../components/GameModal';
import PhaserGame from '../components/PhaserGame';



const Welcome = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="welcome-container">
      <h4>This is the welcome page</h4>
      <p>Check out the rules page!</p>
      <button className="start-button">Get Started</button>
      <Chat />
      <button onClick={handleModalOpen}>Play Now</button>
      <GameModal isOpen={modalOpen} onClose={handleModalClose}>
        <PhaserGame />
      </GameModal>
    </div>
  );
};

export default Welcome;