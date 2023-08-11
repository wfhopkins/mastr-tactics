import React, { useState } from 'react';
import Chat from '../components/Chat';
import GameModal from '../components/GameModal';
import PhaserGame from '../components/PhaserGame';
import NavBar from '../components/NavBar';
import '../styles/NavBar.css';
import Lore from '../components/Lore';
import About from '../components/About';
import Rules from '../components/Rules';
import Cards from '../components/Cards';

const Welcome = ({ auth, logout }) => {
  //These are the state variables for managing component visibility
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoreVisible, setIsLoreVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isRulesVisible, setIsRulesVisible] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  const [isLoad, setLoad] = useState(true); // This is how you won't have a very quick rendering of the other components

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLoreButtonClick = () => {
    setIsLoreVisible(!isLoreVisible);
    setIsAboutVisible(false); // Close the About component if open
    setIsRulesVisible(false); // Close the Rules component if open
    setLoad(false);
  };

  const handleAboutButtonClick = () => {
    setIsAboutVisible(!isAboutVisible);
    setIsLoreVisible(false); // Close the Lore component if open
    setIsRulesVisible(false); // Close the Rules if open
    setLoad(false);
  };

  const handleRulesButtonClick = () => {
    setIsRulesVisible(!isRulesVisible);
    setIsLoreVisible(false);
    setIsAboutVisible(false); 
    setLoad(false);
  };
  
  const handleCardsButtonClick = () => {
    setIsCardsVisible(!isRulesVisible);
    setIsRulesVisible(false);
    setIsLoreVisible(false);
    setIsAboutVisible(false); 
    setLoad(false);
  };  

  const handleComponentClose = () => {
    setIsLoreVisible(false);
    setIsAboutVisible(false);
    setIsRulesVisible(false);
    setIsCardsVisible(false);
  };
  
  return (
    <div className="welcome-container">
      <NavBar auth={auth} logout={logout} onCardsButtonClick={handleCardsButtonClick} onLoreButtonClick={handleLoreButtonClick} onAboutButtonClick={handleAboutButtonClick} onRulesButtonClick={handleRulesButtonClick} />
      {/* <h4>This is the welcome page</h4>
      <p>Check out the rules page!</p>
      <Chat /> */}
      <button onClick={handleModalOpen}>Play Now</button>
      <GameModal isOpen={modalOpen} onClose={handleModalClose}>
        <PhaserGame />
      </GameModal> 

      <div className={`rules-container ${isLoad ? 'pre-load' : ''} ${isRulesVisible ? 'slide-down' : 'fade-out'}`}>
        <Rules onClose={handleComponentClose} />
      </div>
      
      <div className={`lore-container ${isLoad ? 'pre-load' : ''} ${isLoreVisible ? 'slide-down' : 'fade-out'}`}>
        <Lore onClose={handleComponentClose} />
      </div>

      <div className={`about-container ${isLoad ? 'pre-load' : ''} ${isAboutVisible ? 'slide-down' : 'fade-out'}`}>
         <About onClose={handleComponentClose} />
      </div>

      <div className={`cards-container ${isLoad ? 'pre-load' : ''} ${isCardsVisible ? 'slide-down' : 'fade-out'}`}>
         <Cards onClose={handleComponentClose} />
      </div>
      
    </div>
  );
};

export default Welcome;
