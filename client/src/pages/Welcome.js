import React, { useState } from 'react';
import SlidingPane from 'react-sliding-pane';
import Chat from '../components/Chat';
import GameModal from '../components/GameModal';
import PhaserGame from '../components/PhaserGame';
import NavBar from '../components/NavBar';
import '../styles/NavBar.css';
import '../styles/SlidingPane.css';
import Lore from '../components/Lore';
import About from '../components/About';
import Rules from '../components/Rules';
import Cards from '../components/Cards';
import { otherImages } from '../assets';


const Welcome = ({ auth, logout }) => {
  //These are the state variables for managing component visibility
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoreVisible, setIsLoreVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isRulesVisible, setIsRulesVisible] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  const [isLoad, setLoad] = useState(true); // This is how you won't have a very quick rendering of the other components

  const openSlidingPane = () => {
    setIsPaneOpen(true);
  };

  const closeSlidingPane = () => {
    setIsPaneOpen(false);
  };
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
    setIsCardsVisible(false);
    setLoad(false);
  };

  const handleAboutButtonClick = () => {
    setIsAboutVisible(!isAboutVisible);
    setIsLoreVisible(false); // Close the Lore component if open
    setIsRulesVisible(false); // Close the Rules if open
    setIsCardsVisible(false);
    setLoad(false);
  };

  const handleRulesButtonClick = () => {
    setIsRulesVisible(!isRulesVisible);
    setIsLoreVisible(false);
    setIsAboutVisible(false); 
    setIsCardsVisible(false);
    setLoad(false);
  };
  
  const handleCardsButtonClick = () => {
    setIsCardsVisible(!isCardsVisible);
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
      {/* <NavBar auth={auth} logout={logout}onLeaderboardButtonClick={openSlidingPane} onLogoButtonClick={handleComponentClose} onCardsButtonClick={handleCardsButtonClick} onLoreButtonClick={handleLoreButtonClick} onAboutButtonClick={handleAboutButtonClick} onRulesButtonClick={handleRulesButtonClick} />
      <h4>This is the welcome page</h4>
      <p>Check out the rules page!</p> */}
      {/* <Chat /> */}
      <button onClick={handleModalOpen}>Play Now</button>
      <GameModal isOpen={modalOpen} onClose={handleModalClose}>
        <PhaserGame />
      </GameModal> 
      <br/>
      {/* <button className="nav-button-chat" onClick={openSlidingPane}>
        <img className="chat-logo" src={otherImages.chatSign} alt="Chat" />
      </button>
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
      </div> */}
      
      <SlidingPane
  isOpen={isPaneOpen}
  title="Sliding Pane Title"
  onRequestClose={closeSlidingPane}
  from="right"
>
  {/* Content of the sliding pane */}
  <p>This is the content of the sliding pane.</p>
  <Chat />
</SlidingPane>
    </div>
  );
};

export default Welcome;
