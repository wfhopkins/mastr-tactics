class Player {



}

class Deck {
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

  get deck() {
    return this.currentDeck;
  }

  pullCard() {
    const randomIndex = Math.floor(Math.random()*this.currentDeck.length);
    const card = this.currentDeck.splice(randomIndex, 1);
    return card;
  }


}

class Card {
  constructor(faction, rank, id) {
    this.current_faction = faction;
    this.current_rank = rank;
    this.id = id;
  }

  get rank() {
    return this.current_rank;
  }
  
  get faction() {
    return this.current_faction;
  }

  set rank(newRank) {
    this.current_rank = newRank;
  }

  set faction(newFaction) {
    this.current_faction = newFaction;
  }
}

module.exports = {
  Player,
  Deck,
  Card,
}