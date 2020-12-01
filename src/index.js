import { deck, shuffleDeck } from "./modules/deck";
import { players, createPlayer } from "./modules/players";

/* ===============
 * GLOBAL VARIABLES
 * ============= */
const housePoints = document.getElementById("house-points");
const houseCardContainer = document.querySelector(".cards--house");
const playerCardContainer = document.querySelector(".cards--player");

// the game starts
function startGame() {
  const playerNameInput = document.querySelector("#player-name-input");
  const playerName = document.querySelector("#player-name");
  const startDiv = document.querySelector("#start-btn-div");
  const gameDiv = document.querySelector("#game-btn-div");

  // player needs to set their name
  if (playerNameInput.value === "") {
    window.alert("Please enter your name");
  } else {
    // if name is set then the game begins
    playerName.innerHTML = playerNameInput.value;
    startDiv.classList.add("d-none");
    gameDiv.classList.remove("d-none");
    createPlayer("House");
    createPlayer(playerNameInput.value);
    shuffleDeck();
    dealCards();
    getPoints(1);
    updatePlayerPoints();
    renderCards(1, playerCardContainer);
    houseInitialRender();

    console.log(players);
  }
}

function houseInitialRender() {
  // local variables
  const firstCard = players[0].hand[0];
  const openCard = document.createElement("img");
  const closedCard = document.createElement("img");
  openCard.src = `./img/${firstCard.value}_of_${firstCard.suit}.svg`;
  closedCard.src = "./img/back.png";

  // inserting the rendered cards into the UI
  houseCardContainer.appendChild(openCard);
  houseCardContainer.appendChild(closedCard);

  // render house total points
  housePoints.innerHTML = firstCard.weight;
}

// function for both house and player to render their cards into the UI
function renderCards(x, container) {
  container.innerHTML = "";
  for (let i = 0; i < players[x].hand.length; i++) {
    const cardObject = players[x].hand[i];
    const newCard = document.createElement("img");
    newCard.src = `./img/${cardObject.value}_of_${cardObject.suit}.svg`;
    container.appendChild(newCard);
  }
}

function hitMe(x, container) {
  players[x].hand.push(deck.pop());
  getPoints(x);

  renderCards(x, container);
}

function playerPlays() {
  hitMe(1, playerCardContainer);
  updatePlayerPoints();
}

function housePlays() {
  if (players[0].points < 17) {
    hitMe(0, houseCardContainer);
    updateHousePoints();
  } else {
    stand(0);
  }
}

function dealCards() {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < players.length; j++) {
      let card = deck.pop();
      players[j].hand.push(card);
    }
  }
}

function updatePlayerPoints() {
  const playerPoints = document.getElementById("player-points");

  playerPoints.innerHTML = players[1].points;
}

function updateHousePoints() {
  housePoints.innerHTML = players[0].points;
}

function getPoints(x) {
  let points = 0;
  for (let i = 0; i < players[x].hand.length; i++) {
    points += players[x].hand[i].weight;
  }
  players[x].points = points;
}

/* ===============
 * EVENT LISTENERS
 * ============= */
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("hit-btn").addEventListener("click", playerPlays);
document.getElementById("stand-btn").addEventListener("click", housePlays);
document.getElementById("restart-btn").addEventListener("click", function () {
  location.reload();
  // return false;
});
