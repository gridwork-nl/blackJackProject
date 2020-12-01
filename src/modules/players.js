let players = new Array();
let playerCards = new Array();

// function that creates player with name parameter
function createPlayer(name) {
  let id = players.length + 1;
  let player = { name: name, id: id, hand: [], points: 0 };
  players.push(player);
}

export { players, createPlayer };
