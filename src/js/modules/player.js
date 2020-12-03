// class that builds the player and house object
class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.hand = new Array();
    this.points = 0;
  }
}

export default Player;
