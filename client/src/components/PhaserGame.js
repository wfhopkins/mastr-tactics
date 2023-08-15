import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';
import { cardImages, otherImages } from '../assets.js'
import {Player, Deck, Hand, Card, Collection, Gamestate} from '../helpers/cardclass.js'
import { SMALLCARDSCALE, TINYCARDSCALE, XRES, YRES } from '../helpers/cardclass.js'

const factions = ["archer", "mage", "rogue", "sorcerer", "templar"];

// const showCards = (game, x, y, cards) => {
//   for (let cardIndex = cards.length-1; cardIndex >= 0; cardIndex--) {
//     // console.log(cards[cardIndex].phaserName);
//     // console.assert(game.textures.exists(cards[cardIndex].phaserName), `Key ${cards[cardIndex].phaserName} should exist`);
//     const cardBack = game.add.image(cardIndex * 20 + x, y, cards[cardIndex].phaserName);
//     cardBack.setScale(0.25);
//   }
// }

const PhaserGame = ( 
  // { socket, currentUser, opponent } 
) => {
  // const [gameEven, setMessages] = useState([]);
  // const [messageInput, setMessageInput] = useState('');

  // const handleSendCard = (testString) => {
  //   if (testString !== '') {
  //     //const cardEncoded = JSON.stringify(cardObj)
  //     const newMessage = {
  //       text: messageInput,
  //       from: currentUser,
  //       to: opponent,
  //     };
  //     socket.emit('privateMessage', cardEncoded);
  //     setMessageInput('');
  //   }
  // };



  // Create a reference to the game container element
  const gameContainerRef = useRef(null);
  // all game runtime code inside useEffect..
  useEffect(() => {

  //   socket.on('privateMessage', (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // }, [socket]);

    //debugging tools...
    let fpsMeter = '';
    let debug = '';

    //create game objects..
    let deck = undefined;
    let discardPile = undefined;
    let opponentHand = undefined;
    let player = undefined;
    
    
    function preload() {  
      // define 'this' alias..
      const game = this;


      //register images assets inside phaser...
      game.load.image('backdrop', otherImages.backdrop);
      game.load.image('cardBack', otherImages.cardBack)
      game.load.image('scoreboard', otherImages.scoreboard);
      
      for (let card in cardImages) {
        game.load.image(card, cardImages[card])
        //console.log(card, cardImages[card])
      };
      
      //define game objects...
      opponentHand  = new Hand      (game, 64, 100, TINYCARDSCALE, [] );
      discardPile   = new Collection(game, 64, 300, SMALLCARDSCALE, [] );
      deck          = new Deck      (game, 64, 500, SMALLCARDSCALE, factions, cardImages);
      player        = new Player    (game, XRES / 2 - 30, YRES - 120, TINYCARDSCALE, deck);
      
      //if first player then...
      // then pass to other player otherwise wait for deck from ws
      // WS(tooppenent, deck);
      // else 

      //  wait_to_recieve_deck and playername;
      // OK, deck ready...
    };


    // main game loop    
    function create() {
      // define 'this' alias..
      const game = this;

      let debugText = '';
      game.add.image(XRES / 2, YRES / 2 , 'backdrop').setDisplaySize(XRES, YRES)

      // cardSprite.setInteractive();

      //basic tempalte for eventaul dynamic score counter  (NEW)
      let scoreboardX = 76;
      let scoreboardY = 400;
      const scoreBoard = game.add.image(scoreboardX, scoreboardY, 'scoreboard').setScale(SMALLCARDSCALE)
      const roundTracker = game.add.text(scoreboardX - 36, scoreboardY - 47, 'Round ' + 5);
      const counter = game.add.text(scoreboardX - 39, scoreboardY - 20, 14 + ' VS ' + 22);

      discardPile.hidden = false;

      // fill the oppoenents hand with dummy cards, set their scale, and flip them face down
      for (let count = 0; count < 5; count++) {
        opponentHand.receiveCard(new Card(game, 0, 0, 'dummy', 1, count, 'cardBack'));
      }
      //opponentHand.facedown = true;
      opponentHand.showCards();

      // boundary for discard pile
      const discardArea = game.add.rectangle(530, YRES / 2 - 150, 95, 135, '0x522c2');
      game.add.text(495, YRES / 2 - 150, 'DISCARD', {  fill: '#aaaaaa'});
        
      
      // game.input.once('pointerup', () => {
      //   player.hand.unshowCards(game);
      // });
        

      //discardPile.receiveCard(player.hand.giveRandomCard());
      deck.receiveCard(player.hand.giveRandomCard());



      //deck.showCards();
      discardPile.showCards();
      player.hand.showCards();


      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////

      // console.log("deck", deck.cards.show);
      // const gameState = new Gamestate(player, deck, discardPile)
      
      // loop: keep going until we get to 25
      
      // ready to play our turn
      
      // show our hand
      
      
     

      // opponentHand.showCards(game, XRES / 2 - 30, YRES - 660);
      
      //cardSprite.on('pointerup', cardSprite.unshowCards , game);

      //show opponents "hand" (actually just five cardbacks of our own hand);
      
      // show the discard pile
      // show deck
      // deck.facedown = true;
      // deck.stacked = true;
      // deck.scale = SMALLCARDSCALE;
      // deck.showCards(game, 510, YRES / 2 + 150);

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
      // define 'this' alias..
      const game = this;

      const loopStatus = game.sys.game.loop;
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
      width: XRES, // Set the canvas width
      height: YRES, // Set the canvas height
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





