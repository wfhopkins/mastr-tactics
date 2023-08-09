// A player has a name, score and new hand drawn from
// a passed-in deck
class Player {

  // takes a card and adds it to this player's hand
  drawCard (deck) {
    this.hand.receiveCard(deck.giveCard());
  }

  // play a card into another pile
  playCard (card, discard_pile){
    discard_pile.receiveCard(this.hand.giveCard(card));
  }

}


// A card object contains the passed-in attributes of a specific card
class Card {
  constructor(factionValue, rankValue, idValue) {
    this.currentFaction = factionValue;
    this.currentRank = rankValue;
    this.currentId = idValue;
  }

  // getter/setter pairs for object properties.
  get rank() { return this.currentRank; }
  get faction() { return this.currentFaction; }
  get id() { return this.currentId; }
  
  set rank(newRank) { this.rank = newRank; }
  set faction(newFaction) { this.faction = newFaction; }
  set id(newId) { this.currentId = newId; }

  //provide a quick description of a card, in long or short form
  description(short) {
    if (short) {
      return this.currentFaction[0] + this.currentRank;
    }
    return `Level ${this.currentRank} ${this.currentFaction} (ID: ${this.currentId})\n`
  } 
}

// This is the parent class for all objects that are a collection of card objects
class Collection {
  constructor(cards) {
    if (cards) {
      this.cards = cards;
    } else this.cards = [];
  }

  // Choose a random index within the boundaries of the collection
  // and remove it from the array, then return that card
  giveRandomCard() {
    const randomIndex = Math.floor(Math.random()*this.cards.length);
    const card = this.cards.splice(randomIndex, 1);
    return card[0];
  }

  // Find a specific card in this collection, and remove it from
  // this collection, and return that cars
  giveCard(card) {
    index = this.cards.findIndex(card);
    if (index > -1) {
      const newCard = this.cards.splice(index, 1);
      console.log("Found card!");
      return newCard[0];
    } else {
      return undefined;
    }
  }

  // Add a passed card object to this collection
  receiveCard(card) {
    this.cards.push(card);
  }

  // Return a list of every card in this collection
  getCollection(verbosity) {
    let collectionList = ``;
    for (let item of this.cards) {
      collectionList += `${item.description(verbosity)}`;
    }
    return collectionList;
  }

}

// A deck is a type of collection, but constructs a new set of cards 
// of a passed-in array of faction types
class Deck extends Collection {
  constructor(factions) {
    const newDeck = [];
    for (let rankIndex = 1; rankIndex < 6; rankIndex++) {
      for (let factionIndex = 1; factionIndex < factions.length; factionIndex++) {
        const newCard = new Card(factions[factionIndex], rankIndex, (factionIndex-1) * 5 + (rankIndex-1));
        newDeck.push(newCard);
      }
    }
    this.currentDeck = newDeck;
  }
}

// A hand is a type of collection that lives inside a player object
// and takes 5 random cards from a deck when instantiated.
class Hand extends Collection {
  constructor(deck) {
    // inherited contructor makes empty hand
    super(); 
    // draw 5 random card from the deck
    this.receiveCard(deck.giveRandomCard());
    this.receiveCard(deck.giveRandomCard());
    this.receiveCard(deck.giveRandomCard());
    this.receiveCard(deck.giveRandomCard());
    this.receiveCard(deck.giveRandomCard());  
  }
}

module.exports = {
  Player,
  Deck,
  Hand,
  Card,
  Collection
}