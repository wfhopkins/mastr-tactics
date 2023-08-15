const SMALLCARDSCALE = 0.24;
const TINYCARDSCALE = 0.16;
const XRES = 600;
const YRES = 800;

const winnerTable = {
  "archer" : ["sorcerer", "rogue"],
  "sorcerer" : ["templar", "mage"],
  "templar" : ["rogue", "archer"],
  "rogue"  :  ["mage", "sorcerer"],
  "mage" : ['archer', 'templar']
}



class Battlefield {
  constructor() {
    this.playerArea = new Collection();
    this.opponentArea = new Collection();
  };
}

class Gamestate {
  constructor(player, deck, discard) {
    this.player = player;
    this.battlefield = new Battlefield();
    this.deck = deck;
    this.discard = discard;
  }

  
  playToZone(card) {
    this.battlefield.player.receiveCard(card);  
  }

  doBattle() {
    let winner = undefined;
    let playerPoints = 0;
    if ((this.battlefield.playerArea.length === 3) && (this.battlefield.opponentArea.length === 3)) {
      for (let skirmish = 0; skirmish < this.battlefield.player.length - 1; skirmish++) {
        let victory = undefined;
        if (this.battlefield.playerArea[skirmish].faction  === this.battlefield.opponentArea[skirmish].faction) {
          if (this.battlefield.playerArea[skirmish].rank > this.battlefield.opponentArea[skirmish].rank) {
            winner = "player";
          } else {
            winner = "opponent";
          };
        }
        if (winnerTable[this.battlefield.playerArea[skirmish].faction].includes(this.battlefield.opponentAreaArea[skirmish].faction))
          this.player.addPoints(1);
          playerPoints++;
        };
        if (!winner) {
          const opponentPoints = 3 - playerPoints;
          if (playerPoints > opponentPoints) {
            winner = "player"

          } else {
            winner = "opponent"
          }
        }
    } else { return };

    let playerRankTotal = 0;
    let opponentRankTotal = 0;
    for (let skirmish = 0; skirmish < this.battlefield.player.length - 1; skirmish++) {
      playerRankTotal += this.battlefield.playerArea[skirmish].rank;
      opponentRankTotal += this.battlefield.opponentArea[skirmish].rank;

      this.discard.receiveCard(this.battlefield.playerArea[skirmish]);
      this.discard.receiveCard(this.battlefield.opponentArea[skirmish]);
    } 
    if (playerRankTotal === opponentRankTotal) {
      this.player.addPoints(1);
    }
    if (playerRankTotal > opponentRankTotal) {
      this.player.addPoints(2);
    };
  }
} 



// A player has a name, score and new hand drawn from
// a passed-in deck
class Player {
  constructor(game, x, y, scale, deck){
    this.hand = new Hand(game, x, y, scale, deck);
    this.currentPoints = 0;
  };

  set myTurn(newState) {this.turn = newState};
  set points(newPointCount) {this.currentPoints = newPointCount};

  get points() { return this.currentPoints};
  get myTurn() { return this.turn};
  
  addPoints(points) {this.points += points};

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
  constructor(game, x, y, scale, factionValue, rankValue, idValue, cardImageValue) {
    this.currentFaction = factionValue;
    this.currentRank = rankValue;
    this.currentId = idValue;
    this.currentCardImage = cardImageValue;
    this.currentPhaserName = factionValue.toString() + rankValue.toString();
    this.currentX = x;
    this.currentY = y;
    this.currentScale = scale;
    this.currentGame = game;
    this.currentHidden = false;
  }

  // getter/setter pairs for object properties.
  get rank() { return this.currentRank; }
  get faction() { return this.currentFaction; }
  get id() { return this.currentId; }
  get image() { return this.currentCardImage; }
  get phaserName() { return this.currentPhaserName; }
  get sprite() { return this.currentSprite; }
  get scale() { return this.currentScale; }
  get hidden() { return this.currentHidden; }

  set rank(newRank) { this.rank = newRank; }
  set faction(newFaction) { this.faction = newFaction; }
  set id(newId) { this.currentId = newId; }
  set image(newCardImage) { this.currentCardImage = newCardImage; }
  set phaserName(newphaserName) { this.currentPhaserName = newphaserName; }
  set sprite(newSprite) { this.currentSprite = newSprite; }
  set scale(newScale) { this.currentScale = newScale; }
  set X(x) {this.currentX = x; if (this.currentSprite) { this.currentSprite.setX(x)}}
  set Y(y) {this.currentY = y; if (this.currentSprite) { this.currentSprite.setY(y)}}
  set hidden(newState) { this.currentHidden = newState; }

  unshow() {
    console.log()
    if (this.currentSprite) { this.currentSprite.destroy(); };
  }

