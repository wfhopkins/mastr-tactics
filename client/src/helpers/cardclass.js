const SMALLCARDSCALE = 0.25;
const TINYCARDSCALE = 0.16;

// A player has a name, score and new hand drawn from
// a passed-in deck
class Player {
  constructor(deck){
    this.hand = new Hand(deck);
  };
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
  constructor(factionValue, rankValue, idValue, cardImageValue) {
    this.currentFaction = factionValue;
    this.currentRank = rankValue;
    this.currentId = idValue;
    this.currentCardImage = cardImageValue;
    this.currentPhaserName = factionValue.toString() + rankValue.toString();
  }

  // getter/setter pairs for object properties.
  get rank() { return this.currentRank; }
  get faction() { return this.currentFaction; }
  get id() { return this.currentId; }
  get image() { return this.currentCardImage; }
  get phaserName() { return this.currentPhaserName; }
  
  set rank(newRank) { this.rank = newRank; }
  set faction(newFaction) { this.faction = newFaction; }
  set id(newId) { this.currentId = newId; }
  set image(newCardImage) { this.currentCardImage = newCardImage; }
  set phaserName(newphaserName) { this.currentPhaserName = newphaserName; }

  //provide a quick description of a card, in long or short form
  description(short) {
    if (short) {
      return this.currentFaction[0] + this.currentRank;
    }
    console.log(`Level ${this.currentRank} ${this.currentFaction} (ID: ${this.currentId})\n`);
    return `Level ${this.currentRank} ${this.currentFaction} (ID: ${this.currentId})\n`
  } 
}

// This is the parent class for all objects that are a collection of card objects
class Collection {
  constructor(deck) {
    if (deck) {
      this.currentCards = deck;
    } else this.currentCards = [];
    this.facedownState = false;
    this.cardStack = [];
    this.stacked = false; //render as a stack?
    this.currentScale = SMALLCARDSCALE;
  }
  get cards() { return this.currentCards };
  get facedown() { return this.facedownState };
  get scale() { return this.currentScale };

  set cards(newCards) {this.currentCards = newCards};
  set facedown(newState) {this.facedownState = newState};
  set scale(newState) {this.currentScale = newState};

  // Choose a random index within the boundaries of the collection
  // and remove it from the array, then return that card
  giveRandomCard() {
    const randomIndex = Math.floor(Math.random()*this.currentCards.length);
    const card = this.currentCards.splice(randomIndex, 1);
    return card[0];
  }

  // Find a specific card in this collection, and remove it from
  // this collection, and return that cars
  giveCard(card) {
    const index = this.currentCards.findIndex(card);
    if (index > -1) {
      const newCard = this.currentCards.splice(index, 1);
      console.log("Found card!");
      return newCard[0];
    } else {
      return undefined;
    }
  }

  // Add a passed card object to this collection
  receiveCard(card) {
    this.currentCards.push(card);
  }

  // Return a list of every card in this collection
  getCollection(verbosity) {
    let collectionList = ``;
    for (let item of this.cards) {
      collectionList += `${item.description(verbosity)}`;
    }
    return collectionList;
  }

  showCards(game, x, y) {
    this.unshowCards();
    let cardImage = undefined;
    if (this.currentCards === []) {
      return;
    } else {
      for (let cardIndex = this.currentCards.length-1; cardIndex >= 0; cardIndex--) {
        if (this.facedown) {
          cardImage =  game.add.image(cardIndex * (this.stacked ? 2 : 20) + x, y, 'cardBack').setScale(this.currentScale);
        } else {
          cardImage =  game.add.image(cardIndex * (this.stacked ? 2 : 20) + x, y, this.currentCards[cardIndex].phaserName).setScale(this.currentScale);
        }
        this.cardStack.push(cardImage);
      }
    }
  }

  unshowCards() {
    this.cardStack.forEach((card) => {
      card.destroy();
    })
    this.cardStack = [];
  } 

}

// A deck is a type of collection, but constructs a new set of cards 
// of a passed-in array of faction types
class Deck extends Collection {
  constructor(factions, imageObj) {
    super();
    this.stack = true;
    const newDeck = [];
    for (let factionIndex = 0; factionIndex < factions.length; factionIndex++) {
      for (let rankIndex = 0; rankIndex < 5; rankIndex++) {
        const id = factionIndex * 5 + rankIndex;
        const image = factions[factionIndex] + (rankIndex + 1)
        const newCard = new Card(factions[factionIndex], rankIndex + 1, id, imageObj[image]);
        newDeck.push(newCard);
      }
    }
    this.cards = newDeck;
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
  Collection,
  SMALLCARDSCALE, 
  TINYCARDSCALE
}