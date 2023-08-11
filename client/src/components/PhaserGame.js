import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import { cardImages, otherImages  } from '../assets.js'
import letterhead from '../images/letterhead.png'
import Card from '../helpers/card.js';
import Dealer from '../helpers/dealer.js';
import Zone from '../helpers/zone.js';

const PhaserGame = () => {
  // Create a reference to the game container element
  const gameContainerRef = useRef(null);
  // all game runtime code inside useEffect..
  useEffect(() => {
    let fpsMeter = 0;
    // any preloaded assets should be here.
    function preload() {
      //console.log("Loading..", cardImages);
    // console.log("back of card: ", backOfCard);
    this.load.image('letterhead', letterhead)

    this.load.image('backdrop', otherImages.backdrop);
      
      for (let cardImage in cardImages) {
        this.load.image(cardImage, cardImages[cardImage])
      }
      this.load.image("cardBack", otherImages.cardBack)


    };
    // main game loop
    function create() {
      const game = this;
      
      const backdrop = game.add.image(10, 10, "backdrop");
      backdrop.setScale(1);

      fpsMeter = game.add.text(20, 20, 'FPS: ' + fpsMeter, { font: '' });
      
      this.add.image(315, 220, 'letterhead').setScale(0.25);

      this.add.rectangle(550, 155, 70, 100, '0xf5f5f5');
      this.add.text(515, 150, 'DISCARD', {color: '0xfffff'});
      this.add.sprite(550, 290, 'cardBack').setScale(0.125);


      this.zone = new Zone(this);
      this.dropZone = this.zone.renderZone();
      this.outline = this.zone.renderOutline(this.dropZone);


      const playerHand = this.add.group();
      for (let i = 0; i < 5; i++) {
        const sprite = this.add.sprite(190 + (i * 60), 400, 'archer1').setScale(0.12);
        playerHand.add(sprite);
      }

      const opponentHand = this.add.group();
      for ( let i = 0; i < 5; i++) {
        const sprite = this.add.sprite(190 + (i * 60), 40, 'cardBack').setScale(0.09);
        opponentHand.add(sprite);
      }

    }


      // for (let cardImage in cardImages) {
      //   const cardPhys = game.physics.add.image(Math.random() * 400, Math.random() * 300, cardImage);
      //   cardPhys.setScale(0.2)
      //   cardPhys.setVelocity(Math.random() * 200, Math.random() * 200);
      //   cardPhys.setBounce(1, 1);
      //   cardPhys.setCollideWorldBounds(true);
      // }
      // const cardBack = game.add.image(200,200, "cardBack");
      // cardBack.setScale(0.2);
    // };
    
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
      backgroundColor: '#000',
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
      },
      // callbacks: {
      //   postBoot: (game) => {
      //     game.canvas.style.backgroundImage = 'backdrop')`;
      //     game.canvas.style.backgroundSize = 'cover';
      //   }
      // }
    });

  }, []); // Run this effect only once after initial render

  // Render the game container element with a specified size
  return <div 
    ref={gameContainerRef} 
    style={{ width: '75%', height: '75%' }} 
  />;
};

export default PhaserGame;





