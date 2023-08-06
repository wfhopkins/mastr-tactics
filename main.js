const { Player, Card, Deck } = require("./src/game_class")

const example = new Deck(["Magician","Archer","Sorcerer","Templar","Rogue"]);

console.log("Original deck:", example.deck);
console.log("");
console.log("Drawing a card... ", example.pullCard());
console.log("");
console.log("Lost a card!: ",example.deck);