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

const PhaserGame = ({ socket }) => {
  // Create a reference to the game container element
  const gameContainerRef = useRef(null);
  // all game runtime code inside useEffect..
  useEffect(() => {
    // global game variables and constants;
    const deck = new Deck(factions, cardImages);
    const discardPile = new Collection();
    let player = undefined;
    let fpsMeter = "";
    let debug = "";
    // any preloaded assets should be here.
    function preload() {
      this.load.image("backdrop", otherImages.backdrop);

      // this.load.image('backdrop', otherImages.backdrop).displayWidth = 600;
      // this.load.image('backdrop', otherImages.backdrop).displayHeight = 800;

      this.load.image("cardBack", otherImages.cardBack);
      this.load.image("scoreboard", otherImages.scoreboard);

      for (let card of deck.cards) {
        this.load.image(card.phaserName.toString(), card.image);
        //console.log(cardphaserName, card.image)
      }
      //if first player then...
      player = new Player(deck, "opponent_name");
      player.hand.scale = TINYCARDSCALE;
      // then pass to other player otherwise wait for deck from ws
      // WS(tooppenent, deck);
      // else

      //  wait_to_recieve_deck and playername;
      // OK, deck ready...
    }

    // main game loop
    function create() {
      const game = this;
      let debugText = "";
      game.add.image(XRES / 2, YRES / 2, "backdrop").setDisplaySize(XRES, YRES);

      // phaser events emitter
      game.myEmitter = new Phaser.Events.EventEmitter();

      //empty arrays for cards in hand and in play
      let cardsInPlay = [''];
      let cardsInHand = [''];

      //basic tempalte for eventaul dynamic score counter  (NEW)
      let scoreboardX = 76;
      let scoreboardY = 400;
      const scoreBoard = game.add
        .image(scoreboardX, scoreboardY, "scoreboard")
        .setScale(SMALLCARDSCALE);
      const roundTracker = game.add.text(
        scoreboardX - 36,
        scoreboardY - 47,
        "Round " + 1
      );
      let counter = game.add.text(
        scoreboardX - 32,
        scoreboardY - 20,
        0 + " VS " + 0
      );

      

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
        80,
        115,
        "0x304B5B"
      );
      game.add.text(498, YRES / 2 - 160, "DISCARD", { fill: "#aaaaaa" });

      // game.input.once('pointerup', () =>
      // {
      //   player.hand.unshowCards(game);
      // });      

      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////
      ///////////////////////////////////// BEGIN GAME LOOP //////////////////////////////////////

      console.log("deck", deck.cards.show);
      const gameState = new Gamestate(player, deck, discardPile);

      // loop: keep going until we get to 25

      // ready to play our turn

      // show opponents hand
      const opponentHand = new Collection();
      for (let count = 0; count < 5; count++) {
        opponentHand.receiveCard(new Card("dummy", 1, count, "cardBack"));
      }
      opponentHand.scale = TINYCARDSCALE;
      opponentHand.facedown = true;


      // // Show the players hand
      // gameState.player.hand.showCards(game, XRES / 2 - 120, YRES - 100);

      //show opponents "hand" (actually just five cardbacks of our own hand);


      // show deck
      deck.facedown = true;
      deck.stacked = true;
      deck.scale = TINYCARDSCALE;
      deck.showCards(game, 510, YRES / 2 + 150);

      ////////////////////////THIS IS WHERE WE ARE TESTING////////////////////////////////






      // if (cardsInPlay === 3) {
      //   readyButton.on('pointerup', () => {
      //     game.myEmitter.emit('battle start')
      //   }) 
      // }
      // show scoreboard (player: round, points, the names)
      // endloop if done

      //POSITION ONE x:
      //POSTION 


      /////////////////////////////////////SCENE ONE/////////////////////////////////
      //   opponentHand.showCards(game, XRES / 2 - 120, YRES - 700);
      // let gameOverText = this.add.text(300, 400, 'READY FOR BATTLE', { fontSize: '32px', fill: '#fff' });
      // gameOverText.visible = false;
      // gameOverText.setOrigin(0.5)

      let battle = this.add.text(300, 400, 'BATTLE!', { fontSize: '32px', fill: '#fff' });
      battle.visible = false;
      battle.setOrigin(0.5)

      let teamBattle = this.add.text(300, 400, 'TEAM BATTLE', { fontSize: '32px', fill: '#fff' });
      teamBattle.visible = false;
      teamBattle.setOrigin(0.5)


      let battleText1 = this.add.text(XRES / 2 - 100, YRES - 600, '+1', { fontSize: '32px', fill: '#fff' });
      battleText1.visible = false;
      battleText1.setOrigin(0.5);

      let battleText2 = this.add.text(XRES / 2, YRES - 350, '+1', { fontSize: '32px', fill: '#fff' });
      battleText2.visible = false;
      battleText2.setOrigin(0.5);

      let battleText3 = this.add.text(XRES / 2 + 100, YRES - 600, '+1', { fontSize: '32px', fill: '#fff' });
      battleText3.visible = false;
      battleText3.setOrigin(0.5);

      let teamPoint = this.add.text(XRES / 2, YRES - 600, '+2', { fontSize: '32px', fill: '#fff' });
      teamPoint.visible = false;
      teamPoint.setOrigin(0.5);

      // ready button after cards are played for turn
      const readyButton = this.add.text(500, 720, 'READY')
      readyButton.setInteractive({
        useHandCursor: true,
      });

      // readyButton.on('pointerup', () => {
      //   gameOverText.visible = true
      // })

      readyButton.on('pointerup', () => {
        battle.visible = true
        setTimeout(() => {
          cardSprite7.setTexture('archer4'); // flip Opponent Card 1
        }, 500) // flip opp card 1

        setTimeout(() => {
          battle.visible = false
        }, 750) // flip opp card 1

        setTimeout(() => {
          counter.text = 1 + " VS " + 0
          battleText1.visible = true
        }, 1000) // score first battle

        setTimeout(() => {
          cardSprite8.setTexture('rogue1')
        }, 2000) // flip card two

        setTimeout(() => {
          counter.text = 1 + " VS " + 1
          battleText2.visible = true
        }, 3000) // score second battle

        setTimeout(() => {
          cardSprite9.setTexture('sorcerer1')
        }, 4000) // flip card 3

        setTimeout(() => {
          counter.text = 2 + " VS " + 1
          battleText3.visible = true
        }, 5000) // score third battle

        setTimeout(() => {
          battleText1.visible = false;
          battleText2.visible = false;
          battleText3.visible = false;
        }, 6000) // remove points

        setTimeout(() => {
          teamBattle.visible = true;
        }, 6500) // announce team battle

       

        setTimeout(() => {
          counter.text = 4 + " VS " + 1
          teamPoint.visible = true;
        }, 7500) // score team battle

        setTimeout(() => {
          cardSprite1.x = 531
          cardSprite1.y = 250
          cardSprite2.x = 531
          cardSprite2.y = 250
          cardSprite3.x = 531
          cardSprite3.y = 250
          
        }, 9000) // Discard opponent hand
        
        setTimeout(() => {
          teamPoint.visible = false;
          teamBattle.visible = false;
        }, 9500) // remove text
        
        
        setTimeout(() => {
          cardSprite7.x = 531
          cardSprite7.y = 250
          cardSprite8.x = 531
          cardSprite8.y = 250
          cardSprite9.x = 531
          cardSprite9.y = 250
          
        }, 10000) // Discard opponent hand

        setTimeout(() => {
          cardSprite10.setTexture('mage4')
          cardSprite10.x=XRES / 2 - 120
          cardSprite10.y=YRES - 100
          cardSprite11.x=XRES/2
          cardSprite11.y=YRES - 700

        }, 10500) // remove text

        setTimeout(() => {
          cardSprite12.setTexture('templar3')
          cardSprite12.x=XRES / 2 - 60
          cardSprite12.y=YRES - 100
          cardSprite13.x=XRES/2 + 60
          cardSprite13.y=YRES - 700

        }, 11000) // remove text

        setTimeout(() => {
          cardSprite17.setTexture('templar4')
          cardSprite17.x=XRES / 2
          cardSprite17.y=YRES - 100
          cardSprite18.x=XRES/2 + 120
          cardSprite18.y=YRES - 700
          roundTracker.text = "Round " + 2
        }, 11500) // remove text
      });

      //   setTimeout(() => {
      //     cardSprite9.setTexture('templar5');


      const cardSprite1 = game.add
        .sprite(XRES / 2 - 120, YRES - 100, "archer1")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });
      const cardSprite2 = game.add
        .sprite(XRES / 2 - 60, YRES - 100, "mage2")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });
      const cardSprite3 = game.add
        .sprite(XRES / 2, YRES - 100, "templar3")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });
      const cardSprite14 = game.add
        .sprite(XRES / 2 + 60, YRES - 100, "rogue5")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

      const cardSprite15 = game.add
        .sprite(XRES / 2 + 120, YRES - 100, "sorcerer1")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });
      // THIS IS READY TO PLAY POSITION ONE 200, 525
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
      /////////////////////////////////////SCENE ONE/////////////////////////////////

      //opponentHand.showCards(game, XRES / 2 - 120, YRES - 700);
      const cardSprite4 = game.add
        .sprite(XRES / 2 - 60, YRES - 700, "cardBack")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });
      const cardSprite5 = game.add
        .sprite(XRES / 2 - 120, YRES - 700, "cardBack")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

      const cardSprite7 = game.add
        .sprite(XRES / 2 - 100, YRES - 500, "cardBack")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

      const cardSprite8 = game.add
        .sprite(XRES / 2, YRES - 500, "cardBack")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

      const cardSprite9 = game.add
        .sprite(XRES / 2 + 100, YRES - 500, "cardBack")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

        const cardSprite10 = game.add                    ///////////////FROM THE DECK
        .sprite(510, YRES/2 + 150, "cardBack")
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

        const cardSprite11 = game.add
        .sprite(510, YRES/2 + 150, "cardBack") ///////////////FROM THE DECK
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

        const cardSprite12 = game.add
        .sprite(510, YRES + 150, "cardBack") ///////////////FROM THE DECK
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

        const cardSprite13 = game.add
        .sprite(510, YRES + 150, "cardBack") ///////////////FROM THE DECK
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

        const cardSprite17 = game.add
        .sprite(510, YRES + 150, "cardBack") ///////////////FROM THE DECK
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });

        const cardSprite18 = game.add
        .sprite(510, YRES + 150, "cardBack") ///////////////FROM THE DECK
        .setScale(TINYCARDSCALE)
        .setInteractive({
          useHandCursor: true,
        });




      // // Listen for the 'pointerdown' event on the sprite
      // cardSprite1.on("pointerdown", () => {
      // console.log("Front End Card clicked!");
      // socket.emit('gameTest');
      // });










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
