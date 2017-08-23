
const COOLDOWN = 30; // time in between lazer firing

var shuttle; // player
var score;

var aliens = []; // field of enemies

/* difficulty */
var speed;
var movement; // keeping track of path

function setup() {

  createCanvas(600, 400);

	/* initialize player */
  shuttle = new Saucer(width / 2, height - 20, 20, 3, "#FFFFFF", false);

	/* initialize enemies */
  aliens = initializeFleet(10, 1, 20);
  score = 0;

	/* initialize difficulty */
  speed = 0.01;
  movement = 0;

  textAlign(CENTER);
}

function draw() {

  background(51);

  handleAliens();
	handleLevel();
	handleShuttle();
	handleKeys();

  drawScore();
}

/**
 * moves, updates, and draws Alien Saucers
 * manages aliens array
 * handles Alien takeover
 */
function handleAliens() {

	/* move the aliens */
	var xChange = sin(movement * 0.01);
	var yChange = (Math.abs(xChange) < 0.1) ? random(speed * 25) : 0; // only move down at edges

  for (var i = aliens.length - 1; i >= 0; i--) {
		// loop through all aliens

    if (random() < aliens[i].shape * 0.001) {
			// the rate of fire depends on the shape of Saucer

			aliens[i].shoot();
		}

    if (aliens[i].intact) {
			// if the Saucer has not been destroyed

      aliens[i].move(sin(movement * 0.01) * 0.3, yChange);

      aliens[i].update(aliens.concat(shuttle));
      aliens[i].draw();

			if (!aliens[i].onScreen) {
				// Saucer has reached the bottom of the screen
				// Aliens now takeover

				endGame();
			}
    } else {
			// Saucer has been destroyed

      score += (aliens[i].alien) ? aliens[i].shape : 0; // increment score based upon shape

      aliens.splice(i, 1);
    }
  }

	movement++;
}

/**
 * updates & draws shuttle
 * handles shuttle destruction
 */
function handleShuttle() {

  shuttle.update(aliens.concat(shuttle));
  shuttle.draw();

  if (!shuttle.intact) {
		// shuttle has been hit

    endGame();
  }
}

/**
 * increases the level and difficulty
 */
function handleLevel() {

	if (aliens.length < 1) {
		// all Alien Saucers have been destroyed

    speed += 0.01
    aliens = initializeFleet(10, speed * 100, 20);
    movement = 0;
  }
}

/**
 * handles user input to movement
 */
function handleKeys() {

  if (keyIsDown(LEFT_ARROW))
    shuttle.move(-1, 0);

  if (keyIsDown(RIGHT_ARROW))
    shuttle.move(1, 0);

}

/**
 * handles user input to Lazer
 */
function keyPressed() {

  if (keyCode === 32) {

    shuttle.shoot();
  }
}

/**
 * returns a random color
 */
function randomColor() {
  return color(random(255), random(255), random(255));
}

/**
 *
 */
function initializeFleet(rows, cols, size) {

  var fleet = []; // returning array

  var yOffset = height / 2;

  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
			// loop through rows and columns

			/* construct the Saucer */
			var xPosition = x * size * 2 + size;
			var yPosition = yOffset - (y * size * 2);
			var shape = Math.floor(random(9)) + 3;

			var saucer = new Saucer(xPosition, yPosition, size, shape, randomColor(), true);
			fleet.push(saucer);
    }
  }

  return fleet;
}

/**
 * draws the score
 */
function drawScore() {

	textSize(35);
  fill(255);
  noStroke();
  text(score, width / 2, 40);
}

/**
 * ends the loop, draws end game message
 */
function endGame() {

  noLoop();
  textSize(100);
  fill(255);
  noStroke();

  text("Game Over!", width / 2, height / 2);
}
