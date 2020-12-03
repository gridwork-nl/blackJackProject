import Deck from "./modules/deck";
import Player from "./modules/player";
import GamePlay from "./modules/gameplay";
import UI from "./modules/ui";

/*
 * Blackjack App main JS file
 * Version 1.0.0
 */

/* ====================
 * VARIABLE DECLARATIONS
 * ================== */

// game vars
let deck = new Deck();
let players = new Array();
let house = new Player("House", 1);
let player1 = new Player("Player", 2);
let game = new GamePlay();
let score = { house: 0, player: 0 };

// UI Vars
const playerNameInput = document.querySelector("#player-name-input");
const playerName = document.querySelector("#player-name");
const startDiv = document.querySelector("#start-btn-div");
const gameDiv = document.querySelector("#game-btn-div");
const popUp = document.querySelector("#popup-container");
const messageContainer = document.getElementById("message");
const remainingCards = document.getElementById("remaining-cards");
const playerCardContainer = document.querySelector(".cards--player");
const houseCardContainer = document.querySelector(".cards--house");
const housePoints = document.getElementById("house-points");
const playerPoints = document.getElementById("player-points");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const closeBtn = document.getElementById("close-btn");
const restartBtn = document.getElementById("restart-btn");
const restartPopupBtn = document.getElementById("restart-popup-btn");
const houseScore = document.getElementById("house-score");
const playerScore = document.getElementById("player-score");
const scoreName = document.getElementById("score-name");

/* ===============
 * GAME SETUP
 * ============= */

// adding house and player to array
players.push(house, player1);

// Build and shuffle the deck (deck now accessible under deck.fullDeck)
deck.constructDeck();
deck.shuffleDeck();

/* ===============
 * GLOBAL FUNCTIONS
 * ============= */

// restart function (at the end of the game)
function restart() {
  // reset values
  deck = new Deck();
  players = new Array();
  house = new Player("House", 1);
  player1 = new Player("Player", 2);
  game = new GamePlay();
  // adding house and player to array
  players.push(house, player1);

  // Build and shuffle the deck (deck now accessible under deck.fullDeck)
  deck.constructDeck();
  deck.shuffleDeck();

  // reset UI
  UI.updatePointsUI(house, housePoints);
  UI.updatePointsUI(player1, playerPoints);
  playerCardContainer.innerHTML = "";
  houseCardContainer.innerHTML = "";
  hitBtn.disabled = false;
  standBtn.disabled = false;
  houseScore.innerHTML = score.house;
  playerScore.innerHTML = score.player;
  // play initial turn
  playerInitialTurn();
}

// Game Turns
function playerInitialTurn() {
  player1.name = playerNameInput.value;
  scoreName.innerHTML = playerNameInput.value;
  playerName.innerHTML = playerNameInput.value;
  startDiv.classList.add("d-none");
  gameDiv.classList.remove("d-none");
  // gameplay methods
  game.dealCards(players, deck.fullDeck);
  game.getPoints(house);
  game.getPoints(player1);

  // UI methods
  UI.countDeck(remainingCards, deck.fullDeck);
  UI.houseInitialRender(house, houseCardContainer, housePoints);
  UI.renderCards(player1, playerCardContainer);
  UI.updatePointsUI(player1, playerPoints);
}

// Player turn (on hit btn)
function playerPlays() {
  //game methods
  // player draws card from deck
  game.hitMe(player1, deck.fullDeck);
  // ace evaluation (ace 1 or 11)
  game.aceCheck(player1);
  // update player points
  game.getPoints(player1);

  // UI methods
  // display how many cards remain in deck
  UI.countDeck(remainingCards, deck.fullDeck);
  // update player points in UI
  UI.updatePointsUI(player1, playerPoints);
  // update player cards in UI
  UI.renderCards(player1, playerCardContainer);
  // check if player busts
  UI.lostAlready(player1, hitBtn, standBtn, messageContainer, popUp, score);
}

// House plays (on stand btn)
function housePlays() {
  if (house.points < 17 && house.points < player1.points) {
    // game methods
    // house draws card from deck if house points are under 17
    game.hitMe(house, deck.fullDeck);
    // ace evaluation (1 or 11)
    game.aceCheck(house);
    // update house points
    game.getPoints(house);

    // UI methods
    // display how many cards left in deck
    UI.countDeck(remainingCards, deck.fullDeck);
    // update house points in UI
    UI.updatePointsUI(house, housePoints);
    // update house cards in UI
    UI.renderCards(house, houseCardContainer);

    // recursion lets house draw again so long as total points is < 17
    housePlays();
  } else if (house.points > 21 || player1.points > house.points) {
    // house busts or player has more points means player wins!
    // update house points in UI
    UI.updatePointsUI(house, housePoints);
    // update house cards in UI
    UI.renderCards(house, houseCardContainer);
    // game over message and game controls disabled
    UI.gameOver(
      popUp,
      hitBtn,
      standBtn,
      messageContainer,
      "Winner winner, chicken DINNER!"
    );
    // player score = +1
    score.player += 1;
  } else {
    // no one busts but house has more points than player so house wins
    // house points get updated
    UI.updatePointsUI(house, housePoints);
    // house cards get updated
    UI.renderCards(house, houseCardContainer);
    // game over message and game controls disabled
    UI.gameOver(popUp, hitBtn, standBtn, messageContainer, "You lose, LOSER!");
    score.house += 1;
  }
}

/* ===============
 * EVENT LISTENERS
 * ============= */

// Start btn
document.getElementById("start-btn").addEventListener("click", () => {
  // player name is not set
  if (playerNameInput.value === "") {
    restartPopupBtn.classList.add("d-none");
    popUp.classList.remove("d-none");
    message.innerHTML = "Please Enter your name";
  } else {
    // player name set correctly, game begins!
    playerInitialTurn();
  }
});

// hit btn
hitBtn.addEventListener("click", playerPlays);

// stand btn
standBtn.addEventListener("click", housePlays);

// close btn  (for modal popup)
closeBtn.addEventListener("click", () => {
  UI.closePopUp(popUp, restartPopupBtn);
});

// restart the game in game control panel
restartBtn.addEventListener("click", restart);

// restart the game in popup
restartPopupBtn.addEventListener("click", () => {
  restart();
  UI.closePopUp(popUp, restartBtn);
});