  show() {
    this.currentHidden ?
      this.currentGame.add.sprite(this.currentX, this.currentY, 'cardBack').setScale(this.currentScale) :
      this.currentGame.add.sprite(this.currentX, this.currentY, this.phaserName).setScale(this.currentScale);
  }

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
  constructor(game, x, y, scale, cardStack) {
    if (cardStack) {
      this.currentCards = cardStack;
    } else this.currentCards = [];
    // this.cardStack = [];
    this.stacked = true; //render as a stack by default
    this.basePositionX = x;
    this.basePositionY = y;
    this.currentScale = scale;
    this.currentGame = game;
    this.hidden = true;
  }
  get cards() { return this.currentCards };
  get scale() { return this.currentScale };

  set cards(newCards) {this.currentCards = newCards};
  set scale(newScale) {
    this.unshowCards();
    for (let cardIndex = this.currentCards.length-1; cardIndex >= 0; cardIndex--) {
      this.currentCards[cardIndex].scale = newScale;
    }
  };

  showCards() {
    this.unshowCards();
    this.organizeCards();
   
    if (this.currentCards === []) {
      return;
    } else {
      for (let cardIndex = this.currentCards.length-1; cardIndex >= 0; cardIndex--) {
        console.log("Showing at:", this.currentCards[cardIndex].currentX, this.currentCards[cardIndex].currentY)
        this.currentCards[cardIndex].show();
      }
    }
  }

  unshowCards() {
    // console.log("unshowing:", this.currentCards);
    for (let card of this.currentCards) {
      card.unshow();
    }

  } 

  organizeCards() {
    this.unshowCards();
    for (let cardIndex = this.currentCards.length-1; cardIndex >= 0; cardIndex--) {
      this.currentCards[cardIndex].X = cardIndex * (this.stacked ? 0 : 119) + this.basePositionX;
      this.currentCards[cardIndex].Y = this.basePositionY;
      this.currentCards[cardIndex].scale = this.currentScale;
      this.currentCards[cardIndex].hidden = this.hidden;
    }
  }

  // Choose a random index within the boundaries of the collection
  // and remove it from the array, then return that card
  giveRandomCard() {
    this.unshowCards();
    const randomIndex = Math.floor(Math.random()*this.currentCards.length);
    const card = this.currentCards.splice(randomIndex, 1);
    return card[0];
  }

  // Find a specific card in this collection, and remove it from
  // this collection, and return that cars
  giveCard(card) {
    this.unshowCards();
    const index = this.currentCards.findIndex(card);
    if (index > -1) {
      const newCard = this.currentCards.splice(index, 1);
      // console.log("Found card!");
      return newCard[0];
    } else {
      return undefined;
    }
  }

  // Add a passed card object to this collection
  receiveCard(card) {
    this.unshowCards();
    this.currentCards.push(card);
  }

  // Return a list of every card in this collection
  getCollection(verbosity) {
    let collectionList = ``;
    for (let item of this.currentCards) {
      collectionList += `${item.description(verbosity)}`;
    }
    return collectionList;
  }
}

// A deck is a type of collection, but constructs a new set of cards 
// of a passed-in array of faction types
class Deck extends Collection {
  constructor(game, x, y, scale, factions, sourceImagesObj) {
    super(game, x, y, scale, []);
    this.stacked = true;
    const newDeck = [];
    for (let factionIndex = 0; factionIndex < factions.length; factionIndex++) {
      for (let rankIndex = 0; rankIndex < 5; rankIndex++) {
        const id = factionIndex * 5 + rankIndex;
        const image = factions[factionIndex] + (rankIndex + 1)
        //console.log("current scale for card:", this.currentScale);
        const newCard = new Card(
          this.currentGame,  //game obj
          rankIndex * (this.stacked ? 0 : 119) + this.basePositionX, //x
          this.basePositionY, //y
          this.currentScale, //scale (from collection)
          factions[factionIndex], //faction name
          rankIndex + 1,  // rank
          id, //id
          sourceImagesObj[image]); //image source
        newDeck.push(newCard);
      }
    }
    this.cards = newDeck;
  }
}

// A hand is a type of collection that lives inside a player object
// and takes 5 random cards from a deck when instantiated.
class Hand extends Collection {
  constructor(game, x, y, scale, deck) {
    // inherited constructor makes empty collection for the hand
    super(game, x, y, scale, []); 
    this.stacked = false; //render as a stack?
    this.hidden = false;
    // draw 5 random card from the deck if there are any to draw..

    for (let index = 0; index < 5; index++) {
      if (deck.length > 0) this.receiveCard(deck.giveRandomCard());
      console.log("Num of cards in hand: ",this.currentCards.length)
      console.log("Num of cards in deck: ",deck.length)
    }
  }
}

module.exports = {
  Player,
  Deck,
  Hand,
  Card,
  Collection,
  Gamestate,
  SMALLCARDSCALE, 
  TINYCARDSCALE,
  XRES,
  YRES
}