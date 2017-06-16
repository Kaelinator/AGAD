
var FIELD = [
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  "0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0",
  "0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0",
  "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];

var TYPES = ["BARRIER", "BISCUIT", "OPEN", "CHERRY", "GHOST", "PACMAN"];

var HALF_SIZE = SIZE / 2;
var THIRD_SIZE = SIZE / 3;
var QUARTER_SIZE = SIZE / 4;

function Tile(x, y, type, id) {

  this.x = x;
  this.y = y;
  this.type = type;

  this.dX = -1;
  this.dY = -1;
  this.moving = false;

  this.intact = true;

  this.speed = 0.2;

  this.id = id;
}

Tile.prototype.update = function() {

  if (!this.intact)
    return;

  /* movement */
  if (this.moving) {

    this.x = lerp(this.x, this.dX, this.speed);
    this.y = lerp(this.y, this.dY, this.speed);

    if (Math.abs(this.x - this.dX) < 0.1 && Math.abs(this.y - this.dY) < 0.1) {

      this.x = this.dX;
      this.y = this.dY;

      this.moving = false;
    }
  }



  if (this.type == "PACMAN") {
    /* eating */

    var dTileX = Math.floor(this.x);
    var dTileY = Math.floor(this.y);

    var dTile = getTile(dTileX, dTileY);

    if (dTile.intact) {

      switch (dTile.type) {

        case "BISCUIT":
          score++;
          dTile.intact = false;
          break;

        case "CHERRY":
          score += 10;
          dTile.intact = false;
          break;
      }
    }

    if (score == endScore)
      endGame(true);

  } else if (this.type == "GHOST") {
    /* AI */

    if (Math.abs(pacman.x - this.x) < 0.3 && Math.abs(pacman.y - this.y) < 0.3)
      endGame(false);

    if (this.moving)
      return;

    var possibleMoves = [
      getTile(this.x - 1, this.y),
      getTile(this.x + 1, this.y),
      getTile(this.x, this.y - 1),
      getTile(this.x, this.y + 1),
    ];

    /* sort by distance */
    possibleMoves.sort(function (a, b) {
      var aD = dist(a.x, a.y, pacman.x, pacman.y);
      var bD = dist(b.x, b.y, pacman.x, pacman.y);

      return aD - bD;
    });

    if (this.id === 0) {

      for (var i = 0; i < possibleMoves.length; i++) {

        if (this.move(possibleMoves[i].x, possibleMoves[i].y, false)) {
          break;
        }
      }
    } else {
      var index = Math.floor(random(4));
      this.move(possibleMoves[index].x, possibleMoves[index].y, false);
    }

  }
};

Tile.prototype.draw = function() {

  switch (this.type) {

    case "BARRIER":

      strokeWeight(5);
      stroke(0);
      fill("#0000FF");
      rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
      break;

    case "BISCUIT":

      ellipseMode(CORNER);
      noStroke();
      fill(255);
      ellipse(this.x * SIZE + THIRD_SIZE, this.y * SIZE + THIRD_SIZE, THIRD_SIZE);
      break;

    case "CHERRY":

      ellipseMode(CORNER);
      stroke(255);
      strokeWeight(2);
      fill("#FF2222");
      ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
      break;

    case "GHOST":

      fill("#FF00EE");
      stroke(0);
      strokeWeight(1);
      beginShape();
      vertex(this.x * SIZE + HALF_SIZE, this.y * SIZE + QUARTER_SIZE);
      vertex(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + (QUARTER_SIZE * 3));
      vertex(this.x * SIZE + (QUARTER_SIZE * 3), this.y * SIZE + (QUARTER_SIZE * 3));
      endShape(CLOSE);
      break;

    case "PACMAN":

      ellipseMode(CORNER);
      stroke("#FFFF00");
      strokeWeight(5);
      fill("#FFFF33");
      ellipse(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE, HALF_SIZE);
      break;

  }

};

Tile.prototype.move = function(x, y, relative) {

  var dY, dX;

  if (relative) {

    dX = this.x + x;
    dY = this.y + y;
  } else {

    dX = x;
    dY = y;
  }

  if (this.moving)
    return false;

  var destinationTile = getTile(dX, dY);

  // if (!destinationTile)
  //   return false;

  var type = destinationTile.type;

  if ((type == "BARRIER" && this.type != "BARRIER") ||
      (type == "GHOST" && this.type == "GHOST"))
    return false;

  this.moving = true;
  this.dX = dX;
  this.dY = dY;

  return true;
};

function getTile(x, y) {
  return field[y * DIMENSIONS + x];
}
