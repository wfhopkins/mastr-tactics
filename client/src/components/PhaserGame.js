import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import { cardImages, otherImages } from '../assets.js'
import {Player, Deck, Hand, Card, Collection, Gamestate} from '../helpers/cardclass.js'
import { SMALLCARDSCALE, TINYCARDSCALE } from '../helpers/cardclass.js'

const factions = ["archer", "mage", "rogue", "sorcerer", "templar"];

// const showCards = (game, x, y, cards) => {
//   for (let cardIndex = cards.length-1; cardIndex >= 0; cardIndex--) {
//     // console.log(cards[cardIndex].phaserName);
//     // console.assert(game.textures.exists(cards[cardIndex].phaserName), `Key ${cards[cardIndex].phaserName} should exist`);
//     const cardBack = game.add.image(cardIndex * 20 + x, y, cards[cardIndex].phaserName);
//     cardBack.setScale(0.25);
//   }
// }

const PhaserGame = () => {
  // Create a reference to the game container element
  const gameContainerRef = useRef(null);
  // all game runtime code inside useEffect..
  useEffect(() => {
    // global game variables and constants;
    const deck = new Deck(factions, cardImages);
    const discardPile = new Collection();
    let player = undefined; 
    let fpsMeter = '';
    let debug = '';
    // any preloaded assets should be here.
    function preload() {
      this.load.image('backdrop', otherImages.backdrop);
      this.load.image('cardBack', otherImages.cardBack);
      this.load.image('scoreboard', otherImages.scoreboard);
      
      for (let card of deck.cards) {
        this.load.image(card.phaserName.toString(), card.image)
        //console.log(cardphaserName, card.image)
      };
      //if first player then...
      player = new Player(deck, "opponent_name");
      // then pass to other player otherwise wait for deck from ws
      // WS(tooppenent, deck);
      // else 

      //  wait_to_recieve_deck and playername;
      // OK, deck ready...
    };


    // main game loop    
    function create() {
      const game = this;
      let debugText = '';
      game.add.image(0, 0 , 'backdrop');

      //basic tempalte for eventaul dynamic score counter  (NEW)
      const scoreBoard = game.add.image(72, 250, 'scoreboard').setScale(SMALLCARDSCALE);
      const roundTracker = game.add.text(36, 203, 'Round ' + 5);
      const counter = game.add.text(33, 230, 14 + ' VS ' + 22);

      //placeholder for deck object
      //const deckHolder = game.add.sprite(530, 300, 'cardBack').setScale(TINYCARDSCALE);

      // boundary for discard pile
        const discardArea = game.add.rectangle(530, 140, 95, 135, '0x522c2');
        game.add.text(495, 130, 'DISCARD', {  fill: '#aaaaaa'});
        
      
      // game.input.once('pointerup', () =>
      // {
      //   player.hand.unshowCards(game);
      // });
      
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////

      console.log("deck", deck.cards.show);
      const gameState = new Gamestate(player, deck, discardPile)
      
      // loop: keep going until we get to 25
      // ready to play our turn
      // show our hand
      // show opponents "hand" (actually just five cardbacks of our own hand);
      // show the discard pile
      // show deck
      // show scoreboard (player: round, points, the names)
      // endloop if done

      ///////////////////////////////////// END GAME LOOP ////////////////////////////////////////
      ///////////////////////////////////// END GAME LOOP ////////////////////////////////////////
      ///////////////////////////////////// END GAME LOOP ////////////////////////////////////////
      ///////////////////////////////////// END GAME LOOP ////////////////////////////////////////

      fpsMeter = game.add.text(20, 20, 'FPS: ' + fpsMeter, { font: '' });
      debug = game.add.text(20, 40, debugText, { font: '' });    
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





