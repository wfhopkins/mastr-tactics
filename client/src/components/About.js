import React, { useEffect, useRef, useState } from 'react';
import '../styles/Parchment.css';
import letterheadImage from '../images/letterhead.png';

const About = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containRef = useRef();
  const parchmentRef = useRef();
  useEffect(() => {
    // Trigger the animation when component mounts
    setIsVisible(true);

    // Function to adjust the height of the parchment based on content *I think this is working
    const adjustParchmentHeight = () => {
      const content = containRef.current;
      const parchment = parchmentRef.current;

      const contentHeight = content.offsetHeight;
      parchment.style.height = `${contentHeight}px`;
    };

    adjustParchmentHeight(); // Initial call above function

    window.addEventListener('resize', adjustParchmentHeight);//Listen for window resize to adjust parchment dynamically

    //Clean-up
    return () => {
      window.removeEventListener('resize', adjustParchmentHeight);
    };
  }, []);

  //Function to handle the closing of About.js
  const handleAboutClose = () => {
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
          MASTR Tactics was developed as a final project for the Lighthouse Labs Web Development
          Bootcamp. The team working on the game consisted of William Hopkins, Jordan Dennis, and
          Patrick Tumu.
          <br />
          <br />
          Applying their new-found coding skills to develop a game seemed like a fun way to continue
          our learning. Using a React framework and socket.io to build our connections, we also brought
          on Phaser, a library designed for game development.
          <br />
          <br />
          The game itself expands on the classic Rock, Paper, Scissors by adding two more objects and
          setting it in a fantasy world (rather than a desk with a rock on it).
          While this project was built for our Demo Day at school, there is hope to eventually deploy the
          game and make it accessible for anyone and everyone to play!
          <br />
          <br />
          Have any questions about the game or come across something that the rules do not cover?
          Reach out at email@mastrquestions.com
        </p>
        <p className="cachet"><img src="https://i.postimg.cc/4NBYNqCR/22.png" alt="Cachet" /></p>
        <div className="button-signature-container">
          <button className="close-button" onClick={handleAboutClose}>X</button>
          <div id="signature">Patrick Tumu<br />William Hopkins <br /> Jordan Dennis </div>
        </div>
      </div>
    </main>
  );
};

export default About;
