import React, { useState, useEffect } from 'react';
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



const Welcome = ({ auth, logout, socket }) => {
  //These are the state variables for managing component visibility
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoreVisible, setIsLoreVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isRulesVisible, setIsRulesVisible] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);
  const [opponentName, setOpponentName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoad, setLoad] = useState(true); // This is how you won't have a very quick rendering of the other components

  console.log("Socket prop:", socket);


  const handleReadyToPlay = () => {
    console.log("Ready to play button clicked");
    socket.emit('readyToPlay', auth.name); // Send "ready to play" message to backend
    setModalOpen(true);
    setIsLoreVisible(false);
    setIsAboutVisible(false);
    setIsRulesVisible(false);
    setIsCardsVisible(false);
  };

  useEffect(() => {
    socket.on('waitingForOpponent', () => {
      console.log("Front end receiving waiting for opponent")
      setIsWaitingForOpponent(true);
    });

    socket.on('gameStart', (opponent) => {
      setIsWaitingForOpponent(false);
      setOpponentName(opponent); // Store opponent's name
      setGameStarted(true); // Indicate that the game has started
    });

    return () => {
      socket.off('waitingForOpponent');
      socket.off('gameStart');

    };
  }, [socket]);



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
        <NavBar auth={auth} logout={logout} onLeaderboardButtonClick={openSlidingPane} onLogoButtonClick={handleComponentClose} onCardsButtonClick={handleCardsButtonClick} onLoreButtonClick={handleLoreButtonClick} onAboutButtonClick={handleAboutButtonClick} onRulesButtonClick={handleRulesButtonClick} />

        <button className="nav-button-chat" onClick={handleReadyToPlay}>
          <img className="chat-logo" src={otherImages.chatSign} alt="Play" />
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
        </div>

        <GameModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {isWaitingForOpponent ? (
            <p>Waiting for opponent...</p>
          ) : (
            <div>
              <PhaserGame />
              <Chat socket={socket} currentUser={auth.name} opponent={opponentName} />
            </div>
          )}
        </GameModal>

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
