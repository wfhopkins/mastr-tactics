// import React, { useState, useEffect, useRef } from 'react';
// import '../styles/Parchment.css';
// import letterheadImage from '../images/letterhead.png';
// import archer from '../images/archer-one.png';
// import rogue from '../images/rogue-one.png';
// import sorcerer from '../images/sorcerer-one.png';
// import mage from '../images/mage-five.png';
// import templar from '../images/templar-one.png';

// const Cards = ({ onClose }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const containRef = useRef();
//   const parchmentRef = useRef();

//   useEffect(() => {
    
//     setIsVisible(true); // Trigger the animation when component mounts

//     //Function to adjust the height of the parchment based on the xontent
//     const adjustParchmentHeight = () => {
//       const content = containRef.current;
//       const parchment = parchmentRef.current;

//       const contentHeight = content.offsetHeight;
//       parchment.style.height = `${contentHeight}px`;
//     };

//     adjustParchmentHeight(); // Initial call of above function

//     window.addEventListener('resize', adjustParchmentHeight); //Listen for window resize to adjust parchment

//     //Clean-up
//     return () => {
//       window.removeEventListener('resize', adjustParchmentHeight);
//     };
//   }, []);

//   //Function for the close-button
//   const handleCardsClose = () => {
//     setIsVisible(false);
//     onClose();
//   };



import React, { useState, useEffect, useRef } from 'react';
import '../styles/Parchment.css'; // Make sure to import your CSS file
import letterheadImage from '../images/letterhead.png';
import archer from '../images/archer-one.png';
import rogue from '../images/rogue-one.png';
import sorcerer from '../images/sorcerer-one.png';
import mage from '../images/mage-five.png';
import templar from '../images/templar-one.png';

const Cards = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const parchmentRef = useRef();
  const containRef = useRef();

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when component mounts

    // Clean-up
    return () => {
      // Clean-up logic if needed
    };
  }, []);

  // Function for the close-button
  const handleCardsClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <main className={`cards-container`}>
       
      <svg>
        <filter id="wavy2">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
      <div id="parchment-2" ref={parchmentRef}></div>
      <div id="contain" className="parchment-text" ref={containRef} > 
      {/* put this above ref={containRef} */}
        <br />
        <br />
        <p id="labarum"><img src={letterheadImage} alt="Labarum" /></p>
        <p>
          This is the cards info page. Get to know your deck!
          <p id="cardImg"><img src={archer} alt="Archer" /></p>
          Born from the ancient woodlands of Dantriam, the Archer Faction embodies the spirit of precision and swiftness. 
          These skilled marksmen have honed their abilities to strike their enemies with uncanny accuracy, 
          their arrows finding their mark even amidst chaos. 
          Guided by their deep connection to nature, Archers are attuned to the ebb and flow of the world around them, 
          making them invaluable scouts and guardians of the realm. With bows drawn and hearts unyielding, 
          they stand as sentinels against any threat that would dare to disturb the tranquility of their homeland.
          <p id="cardImg"><img src={mage} alt="Mage" /></p>
          From the hallowed halls of ancient academies to secluded chambers hidden within mystical spires, 
          the Mage Faction harnesses the arcane forces that flow through Dantriam. 
          Masters of spells and incantations, Mages wield the very fabric of reality to unleash devastating elemental and ethereal powers upon their foes. 
          Their pursuit of knowledge is as boundless as the universe itself, 
          and their enigmatic wisdom often places them at the heart of both magical discovery and political intrigue. 
          With tomes of forgotten lore and staffs crackling with energy, 
          Mages stand ready to shape the fate of Dantriam with their unparalleled arcane might.
          <p id="cardImg"><img src={sorcerer} alt="Sorcerer" /></p>
          Emerging from the depths of ancient catacombs and hidden crypts, the Sorcerer Faction is the embodiment of the mystic and forbidden. 
          Drawing power from the shadows and the souls of the departed, 
          Sorcerers wield necromantic and dark arts that both terrify and intrigue. 
          These enigmatic spellcasters have forged pacts with ethereal entities and command armies of spectral minions. 
          Feared and often misunderstood, 
          the Sorcerers navigate the delicate balance between harnessing immense power and the ever-present threat of corruption. 
          In a world of light and darkness, they hold secrets that could reshape the destiny of Dantriam.
          <p id="cardImg"><img src={templar} alt="Templar" /></p>
          Forged in the crucible of unwavering faith and unyielding discipline, the Templar Faction stands as a bulwark against the encroaching shadows. 
          Clad in resilient armor and bearing symbols of devotion, Templars are warriors who draw strength from their resolute dedication to justice and honor. 
          Their martial prowess is matched only by their unshakeable conviction, 
          and they wield holy blessings and divine protection to shield their allies from harm. 
          From the imposing cathedrals to the battlefields, Templars are a beacon of hope, 
          inspiring others to rise above adversity and stand firm against the tides of chaos that threaten to engulf Dantriam.
          <p id="cardImg"><img src={rogue} alt="Rogue" /></p>
          In the alleyways, rooftops, and hidden corners of Dantriam's cities, the Rogue Faction thrives as the masters of stealth and subterfuge. 
          Agile and cunning, Rogues employ their unparalleled dexterity to navigate the urban labyrinth with finesse, 
          becoming adept thieves, spies, and assassins. Their allegiance may be elusive, but their loyalty to the realm is undeniable. 
          With daggers that strike swiftly and unseen, Rogues dance between the lines of morality, their actions often shrouded in mystery. 
          As shadows lengthen and intrigues deepen, 
          the Rogue Faction's expertise becomes an essential tool for uncovering the truths that lie beneath the surface of the kingdom's façade.

        </p>
        <p className="cachet"><img src="https://i.postimg.cc/4NBYNqCR/22.png" alt="Cachet" /></p>
        <div className="button-signature-container">
          <button className="close-button" onClick={handleCardsClose}>X</button>
          <div id="signature">Patrick Tumu<br />William Hopkins <br /> Jordan Dennis </div>
        </div>
      </div>
    </main>
  );
};

export default Cards;
