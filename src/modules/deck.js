// setting an empty array for the card deck
let deck = [];

// immediately invoked function that creates the deck
const constructDeck = (function () {
  // base arrays for cards
  const suits = ["hearts", "diamonds", "spades", "clubs"];
  const values = [
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

  // nested loop that runs trough each value for every suit and sets card object suit, value, weight and id
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { suit: suits[i], value: values[j], weight: 0, id: 1 };
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
      deck.push(card);
    }
  }
})();

// function that shuffles the deck before play
function shuffleDeck() {
  let currentIndex = deck.length,
    temporyValue,
    randomIndex;

  // while there are cards left
  while (currentIndex > 0) {
    //Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap with current element
    temporyValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporyValue;
  }

  return deck;
}

export { deck, shuffleDeck };
