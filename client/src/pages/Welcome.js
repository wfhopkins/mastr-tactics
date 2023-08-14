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
  //These are the state variables for managing component visibility and game event state
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



  //=============================Below is for Game Stuff ========================>
  // UseEffect to handle waiting for opponent and game start events
  useEffect(() => {
    socket.on('waitingForOpponent', () => {
      console.log("Front end receiving waiting for opponent")
      setIsWaitingForOpponent(true);
    });
    
    socket.on('gameStart', (opponent) => {
      setIsWaitingForOpponent(false);
      setOpponentName(opponent); // Store opponent's name
      setGameStarted(true); // Indicate that the game has started
      console.log('received the gamestart message ' , gameStarted )
      
    });
    
    return () => {
      socket.off('waitingForOpponent');
      socket.off('gameStart');
      
    };
  }, [socket]);

  useEffect(() => {
    console.log('received the gamestart message', gameStarted);
  }, [gameStarted]);
  
  const handleReadyToPlay = () => {
    console.log("Ready to play button clicked");
    socket.emit('readyToPlay', auth.name); // Send "ready to play" message to backend
    setModalOpen(true);
    setIsLoreVisible(false);
    setIsAboutVisible(false);
    setIsRulesVisible(false);
    setIsCardsVisible(false);
  };
   //=============================Below is for the sliding pane ========================>

  const openSlidingPane = () => {
    setIsPaneOpen(true);
  };

  const closeSlidingPane = () => {
    setIsPaneOpen(false);
  };
 
   //=============================Below is for Modal ========================>

  const handleModalClose = () => {
    if (gameStarted && opponentName) {
      const quitMessage = {
        text: "( Opponent Quit",
        to: opponentName,
      };
      socket.emit('privateMessage', quitMessage);
    }
    setModalOpen(false);
  };
  
  //=============================Below are the NavBar Buttons========================>

  const handleLoreButtonClick = () => {
    setIsLoreVisible(!isLoreVisible); // Toggle isVisible state
    setIsAboutVisible(false); // Close the About component if open
    setIsRulesVisible(false); // Close the Rules component if open
    setIsCardsVisible(false); // Close the Cards component if open
    setLoad(false);
  };

  const handleAboutButtonClick = () => {
    setIsAboutVisible(!isAboutVisible);
    setIsLoreVisible(false); 
    setIsRulesVisible(false); 
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

        <button className="nav-button-play" onClick={handleReadyToPlay}>
          <img className="chat-logo" src={otherImages.playSign} alt="Play" />
        </button>

        <button className="nav-button-leader" onClick={openSlidingPane}>
          <img className="leader-logo" src={otherImages.leaderboard} alt="Leaderboard" />
        </button>

        <img className="welcome-image" src={otherImages.welcomeImage} alt="welcome"/>

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

        <GameModal isOpen={modalOpen} onClose={handleModalClose}>
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
          title="Leaderboard Update"
          onRequestClose={closeSlidingPane}
          from="right"
          style={{
            background: 'linear-gradient(to right, #ff6b6b, #4ecdc4)',
            color: 'white',
          }}
        >
          {/* Content of the sliding pane */}
          <img className="leaderBoardImg" src={otherImages.leaderboadImage} alt="Leaderboard" />
        </SlidingPane>
      </div>


  );
};

export default Welcome;
