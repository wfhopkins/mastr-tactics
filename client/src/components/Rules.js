import React, { useState, useEffect, useRef } from 'react';
import '../styles/Parchment.css';
import letterheadImage from '../images/letterhead.png';
import { cardImages, otherImages  } from '../assets.js'


const Rules = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containRef = useRef();
  const parchmentRef = useRef();

  
  useEffect(() => {
    
    setIsVisible(true); // Trigger the animation when component mounts
    
    //Function to adjust the height of the parchment based on the xontent
    const adjustParchmentHeight = () => {
      const content = containRef.current;
      const parchment = parchmentRef.current;

      const contentHeight = content.offsetHeight;
      parchment.style.height = `${contentHeight}px`;
    };

    adjustParchmentHeight(); // Initial call of above function

    window.addEventListener('resize', adjustParchmentHeight); //Listen for window resize to adjust parchment

    //Clean-up
    return () => {
      window.removeEventListener('resize', adjustParchmentHeight);
    };
  }, []);

  //Function for the close-button
  const handleRulesClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <main className={`rules-container`}>
       
      <svg>
        <filter id="wavy2">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
      <div id="parchment" ref={parchmentRef}></div>
      <div id="contain" className="parchment-text" ref={containRef}>
        <br />
        <br />
        <p id="labarum"><img src={letterheadImage} alt="Labarum" /></p>
        <p>
          M.A.S.T.R Tactics
          Welcome to the world of M.A.S.T.R Tactics, an expanded version of Rock, Paper, Scissors set
          in a world of medieval fantasy!
          <br />
          <br />
          2 Players
          <br />
          Game Time ~5 mins
          <br />
          25 Card Deck
          <br />
          5 of each Faction (Mage, Archer, Sorcerer, Templar, Archer) Ranked 1-5
          <br />
          <br />
          The game begins with 2 players and a shared deck of 25 cards.
          Both players draw a hand of 5 cards from the deck.
          Players place 3 cards from their hand onto the board face down in columns like so:
          <p id="rulesImage"><img src={otherImages.rulesImage3} alt="rules3" /></p>
          Once both players have placed 3 cards on the board, the cards are revealed one at a time and
          they battle!
          <p id="rulesImage"><img src={otherImages.rulesImage2} alt="rules2" /></p>
          Use the MASTR wheel to see who wins the battle! If the Factions being compared are the
          same, the one with the higher Rank wins.
          For each battle, the winner scores 1 point. A total of 3 points can be won during this part of the
          game.
          <br />
          <br />
          Once all 3 battles have finished, it is time for a team battle! Add up the Rank of your Factions in
          play and the player with highest Rank wins an extra 2 points! If both players have a team of the
          same rank, they are each awarded 1 point.
          <br />
          <br />
          Once all battles have been completed, cards on the board are put in the discard pile and both
          players draw from the deck until they have 5 cards in hand. Then the next round begins!
          The game ends on the turn when a player hits 25 points. This means that if a player breaks 25
          during the team battle, the game ends immediately. However, if a player breaks 25 during the
          1on 1 battles, the full turn will continue until the team skirmish has finished and total scores will
          be compared.
          <p id="rulesImage"><img src={otherImages.rulesImage} alt="rules" /></p>
          
          If two players hit 25 in the same turn, it is a DRAW!
          It is simple to learn, fun to play, and challenging to MASTR!
          Think it is all up to chance?
          <br />
          <br />
          Keep an eye on the cards in your hand and the cards in the discard pile to get a better sense of
          the cards your opponent may have. Consider focusing on trying to play high rank factions to
          win the team battle even if you do not win the 1 on 1. There are plenty of strategies to explore,
          get playing and see if you can reach the High Score!
        </p>
        <p className="cachet"><img src="https://i.postimg.cc/4NBYNqCR/22.png" alt="Cachet" /></p>
        <div className="button-signature-container">
          <button className="close-button" onClick={handleRulesClose}>X</button>
          <div id="signature">Patrick Tumu<br />William Hopkins <br /> Jordan Dennis </div>
        </div>
      </div>
    </main>
  );
};

export default Rules;
