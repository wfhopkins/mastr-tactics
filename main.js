const { Player, Card, Deck } = require("./src/game_class")

const example = new Deck(["Magician","Archer","Sorcerer","Templar","Rogue"]);


const factions = ["Magician","Archer","Sorcerer","Templar","Rogue"];


// set up piles of cards: Collections (as deck, player.hand and discard pile)
const deck = new Deck(factions);
const discard_pile = new Collection();

// make some players
const player1 = new Player("Fred", deck); 
const player2 = new Player("Barney", deck);

// setup loop condition
let done = false;

// run demo loop
while (!done) {

  // print out the state of each pile of cards, and some commands

  console.clear();
  console.log("Deck")
  console.log(deck.getCollection());
  console.log(player1.name);
  console.log(player1.hand.getCollection());
  console.log(player2.name);
  console.log(player2.hand.getCollection());
  console.log("Discard pile", discard_pile.getCollection());
  console.log("");
  const options = 
    `q - quit\n`+
    `b - give a random card from ${player1.name} -> ${player2.name}\n`+
    `f - give a random card from ${player2.name} -> ${player1.name}\n`+
    `1 - discard a card from ${player1.name}\n`+
    `2 - discard a card from ${player2.name}\n`+
    ``;
  console.log(options);

  // get a command from user
  key = readlineSync.keyIn('Pick..');
  
  switch (key) {
    case "q" : done = true; break;
    case "b" : player2.hand.receiveCard(player1.hand.giveRandomCard()); break;
    case "f" : player1.hand.receiveCard(player2.hand.giveRandomCard()); break;
    case "1" : discard_pile.receiveCard(player1.hand.giveRandomCard()); break;
    case "2" : discard_pile.receiveCard(player2.hand.giveRandomCard()); break;
    default : break;
  }
}
console.log("Quitting..");
