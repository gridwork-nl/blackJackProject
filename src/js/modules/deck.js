/*
 * Blackjack module that creates the deck for play with a built in shuffle function
 */

class Deck {
  // Class constructor
  constructor() {
    this.suits = ["hearts", "diamonds", "spades", "clubs"];
    this.values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
      "ace",
    ];
    this.fullDeck = new Array();
  }

  // Methods
  constructDeck() {
    // nested loop that runs trough each value for every suit and sets card object suit, value, weight and id
    for (let i = 0; i < this.suits.length; i++) {
      for (let j = 0; j < this.values.length; j++) {
        let card = {
          suit: this.suits[i],
          value: this.values[j],
          weight: 0,
          id: 1,
        };
        // if value is ace then set value to 11 (to be changed to 1 depending on game situation)
        if (card.value === "ace") {
          card.weight = 11;
          // face card value is set to 10
        } else if (
          card.value === "jack" ||
          card.value === "queen" ||
          card.value === "king"
        ) {
          card.weight = 10;
          // other values are set to their respective number
        } else {
          card.weight = Number(card.value);
        }
        // push created card objects to empty deck array
        this.fullDeck.push(card);
      }
    }
  }

  // function that shuffles the deck before play
  shuffleDeck() {
    let currentIndex = this.fullDeck.length,
      temporyValue,
      randomIndex;

    // while there are cards left
    while (currentIndex > 0) {
      //Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap with current element
      temporyValue = this.fullDeck[currentIndex];
      this.fullDeck[currentIndex] = this.fullDeck[randomIndex];
      this.fullDeck[randomIndex] = temporyValue;
    }

    return this.fullDeck;
  }
}

export default Deck;
