import React, { useEffect, useState, useRef } from 'react';
import '../styles/Parchment.css';
import letterheadImage from '../images/letterhead.png';

const Lore = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containRef = useRef();
  const parchmentRef = useRef();

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when component mounts

    const adjustParchmentHeight = () => { //Function that will adjust the height of the parchment based on content
      const content = containRef.current;
      const parchment = parchmentRef.current;

      const contentHeight = content.offsetHeight;
      parchment.style.height = `${contentHeight}px`;
    };

    adjustParchmentHeight(); // Initial call of above function

    window.addEventListener('resize', adjustParchmentHeight); // Listen for window resize to adjust parchment height dynamically

    // Cleanup: Remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', adjustParchmentHeight);
    };
  }, []);

  //Function to handle closing the Lore component
  const handleLoreClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <main className={`lore-container`}>
       
      <svg>
        <filter id="wavy2">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
      <div id="parchment" ref={parchmentRef}></div>
      <div id="contain" className="parchment-text" ref={containRef}>
        <p id="labarum"><img src={letterheadImage} alt="Labarum" /></p>
        <p>
          Welcome to the world of MASTR Tactics!
          In a new age of peace throughout the medieval kingdom of Dantriam, those who once
          waged great battles against epic monsters and sieges of invaders are growing restless. They
          have no desire for war to return to their land, but long for the thrill of battle and the chance to
          hone their skills and test their mettle.
          <br />
          <br />
          Thus came to be the MASTR games. Competitors from different factions come together
          to compete in a grand tournament. They face off in one on one matches before joining forces
          for a team showdown! The competitors have different strengths and weakness making them
          better matched facing some opponents over others.
          <br />
          <br />
          It falls to you to select which competitors will compete on the battlefield! Play your
          cards carefully and emerge the champion of the games!
          Easy to learn, fun to play, challenging to MASTR!
        </p>
        <p className="cachet"><img src="https://i.postimg.cc/4NBYNqCR/22.png" alt="Cachet" /></p>
        <div className="button-signature-container">
          <button className="close-button" onClick={handleLoreClose}>X</button>
          <div id="signature">Patrick Tumu<br />William Hopkins <br /> Jordan Dennis </div>
        </div>
      </div>
    </main>
  );
};

export default Lore;

