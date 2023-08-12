import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import { cardImages, otherImages  } from '../assets.js'
import {Player, Deck, Hand, Card, Collection} from '../helpers/cardclass.js'

const factions = ["archer", "mage", "rogue", "sorcerer", "templar"]

const showCards = (game, x, y, cards) => {
  for (let cardIndex = cards.length-1; cardIndex >= 0; cardIndex--) {
    // console.log(cards[cardIndex].phaserName);
    // console.assert(game.textures.exists(cards[cardIndex].phaserName), `Key ${cards[cardIndex].phaserName} should exist`);
    const cardBack = game.add.image(cardIndex * 20 + x, y, cards[cardIndex].phaserName);
    cardBack.setScale(0.25);
  }
}

const PhaserGame = () => {
  // Create a reference to the game container element
  const gameContainerRef = useRef(null);
  // all game runtime code inside useEffect..
  useEffect(() => {
    // global game variables and constants;
    const deck = new Deck(factions, cardImages);
    let player = undefined; 
    let fpsMeter = '';
    let debug = '';
    // any preloaded assets should be here.
    function preload() {
      this.load.image('backdrop', otherImages.backdrop);
      this.load.image('cardBack', otherImages.cardBack);
      
      // const key = deck.cards[0];
      // console.log(key.phaserName, key.image);
      // this.load.image(key.phaserName,key.image);
      // console.assert(this.textures.exists(key.phaserName), `Key ${key.phaserName} should exist`);
      for (let card of deck.cards) {
        this.load.image(card.phaserName.toString(), card.image)
        //console.log(cardphaserName, card.image)
      };

      player = new Player(deck);
      // console.log(Object.keys(otherImages))
      // for (let image of Object.keys(otherImages)) {
      //   const phaserName = image;
      //   const phaserPath = otherImages[image];
      //   console.log(phaserName, phaserPath);
      //   this.load.image(phaserName, phaserPath)
      // };
    };


    // main game loop    
    function create() {
      const game = this;
      game.add.image(10,10, 'backdrop');
      fpsMeter = game.add.text(20, 20, 'FPS: ' + fpsMeter, { font: '' });
      debug = game.add.text(20, 40, 'Debug:', { font: '' });
      // for (let card of deck.cards) {
      //   const cardPhys = game.physics.add.image(Math.random() * 400, Math.random() * 300, card.phaserName);
      //   cardPhys.setScale(0.2)
      //   cardPhys.setVelocity(Math.random() * 200, Math.random() * 200);
      //   cardPhys.setBounce(1, 1);
      //   cardPhys.setCollideWorldBounds(true);
      //   debug.setText(card.phaserName);
      // }
      
      // for (let card of deck.cards) {
      //   const cardPhys = game.add.image(Math.random() * 400, Math.random() * 300, card.phaserName);
      //   cardPhys.setScale(0.2);
      //   debug.setText(card.phaserName);
      // }


      //showCards(this, 50, 50, player.hand.cards);


      // const key = deck.cards[0];
      // console.log(key.phaserName, key.image);
      // console.assert(this.textures.exists(key.phaserName), `Key ${key.phaserName} should exist`);
      // game.add.image(0, 20, key.phaserName);

      showCards(this, 100 ,100, deck.cards);
      showCards(this, 100 ,200, player.hand.cards);
      console.log("deck", deck.cards);
      console.log("hand", player.hand.cards);



      // game.add.image(0, 20, key.phaserName);
        //console.log(typeof player.hand.cards[0].phaserName);
        //game.add.image(0, 20, player.hand.cards[0].phaserName.toString();

        // const key = player.hand.cards[0].phaserName;
        // console.log(key);
        // console.assert(this.textures.exists(key), `Texture key ${key} should exist`);
      //(player.cards);
      
      debug.setText(
        `> Deck: ${deck.getCollection(true)} \n` +
        `> ${player.hand.cards[0].phaserName} \n`
      );
    };
    
    function update() { 
      const loopStatus = this.sys.game.loop;
      fpsMeter.setText("FPS :" + loopStatus.actualFps);  
      //debug.setText(debugBuffer);
    };

    function render() {

      // Camera
      //this.debug.cameraInfo('backdrop', 32, 32);
  
    }

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
        render: render,
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





