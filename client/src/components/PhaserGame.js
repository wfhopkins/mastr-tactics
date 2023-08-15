import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import { cardImages, otherImages } from "../assets.js";
import {
  Player,
  Deck,
  Hand,
  Card,
  Collection,
  Gamestate,
} from "../helpers/cardclass.js";
import {
  SMALLCARDSCALE,
  TINYCARDSCALE,
  XRES,
  YRES,
} from "../helpers/cardclass.js";

const factions = ["archer", "mage", "rogue", "sorcerer", "templar"];

// const showCards = (game, x, y, cards) => {
//   for (let cardIndex = cards.length-1; cardIndex >= 0; cardIndex--) {
//     // console.log(cards[cardIndex].phaserName);
//     // console.assert(game.textures.exists(cards[cardIndex].phaserName), `Key ${cards[cardIndex].phaserName} should exist`);
//     const cardBack = game.add.image(cardIndex * 20 + x, y, cards[cardIndex].phaserName);
//     cardBack.setScale(0.25);
//   }
// }

<<<<<<< HEAD
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



=======
const PhaserGame = ( {socket} ) => {
>>>>>>> main
  // Create a reference to the game container element
  const gameContainerRef = useRef(null);
  // all game runtime code inside useEffect..
  useEffect(() => {
<<<<<<< HEAD

  //   socket.on('privateMessage', (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // }, [socket]);

    //debugging tools...
    let fpsMeter = '';
    let debug = '';
=======
    // global game variables and constants;
    const deck = new Deck(factions, cardImages);
    const discardPile = new Collection();
    let player = undefined;
    let fpsMeter = "";
    let debug = "";
    // any preloaded assets should be here.
    function preload() {
      this.load.image("backdrop", otherImages.backdrop);
>>>>>>> main

    //create game objects..
    let deck = undefined;
    let discardPile = undefined;
    let opponentHand = undefined;
    let player = undefined;
    
    
    function preload() {  
      // define 'this' alias..
      const game = this;

<<<<<<< HEAD

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
      
=======
      this.load.image("cardBack", otherImages.cardBack);
      this.load.image("scoreboard", otherImages.scoreboard);

      for (let card of deck.cards) {
        this.load.image(card.phaserName.toString(), card.image);
        //console.log(cardphaserName, card.image)
      }
>>>>>>> main
      //if first player then...
      // then pass to other player otherwise wait for deck from ws
      // WS(tooppenent, deck);
      // else

      //  wait_to_recieve_deck and playername;
      // OK, deck ready...
    }

    // main game loop
    function create() {
      // define 'this' alias..
      const game = this;
<<<<<<< HEAD

      let debugText = '';
      game.add.image(XRES / 2, YRES / 2 , 'backdrop').setDisplaySize(XRES, YRES)

      // cardSprite.setInteractive();
=======
      let debugText = "";
      game.add.image(XRES / 2, YRES / 2, "backdrop").setDisplaySize(XRES, YRES);

      // phaser events emitter
      game.myEmitter = new Phaser.Events.EventEmitter();

      //empty arrays for cards in hand and in play
      let cardsInPlay = [''];
      let cardsInHand = [''];
>>>>>>> main

      //basic tempalte for eventaul dynamic score counter  (NEW)
      let scoreboardX = 76;
      let scoreboardY = 400;
      const scoreBoard = game.add
        .image(scoreboardX, scoreboardY, "scoreboard")
        .setScale(SMALLCARDSCALE);
      const roundTracker = game.add.text(
        scoreboardX - 36,
        scoreboardY - 47,
        "Round " + 5
      );
      const counter = game.add.text(
        scoreboardX - 39,
        scoreboardY - 20,
        14 + " VS " + 22
      );

<<<<<<< HEAD
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

=======
      // //basic tempalte for eventaul dynamic score counter  (NEW)
      // const scoreBoard = game.add.image(72, 250, 'scoreboard').setScale(SMALLCARDSCALE);
      // const roundTracker = game.add.text(36, 203, 'Round ' + 5);
      // const counter = game.add.text(33, 230, 14 + ' VS ' + 22);

      //placeholder for deck object
      //const deckHolder = game.add.sprite(530, 300, 'cardBack').setScale(TINYCARDSCALE);

      // boundary for the discard pile
      const discardArea = game.add.rectangle(
        530,
        YRES / 2 - 150,
        95,
        135,
        "0x522c2"
      );
      game.add.text(495, YRES / 2 - 150, "DISCARD", { fill: "#aaaaaa" });

      // game.input.once('pointerup', () =>
      // {
      //   player.hand.unshowCards(game);
      // });      
>>>>>>> main

      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////

<<<<<<< HEAD
      // console.log("deck", deck.cards.show);
      // const gameState = new Gamestate(player, deck, discardPile)
      
=======
      console.log("deck", deck.cards.show);
      const gameState = new Gamestate(player, deck, discardPile);

>>>>>>> main
      // loop: keep going until we get to 25

      // ready to play our turn
<<<<<<< HEAD
      
      // show our hand
      
      
     

      // opponentHand.showCards(game, XRES / 2 - 30, YRES - 660);
      
      //cardSprite.on('pointerup', cardSprite.unshowCards , game);
=======

      // show opponents hand
      const opponentHand = new Collection();
      for (let count = 0; count < 5; count++) {
        opponentHand.receiveCard(new Card("dummy", 1, count, "cardBack"));
      }
      opponentHand.scale = TINYCARDSCALE;
      opponentHand.facedown = true;


      // how the players hand
      gameState.player.hand.showCards(game, XRES / 2 - 120, YRES - 100);
      opponentHand.showCards(game, XRES / 2 - 120, YRES - 700);
>>>>>>> main

      //show opponents "hand" (actually just five cardbacks of our own hand);

  
      // show deck
<<<<<<< HEAD
      // deck.facedown = true;
      // deck.stacked = true;
      // deck.scale = SMALLCARDSCALE;
      // deck.showCards(game, 510, YRES / 2 + 150);
=======
      deck.facedown = true;
      deck.stacked = true;
      deck.scale = TINYCARDSCALE;
      deck.showCards(game, 510, YRES / 2 + 150);
>>>>>>> main

      ////////////////////////THIS IS WHERE WE ARE TESTING////////////////////////////////


      // ready button after cards are played for turn
      const readyButton = this.add.text(500, 720, 'READY')
      readyButton.setInteractive({
        useHandCursor: true,
      });




      if (cardsInPlay === 3) {
        readyButton.on('pointerup', () => {
          game.myEmitter.emit('battle start')
        }) 
      }
      // show scoreboard (player: round, points, the names)
      // endloop if done
      
      //POSITION ONE x:
      //POSTION 

    
<<<<<<< HEAD
    function update() { 
      // define 'this' alias..
      const game = this;

      const loopStatus = game.sys.game.loop;
      fpsMeter.setText("FPS :" + loopStatus.actualFps);  
      //debug.setText(debugBuffer);
=======
/////////////////////////////////////THIS IS WHERE WE ARE TESTING/////////////////////////////////
>>>>>>> main



const cardSprite1 = game.add
.sprite(100, 600, "archer1")
.setScale(TINYCARDSCALE)
.setInteractive({
useHandCursor: true,
});
const cardSprite2 = game.add
.sprite(150, 600, "mage2")
.setScale(TINYCARDSCALE)
.setInteractive({
useHandCursor: true,
});
const cardSprite3 = game.add
.sprite(200, 600, "templar3")
.setScale(TINYCARDSCALE)
.setInteractive({
useHandCursor: true,
});
// THIS IS READY TO PLAY POSITION ONE
cardSprite1.on('pointerup', () => {
  cardSprite1.x = 200
  cardSprite1.y = 525
})

// THIS IS READY TO PLAY POSITION TWO
cardSprite2.on('pointerup', () => {
  cardSprite2.x = 300
  cardSprite2.y = 525
})

// THIS IS READY TO PLAY POSITION THREE
cardSprite3.on('pointerup', () => {
  cardSprite3.x = 400
  cardSprite3.y = 525
})

// Listen for the 'pointerdown' event on the sprite
cardSprite1.on("pointerdown", () => {
console.log("Front End Card clicked!");
socket.emit('gameTest');
});



  // function handleHandClick(card, cardsInPlay) {
  //   if (cardsInPlay === 0){
  //     cardSprite1.on('pointerup', () => {
  //       cardSprite1.x += 100
  //       cardSprite1.y -= 100
  //     })
  //   }
  // 
  // if (cardsInPlay.includes(cardSprite1)) {
  //   cardSprite1.on('pointerup', () => {
  //     cardsInHand.push(cardSprite1)
  //     cardSprite1.setScale(TINYCARDSCALE)
  //   })
  // 
  // if (cardsInHand.includes(cardSprite1)) {
  //   cardSprite1.on("pointerup", () => {
  //     cardsInPlay.push(cardSprite1)
  //     cardSprite1.setScale(SMALLCARDSCALE);
  //   })
  // };





      
      ///////////////////////////////////// END GAME LOOP ////////////////////////////////////////
      ///////////////////////////////////// END GAME LOOP ////////////////////////////////////////
      ///////////////////////////////////// END GAME LOOP ////////////////////////////////////////
      ///////////////////////////////////// END GAME LOOP ////////////////////////////////////////

      fpsMeter = game.add.text(20, 20, "FPS: " + fpsMeter, { font: "" });
      debug = game.add.text(20, 40, debugText, { font: "" });
    }

    function update() {
      const loopStatus = this.sys.game.loop;
      fpsMeter.setText("FPS :" + loopStatus.actualFps);
      //debug.setText(debugBuffer);
    }

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
      backgroundColor: "#000",
      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            y: 200,
          },
        },
      },
      scene: {
        // use functions from above
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
  return <div ref={gameContainerRef} style={{ width: "75%", height: "75%" }} />;
};

export default PhaserGame;
