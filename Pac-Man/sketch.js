
/** 2D map of the field;
 * 0 = BARRIER
 * 1 = BISCUIT
 * 3 = CHERRY
 * 4 = GHOST
 * 5 = PAC-MAN
 */
const FIELD = [
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

var field = [];
var ghosts = [];

var pacman;
var score;
var endScore;

function setup() {

  createCanvas(500, 535);

  score = 0;
  field = generateField();
}

function draw() {

  background(51);

	drawHUD(); // field & score

	/* update and draw ghosts */
  for (var j = 0; j < ghosts.length; j++) {

    ghosts[j].update();
    ghosts[j].draw();
  }

	/* update and draw Pac-man */
	pacman.update();
	pacman.draw();

  handleInput(); // keyboard input
}

/**
 *	handles user input
 */
function handleInput() {

  if (keyIsDown(UP_ARROW)) {

    pacman.move(0, -1, true);
  } else if (keyIsDown(DOWN_ARROW)) {

    pacman.move(0, 1, true);
  } else if (keyIsDown(LEFT_ARROW)) {

    pacman.move(-1, 0, true);
  } else if (keyIsDown(RIGHT_ARROW)) {

    pacman.move(1, 0, true);
  }
}

/**
 * draws all tiles except types GHOST and PACMAN
 * draws score
 */
function drawHUD() {

	/* field */
	for (var i = 0; i < field.length; i++) {

		if (field[i].intact) {

			if (field[i].type != "GHOST" && field[i].type != "PACMAN")
				field[i].draw();
		}
	}

	/* score */
	noStroke();
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text(score, 5, height - 5);
}

function endGame(won) {

  textSize(60);
  textAlign(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(5);

  if (won) {

    text("You win!", width / 2, height / 2);
  } else {

    text("You lose!", width / 2, height / 2);
  }
  textSize(50);
  text("Press f5 to restart", width / 2, height / 2 + 50);

  noLoop();
}

/**
 *	populates field and ghost arrays
 * initializes Pac-man
 * based upon FIELD constant
 */
function generateField() {

  var f = []; // returning array

  var ghostId = 0; // handling behavior of ghost
  for (var i = 0; i < FIELD.length; i++) { // loop through each string

    var row = FIELD[i].split(",");
    for (var j = 0; j < row.length; j++) { // loop through numbers in string

      var type = TYPES[row[j]];
      var tile = new Tile(j, i, type, -1);

      switch (type) {

        case "PACMAN":
          pacman = tile;
          f.push(new Tile(j, i, "OPEN"));
          break;

        case "GHOST":
					var behavior = (ghostId % 2); // every other ghost will be agressive
          ghosts.push(new Tile(j, i, type, behavior));
          f.push(new Tile(j, i, "OPEN"));
          ghostId++;
          break;

        case "BARRIER":
          f.push(tile);
          break;

        case "CHERRY":
          endScore += 10; // worth 10 points
          f.push(tile);
          break;

        case "BISCUIT":
          endScore++; // worth 1 point
          f.push(tile);
          break;
      }

    }
  }
  return f;
}
