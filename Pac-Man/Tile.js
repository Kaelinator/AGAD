/**
	* all different types of tiles
	*/
const TYPES = [
	"BARRIER",
	"BISCUIT",
	"OPEN",
	"CHERRY",
	"GHOST",
	"PACMAN"
];

const TILE_SPEED = 0.2; // speed of tile's movement

const DIMENSIONS = 20;	// size of field

const SIZE = 25;	// size of each tile
const HALF_SIZE = SIZE / 2;
const THIRD_SIZE = SIZE / 3;
const QUARTER_SIZE = SIZE / 4;

/**
 * makes up the field
 * tiles can be moved
 * tiles can restrict movement
 */
function Tile(x, y, type, behavior) {

  this.x = x;
  this.y = y;
  this.type = type;

	this.destination = (-1, -1);
  this.moving = false;

  this.intact = true;

  this.speed = 0.2;

  this.behavior = behavior; // GHOSTs only;	0 = agressive, 1 = nonchalant
}

/**
 *	handles movement, eating, and AI
 */
Tile.prototype.update = function() {

  if (!this.intact) // no need to update
    return;

  /* movement */
  if (this.moving) {

		console.log(this.x, this.y, "before lerp");
		console.log(this.destination.x, this.destination.y);

    this.x = lerp(this.x, this.destination.x, this.speed);
    this.y = lerp(this.y, this.destination.y, this.speed);

		console.log(this.x, this.y, "after lerp");

		var distanceX = Math.abs(this.x - this.destination.x);
		var distanceY = Math.abs(this.y - this.destination.y);

    if (distanceX < 0.1 && distanceY < 0.1) { // round to the nearest position

      this.x = this.destination.x;
      this.y = this.destination.y;

      this.moving = false; // done moving
    }
  }

  /* eating */
  if (this.type == "PACMAN") { // only PACMAN may eat!

		// Tile to which Pac-man is moving
    var destinationTile = getTile(Math.floor(this.x), Math.floor(this.y));

    if (destinationTile.intact) {

      switch (destinationTile.type) {

        case "BISCUIT":
          score++;	// worth 1 point
          destinationTile.intact = false;
          break;

        case "CHERRY":
          score += 10;	// worth 10 points
          destinationTile.intact = false;
          break;
      }
    }

    if (score == endScore) // check if Pac-man has won
      endGame(true);

  } else if (this.type == "GHOST") {
    /* GHOST AI */

		var distance = dist(pacman.x, pacman.y, this.x, this.y);

    if (distance < 0.3) // if Pac-man has touched a GHOST
      endGame(false);

		/* movement */
    if (this.moving) // can't move multiple times at once
      return;

		/* relative possible movements */
    var possibleMoves = [

      getTile(this.x - 1, this.y),	// left
      getTile(this.x + 1, this.y),	// right
      getTile(this.x, this.y - 1),	// top
      getTile(this.x, this.y + 1),	// bottom
    ];

    /* sort by distance from Pac-man */
    possibleMoves.sort(function (a, b) {

      var aD = dist(a.x, a.y, pacman.x, pacman.y);
      var bD = dist(b.x, b.y, pacman.x, pacman.y);

      return aD - bD;
    });

    if (this.behavior === 0) {	// if they're agressive

      for (var i = 0; i < possibleMoves.length; i++) {

        if (this.move(possibleMoves[i].x, possibleMoves[i].y, false)) { // attempt to move
          break;
        }
      }
    } else {
			// move nonchalantly
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

			/* draw a triangle */
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

/**
 * calculates movement for use within update function
 * returns whether it's a valid move or not
 */
Tile.prototype.move = function(x, y, relative) {

  var destinationX, destinationY;

  if (relative) { // relative to the tile

    destinationX = this.x + x;
    destinationY = this.y + y;
  } else {

    destinationX = x;
    destinationY = y;
  }

  if (this.moving) // no need to recalculate everything
    return false;

  var destinationTile = getTile(destinationX, destinationY);

  var type = destinationTile.type;

  if ((type == "BARRIER" && this.type != "BARRIER") || 	// only certain tiles may
      (type == "GHOST" && this.type == "GHOST")) 				// move to other certain tiles
    return false;

  this.moving = true; // begin movement next update
	this.destination = createVector(destinationX, destinationY);

  return true;
};

/**
 * returns tile with coordinates (x, y)
 */
function getTile(x, y) {

  return field[y * DIMENSIONS + x];
}
