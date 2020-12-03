class UI {
  // function to render points in UI
  static updatePointsUI(player, container) {
    container.innerHTML = player.points;
  }

  // function to render cards in UI
  static renderCards(player, container) {
    container.innerHTML = "";
    for (let i = 0; i < player.hand.length; i++) {
      const cardObject = player.hand[i];
      const newCard = document.createElement("img");
      newCard.src = `./img/${cardObject.value}_of_${cardObject.suit}.svg`;
      container.appendChild(newCard);
    }
  }

  // initial house card render where one card remains hidden and house points in UI are
  // only those for first card
  static houseInitialRender(house, container, housePoints) {
    // local variables
    let firstCard = house.hand[0];
    let openCard = document.createElement("img");
    let closedCard = document.createElement("img");
    openCard.src = `../img/${firstCard.value}_of_${firstCard.suit}.svg`;
    closedCard.src = "../img/back.png";

    // inserting the rendered cards into the UI
    container.appendChild(openCard);
    container.appendChild(closedCard);

    // render house total points which is now only the first card
    housePoints.innerHTML = firstCard.weight;
  }

  // message popup function
  static setMessage(message) {
    const messageContainer = document.querySelector("#message");
    messageContainer.innerHTML = message;
    popUp.classList.remove("d-none");
  }

  // closing the message popup function
  static closePopUp(popUp, restartBtn) {
    popUp.classList.add("d-none");
    restartBtn.classList.remove("d-none");
  }

  // render how many cards are left in deck to UI
  static countDeck(remainingCards, deck) {
    remainingCards.innerHTML = deck.length;
  }

  // function to check if player busts on hit
  static lostAlready(player, hitBtn, standBtn, messageContainer, popUp, score) {
    if (player.points > 21) {
      hitBtn.disabled = true;
      standBtn.disabled = true;
      messageContainer.innerHTML = "You lose, LOSER!";
      popUp.classList.remove("d-none");
      score.house += 1;
    }
  }

  // disabling controls and displaying message on game lose
  static gameOver(popUp, hitBtn, standBtn, messageContainer, message) {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    messageContainer.innerHTML = message;
    popUp.classList.remove("d-none");
  }
}

export default UI;
