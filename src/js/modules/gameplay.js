class GamePlay {
  // cards are dealt, alternating between players until each has 2 cards
  dealCards(players, deck) {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < players.length; j++) {
        let card = deck.pop();
        players[j].hand.push(card);
      }
    }
  }

  // card gets added from deck to player or house hand
  hitMe(player, deck) {
    player.hand.push(deck.pop());
  }

  // points are added to player object
  getPoints(player) {
    let points = 0;
    for (let i = 0; i < player.hand.length; i++) {
      points += player.hand[i].weight;
    }
    player.points = points;
  }

  // ace evaluation; if player has an ace and total points are > 21, ace weight becomes 1
  aceCheck(player) {
    let points = player.points + player.hand[player.hand.length - 1].weight;
    for (let i = 0; i < player.hand.length; i++) {
      if (player.hand[i].value === "ace" && points > 21) {
        player.hand[i].weight = 1;
      }
    }
  }
}

export default GamePlay;
