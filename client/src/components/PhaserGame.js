import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import { cardImages, otherImages  } from '../assets.js'


const PhaserGame = () => {
  // Create a reference to the game container element
  const gameContainerRef = useRef(null);
  // all game runtime code inside useEffect..
  useEffect(() => {
    let fpsMeter = 0;
    // any preloaded assets should be here.
    function preload() {
      //console.log("Loading..", cardImages);
      for (let cardImage in cardImages) {
        this.load.image(cardImage, cardImages[cardImage])
      }
      this.load.image("cardBack", otherImages.cardBack)

    };
    // main game loop
    function create() {
      const game = this;

      fpsMeter = game.add.text(20, 20, 'FPS: ' + fpsMeter, { font: '' });
      
      // for (let cardImage in cardImages) {
      //   const cardPhys = game.physics.add.image(Math.random() * 400, Math.random() * 300, cardImage);
      //   cardPhys.setScale(0.2)
      //   cardPhys.setVelocity(Math.random() * 200, Math.random() * 200);
      //   cardPhys.setBounce(1, 1);
      //   cardPhys.setCollideWorldBounds(true);
      // }
      const cardBack = game.add.image(Math.random() * 400, Math.random() * 300, "cardBack");
      cardBack.setScale(0.2);
    };
    
    
    function update() { 
      const loopStatus = this.sys.game.loop;
      fpsMeter.setText("FPS :" + loopStatus.actualFps);     
    };

    
    // Creat phaser game with various configuration options
    new Phaser.Game({
      type: Phaser.AUTO, // Use the best rendering method available
      parent: gameContainerRef.current, // Attach the game canvas to the container element
      width: 600, // Set the canvas width
      height: 450, // Set the canvas height
      physics: {
        default: 'arcade', 
        arcade: {
          gravity: {
            y: 200
          }
        }
      },
      scene: {  // use functions from above
        preload: preload,
        create: create,
        update: update,
      }
    });

  }, []); // Run this effect only once after initial render

  // Render the game container element with a specified size
  return <div 
    ref={gameContainerRef} 
    style={{ width: '75%', height: '75%' }} 
  />;
};

export default PhaserGame;





