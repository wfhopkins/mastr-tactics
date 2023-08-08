import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';

/*
What is this? 
This component initializes a Phaser game within a designated container element and sets its dimensions.
The component can be rendered in your application to display the Phaser game canvas.
*/

const PhaserGame = () => {
  // Create a reference to the game container element
  const gameContainerRef = useRef(null);

  useEffect(() => {
    // Phaser game configuration options
    const config = {
      type: Phaser.AUTO, // Use the best rendering method available
      parent: gameContainerRef.current, // Attach the game canvas to the container element
      width: 500, // Set the canvas width
      height: 450, // Set the canvas height
    
    };

    // Create a new Phaser game instance using the configuration
    new Phaser.Game(config);
  }, []); // Run this effect only once after initial render

  // Render the game container element with a specified size
  return <div ref={gameContainerRef} style={{ width: '75%', height: '75%' }} />;
};

export default PhaserGame;





